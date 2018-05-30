package com.platform.db.hibernate;

import java.io.Serializable;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.internal.CriteriaImpl;
import org.hibernate.jdbc.ReturningWork;
import org.hibernate.loader.criteria.CriteriaJoinWalker;
import org.hibernate.loader.criteria.CriteriaQueryTranslator;
import org.hibernate.metadata.ClassMetadata;
import org.hibernate.persister.entity.OuterJoinLoadable;
import org.hibernate.transform.ResultTransformer;
import org.hibernate.transform.Transformers;
import org.hibernate.type.Type;
import org.springframework.dao.DataAccessException;
import org.springframework.util.Assert;

import com.platform.util.EmptyUtils;
import com.platform.util.Utils;
import com.platform.db.DaoException;
import com.platform.db.Page;
import com.platform.db.hibernate.param.CriteriaParam;
import com.platform.db.hibernate.param.ExampleParam;
import com.platform.db.hibernate.param.HqlParam;
import com.platform.db.hibernate.param.SqlParam;


@SuppressWarnings({ "unchecked", "rawtypes" })
public class HibernateDaoImpl implements IHibernateDao {
	// 日志记录
	public final Log log = LogFactory.getLog(getClass());
	// Session工厂
	public SessionFactory sessionFactory;
	// hiberante管理的所有实体类名
	public Set<String> classNameSet = null;
	// 验证是否是Hql语句的正则表达式
	static Pattern hqlPattern = Pattern
			.compile("(?i)\\s*(from|update|insert|delete)\\s+([.a-zA-Z]+)");
	static final String SINGLE_COLUMN_ALIAS = "SINGLE_COLUMN_ALIAS";

	// 批量处理的类型
	static enum BatchType {
		SAVE, UPDATE, SAVE_OR_UPDATE, DELETE
	}

	// 默认一次批量的个数
	static final int DEFAULT_BATCH_SIZE = 20;

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~实体接口:开始~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	@Override
	public <T> List<T> getAll(Class<T> clazz) throws DaoException {
		return createCriteria(clazz).list();
	}

	@Override
	public <T> List<T> get(Class<T> clazz, Serializable... ids)
			throws DaoException {
		return createCriteria(clazz).add(
				Restrictions.in(getIdFieldName(clazz), ids)).list();
	}

	@Override
	public <T> T get(Class<T> clazz, Serializable id) throws DaoException {
		return (T) getCurrentSession().get(clazz, id);
	}

	@Override
	public Serializable save(Object object) throws DaoException {
		return getCurrentSession().save(object);
	}

	@Override
	public void saveOrUpdate(Object object) throws DaoException {
		getCurrentSession().saveOrUpdate(object);
	}

	@Override
	public void update(Object entity) throws DaoException {
		getCurrentSession().update(entity);
	}

	@Override
	public Object merge(Object object) throws DaoException {
		return getCurrentSession().merge(object);
	}

	@Override
	public void delete(Object entity) throws DaoException {
		getCurrentSession().delete(entity);
	}

	@Override
	public void delete(Class clazz, Serializable... ids) throws DaoException {
		String hql = "delete from " + clazz.getName();
		if( EmptyUtils.isEmpty(ids) ){
			updateByHql(hql, (Object[])null);
			return;
		}
		updateByHql(hql + " where " + getIdFieldName(clazz)
				+ " in (" + StringUtils.repeat("?", ",", ids.length) + ")",
				Arrays.asList(ids).toArray());
	}


	@Override
	public void batchSave(List objects, int batchSize) throws DaoException {
		batchHandle(objects, BatchType.SAVE, batchSize);
	}

	@Override
	public void batchUpdate(List objects, int batchSize) throws DaoException {
		batchHandle(objects, BatchType.UPDATE, batchSize);
	}

	@Override
	public void batchSaveOrUpdate(List objects, int batchSize)
			throws DaoException {
		batchHandle(objects, BatchType.SAVE_OR_UPDATE, batchSize);
	}

	@Override
	public void batchDelete(List objects, int batchSize) throws DaoException {
		batchHandle(objects, BatchType.DELETE, batchSize);
	}

	@Override
	public void batchSave(List objects) throws DaoException {
		batchHandle(objects, BatchType.SAVE);
	}

	@Override
	public void batchUpdate(List objects) throws DaoException {
		batchHandle(objects, BatchType.UPDATE);
	}

	@Override
	public void batchSaveOrUpdate(List objects) throws DaoException {
		batchHandle(objects, BatchType.SAVE_OR_UPDATE);
	}

	@Override
	public void batchDelete(List objects) throws DaoException {
		batchHandle(objects, BatchType.DELETE);
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~实体接口:结束~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

	/*
	 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~辅助接口：开始~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	 */
	public Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

	public Query createQuery(String hql) {
		return getCurrentSession().createQuery(hql);
	}

	public SQLQuery createSQLQuery(String sql) {
		return getCurrentSession().createSQLQuery(sql);
	}

	public Criteria createCriteria(Class clazz) {
		return getCurrentSession().createCriteria(clazz);
	}

	/**
	 * 根据返回的结果类型匹配结果转换器
	 * 
	 * @return
	 */
	public ResultTransformer getResultTransformer(Class resultTransformerType) {
		ResultTransformer transformer = null;
		if (Map.class == resultTransformerType) {
			transformer = Transformers.ALIAS_TO_ENTITY_MAP;
		} else if (List.class == resultTransformerType) {
			transformer = Transformers.TO_LIST;
		} else if (EmptyUtils.isNotEmpty(resultTransformerType)) {
			transformer = Transformers.aliasToBean(resultTransformerType);
		}
		return transformer;
	}

	/**
	 * 设置查询参数
	 * 
	 * @param query
	 * @param params
	 * @return Query
	 */
	public Query setParams(Query query, Object params) {
		if (EmptyUtils.isNotEmpty(params)) {
			if (params instanceof Map) {
				List<String> namedParameterList = Arrays.asList(query
						.getNamedParameters());
				Map paramMap = (Map) params;
				Set<Entry> entrySet = paramMap.entrySet();
				Object paramName = null;
				for (Entry entry : entrySet) {
					paramName = entry.getKey();
					if (namedParameterList.contains(paramName)) {
						setParamVal(query, paramName, entry.getValue());
					}
				}
			} else if (params.getClass().isArray()) {
				Object[] paramArray = (Object[]) params;
				if (paramArray[0] instanceof Map) {
					return setParams(query, paramArray[0]);
				}
				for (int i = 0; i < paramArray.length; i++) {
					setParamVal(query, i, paramArray[i]);
				}
			}
		}
		return query;
	}

	/**
	 * 设置查询参数值
	 * 
	 * @param query
	 * @param name
	 * @param val
	 * @return Query
	 */
	private Query setParamVal(Query query, Object name, Object val) {
		if (Utils.isArray(val)) { // 参数值是一个数组
			Object[] arr = null;
			if (Utils.isPrimitiveArray(val)) {
				int length = Array.getLength(val);
				arr = new Object[length];
				for (int i = 0; i < arr.length; i++) {
					arr[i] = Array.get(val, i);
				}
			} else {
				arr = (Object[]) val;
			}
			query.setParameterList(String.valueOf(name), arr);
		} else if (Utils.isCollection(val)) { // 参数值是一个集合
			query.setParameterList(String.valueOf(name), (Collection) val);
		} else {
			if (name instanceof String) {
				query.setParameter(String.valueOf(name), val);
			} else {
				query.setParameter(Integer.valueOf(String.valueOf(name)), val);
			}
		}
		return query;
	}

	/**
	 * 获取ID属性名称
	 * 
	 * @param clazz
	 * @return
	 */
	private String getIdFieldName(Class<?> clazz) {
		return sessionFactory.getClassMetadata(clazz)
				.getIdentifierPropertyName();
	}

	/**
	 * 批量操作
	 * 
	 * @param objects
	 * @param batch
	 * @param batchSize
	 */
	private void batchHandle(List<?> objects, BatchType batch, int batchSize) {
		Session session = getCurrentSession();
		for (int i = 0; i < objects.size(); i++) {
			Object entity = objects.get(i);
			switch (batch) {
			case SAVE:
				session.save(entity);
				break;
			case UPDATE:
				session.update(entity);
				break;
			case SAVE_OR_UPDATE:
				session.saveOrUpdate(entity);
				break;
			case DELETE:
				session.delete(entity);
				break;
			}
			if (i > 0 && i % batchSize == 0) {
				session.flush();
				session.clear();
			}
		}
			session.flush();
			session.clear();
	}

	/**
	 * 批量处理
	 * 
	 * @param objects
	 * @param batch
	 */
	private void batchHandle(List objects, BatchType batch) {
		batchHandle(objects, batch, DEFAULT_BATCH_SIZE);
	}

	/**
	 * 获取Criteria对应的原生SQL
	 * 
	 * @param criteria
	 * @return
	 */
	public static String getCriteriaSql(Criteria criteria) {
		CriteriaImpl criteriaImpl = (CriteriaImpl) criteria;// 转型
		SessionImplementor session = criteriaImpl.getSession();// 获取SESSION
		SessionFactoryImplementor factory = session.getFactory();// 获取FACTORY
		CriteriaQueryTranslator translator = new CriteriaQueryTranslator(
				factory, criteriaImpl, criteriaImpl.getEntityOrClassName(),
				CriteriaQueryTranslator.ROOT_SQL_ALIAS);
		String[] implementors = factory.getImplementors(criteriaImpl
				.getEntityOrClassName());
		CriteriaJoinWalker walker = new CriteriaJoinWalker(
				(OuterJoinLoadable) factory.getEntityPersister(implementors[0]),
				translator, factory, criteriaImpl, criteriaImpl
						.getEntityOrClassName(), session
						.getLoadQueryInfluencers());
		return walker.getSQLString();
	}

	/**
	 * 判断是否是Hql
	 * 
	 * @param sql
	 * @return
	 */
	public boolean isHql(String queryString) {
		if (!EmptyUtils.isEmpty(classNameSet)) {
			Matcher matcher = hqlPattern.matcher(queryString);
			if (matcher.find()) {
				return classNameSet.contains(matcher
						.group()
						.replaceFirst(
								"(?i)\\s*(from|update|insert|delete)\\s*", "")
						.trim());
			}
		}
		return false;
	}

	public String getCountQueryString(String queryString) {
		return isHql(queryString) ? queryString.replaceFirst(
				"(?i)^\\s*(select)?.*from", "select count(*) from")
				: " select count(*) from (" + queryString + ") t ";
	}

	public String getSingleColumnSql(String sql) {
		String tempSql = sql.trim();
		String regex = "(?i)^select(.*?)from";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(tempSql);
		String colAs = SINGLE_COLUMN_ALIAS;
		if (m.find()) {
			colAs = m.group(1).trim().replaceAll("\\(\\s+", "(")
					.replaceAll("\\s+\\)", ")").split("\\s+")[0]
					+ " AS " + colAs;
		}
		return tempSql.replaceFirst(regex, "select " + colAs + " from ");
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
		Map<String, ClassMetadata> classMetadata = sessionFactory
				.getAllClassMetadata();
		if (!classMetadata.isEmpty()) {
			classNameSet = classMetadata.keySet();
		}
	}
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	/*
	 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~辅助接口：结束~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	 */
	@Override
	public <T> T queryObject(String sql, Class<T> requiredType)
			throws DaoException {
		return queryObject(sql, (Object[]) null, requiredType);
	}

	@Override
	public <T> T queryObject(String sql, Object[] args, Class<T> requiredType)
			throws DaoException {
		List<T> list = queryList(sql, args, requiredType);
		return EmptyUtils.isNotEmpty(list) ? list.get(0) : null;
	}

	@Override
	public Map<String, Object> queryMap(String sql, Object[] args)
			throws DaoException {
		List<Map<String, Object>> list = queryList(sql, args);
		return EmptyUtils.isNotEmpty(list) ? list.get(0) : null;
	}

	@Override
	public <T> List<T> queryList(String sql, Object[] args, Class<T> elementType)
			throws DaoException {
		List list = queryBySqlParam(SqlParam
				.getInstance(getSingleColumnSql(sql)).setArgs(args)
				.addScalar(SINGLE_COLUMN_ALIAS, elementType));
		if (EmptyUtils.isNotEmpty(list) && elementType == Long.class) {
			Iterator iter = list.iterator();
			List ls = new ArrayList();
			while (iter.hasNext()) {
				Object temp = iter.next();
				if (temp instanceof BigInteger) {
					ls.add(((BigInteger) temp).longValue());
				}else if (temp instanceof BigDecimal) {
					ls.add(((BigDecimal) temp).longValue());
				}
			}
			return ls;
		}
		return list;
	}

	@Override
	public List<Map<String, Object>> queryList(String sql, Object[] args)
			throws DaoException {
		return queryList(sql, args, null, null);
	}

	@Override
	public <T> T queryObject(String sql, Map<String, Object> params,
			Class<T> requiredType) throws DataAccessException {
		List<T> list = queryList(sql, params, requiredType);
		return EmptyUtils.isNotEmpty(list) ? list.get(0) : null;
	}

	@Override
	public Map<String, Object> queryMap(String sql, Map<String, Object> params)
			throws DataAccessException {
		List<Map<String, Object>> list = queryList(sql, params);
		return EmptyUtils.isNotEmpty(list) ? list.get(0) : null;
	}

	@Override
	public <T> List<T> queryList(String sql, Map<String, Object> params,
			Class<T> elementType) throws DataAccessException {
		List list = queryBySqlParam(SqlParam
				.getInstance(getSingleColumnSql(sql)).setParams(params)
				.addScalar(SINGLE_COLUMN_ALIAS, elementType));
		if (EmptyUtils.isNotEmpty(list) && elementType == Long.class) {
			Iterator iter = list.iterator();
			List ls = new ArrayList();
			while (iter.hasNext()) {
				ls.add( Long.valueOf(iter.next().toString()) );
			}
			return ls;
		}
		return list;
	}

	@Override
	public List<Map<String, Object>> queryList(String sql,
			Map<String, Object> params) throws DataAccessException {
		return queryBySqlParam(SqlParam.getInstance(sql).setParams(params)
				.setResultTransformerType(Map.class));
	}

	@Override
	public int update(String sql, Map<String, Object> params)
			throws DataAccessException {
		return setParams(createSQLQuery(sql), params).executeUpdate();
	}

	@Override
	public List queryByHql(String hql) {
		return queryByHql(hql, (Object[])null);
	}
	
	@Override
	public List queryByHql(String hql, Object[] args) {
		return queryByHql(hql, args, null, null);
	}

	@Override
	public List queryByHql(String hql, Map<String, Object> params) {
		return queryByHql(hql, params, null, null);
	}

	@Override
	public List<Map<String, Object>> queryList(String sql,
			Map<String, Object> params, Integer firstResult, Integer maxResults)
			throws DataAccessException {
		return queryBySqlParam(SqlParam.getInstance(sql).setParams(params).setResultTransformerType(Map.class)
				.setFirstResult(firstResult).setMaxResults(maxResults));
	}

	@Override
	public List<Map<String, Object>> queryList(String sql, Object[] args,
			Integer firstResult, Integer maxResults) throws DataAccessException {
		return queryBySqlParam(SqlParam.getInstance(sql).setArgs(args).setResultTransformerType(Map.class)
				.setFirstResult(firstResult).setMaxResults(maxResults));
	}

	@Override
	public List queryByHql(String hql, Object[] args, Integer firstResult,
			Integer maxResults) {
		return queryByHqlParam(HqlParam.getInstance(hql).setArgs(args)
				.setFirstResult(firstResult).setMaxResults(maxResults));
	}

	@Override
	public List queryByHql(String hql, Map<String, Object> params,
			Integer firstResult, Integer maxResults) {
		return queryByHqlParam(HqlParam.getInstance(hql).setParams(params)
				.setFirstResult(firstResult).setMaxResults(maxResults));
	}

	@Override
	public List queryByCriteria(Criteria criteria) {
		return criteria.list();
	}

	@Override
	public List queryByCriteriaParam(Class clazz, CriteriaParam criteriaParam) {
		Assert.notNull(clazz, "Criteria entity class must not be null");
		Criteria criteria = createCriteria(clazz);
		// 条件
		criteria.add(criteriaParam.getCriterion());
		// 统计
		ProjectionList projections = criteriaParam.getProjections();
		if (EmptyUtils.isNotEmpty(projections) && projections.getLength() > 0) {
			criteria.setProjection(projections);
		}
		// 排序
		List<Order> orders = criteriaParam.getOrders();
		if (EmptyUtils.isNotEmpty(orders)) {
			for (Order order : orders) {
				criteria.addOrder(order);
			}
		}
		// 分页
		if (EmptyUtils.isNotEmpty(criteriaParam.getFirstResult())) {
			criteria.setFirstResult(criteriaParam.getFirstResult());
		}
		if (EmptyUtils.isNotEmpty(criteriaParam.getMaxResults())) {
			criteria.setMaxResults(criteriaParam.getMaxResults());
		}

		return criteria.list();
	}

	@Override
	public List queryByExample(Example example) {
		try {
			Field field = example.getClass().getDeclaredField("entity");
			field.setAccessible(true);
			Object entity = field.get(example);
			field.setAccessible(false);
			Assert.notNull(entity, "Example entity must not be null");
			return createCriteria(entity.getClass()).list();
		} catch (IllegalArgumentException | IllegalAccessException
				| NoSuchFieldException | SecurityException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List queryByExampleParam(ExampleParam exampleParam) {
		Object entity = exampleParam.getEntity();
		Assert.notNull(entity, "Example entity must not be null");
		Criteria criteria = createCriteria(entity.getClass());
		Example example = Example.create(entity);
		if (exampleParam.isExcludeNone()) {
			example.excludeNone();
		}
		if (exampleParam.isEnableLike()) {
			example.enableLike();
		}
		if (exampleParam.isExcludeZeroes()) {
			example.excludeZeroes();
		}
		if (exampleParam.isIgnoreCase()) {
			example.ignoreCase();
		}
		List<String> excludePropertys = exampleParam.getExcludePropertys();
		if (null != excludePropertys && !excludePropertys.isEmpty()) {
			for (String name : excludePropertys) {
				example.excludeProperty(name);
			}
		}
		criteria.add(example);
		// 排序
		List<Order> orders = exampleParam.getOrders();
		if (null != orders && !orders.isEmpty()) {
			for (Order order : orders) {
				criteria.addOrder(order);
			}
		}
		// 分页
		if (EmptyUtils.isNotEmpty(exampleParam.getFirstResult())) {
			criteria.setFirstResult(exampleParam.getFirstResult());
		}
		if (EmptyUtils.isNotEmpty(exampleParam.getMaxResults())) {
			criteria.setMaxResults(exampleParam.getMaxResults());
		}
		return criteria.list();
	}

	@Override
	public List queryBySqlParam(SqlParam sqlParam) {
		String sql = sqlParam.getSql();
		Assert.hasText(sql, "SqlParam sql must not be null");
		SQLQuery sqlQuery = getCurrentSession().createSQLQuery(sql);
		// 设置参数
		if (EmptyUtils.isNotEmpty(sqlParam.getArgs())) {
			setParams(sqlQuery, sqlParam.getArgs());
		} else if (EmptyUtils.isNotEmpty(sqlParam.getParams())) {
			setParams(sqlQuery, sqlParam.getParams());
		}
		// 设置查询列类型
		Map<String, Type> aliasAndTypeMap = sqlParam.getColumnAliasAndTypeMap();
		if (EmptyUtils.isNotEmpty(aliasAndTypeMap)) {
			Set<Entry<String, Type>> entries = aliasAndTypeMap.entrySet();
			for (Entry<String, Type> entry : entries) {
				sqlQuery.addScalar(entry.getKey(), entry.getValue());
			}
		}
		// 返回结果类型
		if (EmptyUtils.isNotEmpty(sqlParam.getResultTransformerType())) {
			sqlQuery.setResultTransformer(getResultTransformer(sqlParam
					.getResultTransformerType()));
		}
		
		//Entity类型
		if( EmptyUtils.isNotEmpty(sqlParam.getEntityTypeList()) ){
			List<Class> typeList = sqlParam.getEntityTypeList();
			for (Class entityType : typeList) {
				sqlQuery.addEntity(entityType);
			}
		}
		
		// 分页
		if (EmptyUtils.isNotEmpty(sqlParam.getFirstResult())) {
			sqlQuery.setFirstResult(sqlParam.getFirstResult());
		}
		if (EmptyUtils.isNotEmpty(sqlParam.getMaxResults())) {
			sqlQuery.setMaxResults(sqlParam.getMaxResults());
		}
		return sqlQuery.list();
	}

	@Override
	public List queryByHqlParam(HqlParam hqlParam) {
		String hql = hqlParam.getHql();
		Assert.hasText(hql, "HqlParam hql must not be null");
		Query query = getCurrentSession().createQuery(hql);
		// 设置参数
		if (EmptyUtils.isNotEmpty(hqlParam.getArgs())) {
			setParams(query, hqlParam.getArgs());
		} else if (EmptyUtils.isNotEmpty(hqlParam.getParams())) {
			setParams(query, hqlParam.getParams());
		}
		// 返回结果类型
		if (null != hqlParam.getResultTransformerType()) {
			query.setResultTransformer(getResultTransformer(hqlParam
					.getResultTransformerType()));
		}
		// 分页
		if (hqlParam.getFirstResult() != null) {
			query.setFirstResult(hqlParam.getFirstResult());
		}
		if (hqlParam.getMaxResults() != null) {
			query.setMaxResults(hqlParam.getMaxResults());
		}
		return query.list();
	}

	@Override
	public Page queryPage(String sql, Map<String, Object> params, Page page) {
		String countQueryString = getCountQueryString(sql);
		Long total = queryObject(countQueryString, params, Long.class);
		if (total > 0) {
			page.setTotal(total);
			List<Map<String, Object>> data = queryList(sql, params, page.getFirstResult(), page.getPageSize());
			page.setData(data);
		}
		return page;
	}

	@Override
	public Page queryPage(String sql, Object[] args, Page page) {
		String countQueryString = getCountQueryString(sql);
		Long total = queryObject(countQueryString, args, Long.class);
		if (total > 0) {
			page.setTotal(total);
			page.setData(queryList(sql, args, page.getFirstResult(),
					page.getPageSize()));
		}
		return page;
	}

	@Override
	public Page queryPageByCriteriaParam(Class clazz,
			CriteriaParam criteriaParam, Page page) {
		Criteria criteria = createCriteria(clazz);
		// 条件
		criteria.add(criteriaParam.getCriterion());
		// 统计总记录数条件
		criteria.setProjection(Projections.rowCount());
		// 获取总记录数
		long count = (Long) criteria.uniqueResult();
		if (count > 0) {
			page.setTotal(count);
			// 设置分页参数
			criteriaParam.setFirstResult(page.getFirstResult()).setMaxResults(
					page.getPageSize());
			criteriaParam.setProjections(null);
			// 查询分页
			page.setData(queryByCriteriaParam(clazz, criteriaParam));
		}
		return page;
	}

	@Override
	public Page queryPageByExampleParam(Class clazz, ExampleParam exampleParam,
			Page page) {

		Object entity = exampleParam.getEntity();
		if (EmptyUtils.isNotEmpty(entity)) {
			Criteria criteria = createCriteria(entity.getClass());
			Example example = Example.create(entity);
			if (exampleParam.isExcludeNone()) {
				example.excludeNone();
			}
			if (exampleParam.isEnableLike()) {
				example.enableLike();
			}
			if (exampleParam.isExcludeZeroes()) {
				example.excludeZeroes();
			}
			if (exampleParam.isIgnoreCase()) {
				example.ignoreCase();
			}
			List<String> excludePropertys = exampleParam.getExcludePropertys();
			if (EmptyUtils.isNotEmpty(excludePropertys)) {
				for (String name : excludePropertys) {
					example.excludeProperty(name);
				}
			}
			criteria.add(example);
			long count = (long) criteria.setProjection(Projections.rowCount())
					.uniqueResult();
			if (count > 0) {
				page.setTotal(count);
				// 排序
				List<Order> orders = exampleParam.getOrders();
				if (EmptyUtils.isNotEmpty(orders)) {
					for (Order order : orders) {
						criteria.addOrder(order);
					}
				}
				criteria.setProjection(null);
				page.setData(criteria.setFirstResult(page.getFirstResult())
						.setMaxResults(page.getPageSize()).list());
			}
		}
		return page;
	}

	@Override
	public Page queryPageByHql(String hql, Object[] args, Page page) {
		String countQueryString = getCountQueryString(hql);
		long total = Long.valueOf( setParams(createQuery(countQueryString), args).uniqueResult().toString() );
		if (total > 0) {
			page.setTotal(total);
			page.setData(queryByHql(hql, args, page.getFirstResult(),
					page.getPageSize()));
		}
		return page;
	}

	@Override
	public Page queryPageByHql(String hql, Map<String, Object> params, Page page) {
		String countQueryString = getCountQueryString(hql);
		long total = (long) setParams(createQuery(countQueryString), params)
				.uniqueResult();
		if (total > 0) {
			page.setTotal(total);
			page.setData(queryByHql(hql, params, page.getFirstResult(),
					page.getPageSize()));
		}
		return page;
	}

	@Override
	public Map<String, Object> queryMap(String sql) throws DaoException {
		return queryMap(sql, (Object[]) null);
	}

	@Override
	public List<Map<String, Object>> queryList(String sql) throws DaoException {
		return queryList(sql, (Object[]) null);
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~更新接口:开始~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

	@Override
	public int update(String sql) throws DaoException {
		return update(sql, (Object[]) null);
	}

	@Override
	public int update(String sql, Object[] args) throws DaoException {
		return setParams(createSQLQuery(sql), args).executeUpdate();
	}

	@Override
	public int updateByHql(String hql, Object[] args)
			throws DataAccessException {
		return setParams(createQuery(hql), args).executeUpdate();
	}

	@Override
	public int updateByHql(String hql, Map<String, Object> params)
			throws DataAccessException {
		return setParams(createQuery(hql), params).executeUpdate();
	}

	@Override
	public int[] batchUpdate(final String sql, final List<Object[]> args) {
		return getCurrentSession().doReturningWork(new ReturningWork<int[]>() {
			@Override
			public int[] execute(Connection connection) throws SQLException {
				PreparedStatement ps = connection.prepareStatement(sql);
				for (Object[] arg : args) {
					for (int i = 0; i < arg.length; i++) {
						ps.setObject(i + 1, arg[i]);
					}
					ps.addBatch();
				}
				return ps.executeBatch();
			}
		});
	}

	@Override
	public int[] batchUpdate(final String... sqls) {
		return getCurrentSession().doReturningWork(new ReturningWork<int[]>() {
			@Override
			public int[] execute(Connection connection) throws SQLException {
				Statement st = connection.createStatement();
				for (String sql : sqls) {
					st.addBatch(sql);
				}
				return st.executeBatch();
			}
		});
	}

	@Override
	public Page queryPage(String sql, Page page) throws DaoException {
		return queryPage(sql, (Object[])null, page);
	}

	@Override
	public Page queryPageByHql(String hql, Page page) {
		return queryPageByHql(hql, (Object[])null, page);
	}

	@Override
	public Page queryPage(Class clazz, Page page) {
		return queryPageByCriteriaParam(clazz, CriteriaParam.getInstance(), page);
	}

	@Override
	public Page queryPageBySqlParam(SqlParam sqlParam, Page page) {

		String sql = sqlParam.getSql();
		Assert.hasText(sql, "SqlParam sql must not be null");
		
		Object[] args = sqlParam.getArgs();
		long total = count(sql, EmptyUtils.isNotEmpty(args) ? args : sqlParam.getParams() );
		if( total <= 0 ){
			return page;
		}
		
		page.setTotal(total);
		
		SQLQuery sqlQuery = getCurrentSession().createSQLQuery(sql);
		// 设置参数
		if (EmptyUtils.isNotEmpty(sqlParam.getArgs())) {
			setParams(sqlQuery, sqlParam.getArgs());
		} else if (EmptyUtils.isNotEmpty(sqlParam.getParams())) {
			setParams(sqlQuery, sqlParam.getParams());
		}
		
		// 设置查询列类型
		Map<String, Type> aliasAndTypeMap = sqlParam.getColumnAliasAndTypeMap();
		if (EmptyUtils.isNotEmpty(aliasAndTypeMap)) {
			Set<Entry<String, Type>> entries = aliasAndTypeMap.entrySet();
			for (Entry<String, Type> entry : entries) {
				sqlQuery.addScalar(entry.getKey(), entry.getValue());
			}
		}
		// 返回结果类型
		if (EmptyUtils.isNotEmpty(sqlParam.getResultTransformerType())) {
			sqlQuery.setResultTransformer(getResultTransformer(sqlParam
					.getResultTransformerType()));
		}
		
		//Entity类型
		if( EmptyUtils.isNotEmpty(sqlParam.getEntityTypeList()) ){
			List<Class> typeList = sqlParam.getEntityTypeList();
			for (Class entityType : typeList) {
				sqlQuery.addEntity(entityType);
			}
		}
		
		// 分页
		if (EmptyUtils.isNotEmpty(sqlParam.getFirstResult())) {
			sqlQuery.setFirstResult(sqlParam.getFirstResult());
		}
		if (EmptyUtils.isNotEmpty(sqlParam.getMaxResults())) {
			sqlQuery.setMaxResults(sqlParam.getMaxResults());
		}
		
		page.setData(sqlQuery.list());
		
		return page;
	}
	
	/**
	 * 统计查询
	 * @param sql
	 * @param params
	 * @return
	 */
	private long count(String sql, Object params) {
		return Long.valueOf(setParams(createSQLQuery(getCountQueryString(sql)),
				params).uniqueResult().toString());
	}

	@SuppressWarnings("unused")
	private long countByHql(String hql, Object params) {
		return Long.valueOf(setParams(createQuery(getCountQueryString(hql)),
				params).uniqueResult().toString());
	}

	@Override
	public int updateByHql(String hql) throws DaoException {
		return updateByHql(hql, (Object[])null);
	}
	
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~更新接口:结束~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
}
