package com.platform.db.hibernate;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.criterion.Example;

import com.platform.db.DaoException;
import com.platform.db.IDao;
import com.platform.db.Page;
import com.platform.db.hibernate.param.CriteriaParam;
import com.platform.db.hibernate.param.ExampleParam;
import com.platform.db.hibernate.param.HqlParam;
import com.platform.db.hibernate.param.SqlParam;

@SuppressWarnings("rawtypes")
public interface IHibernateDao extends IDao {

	/**
	 * 查询全部
	 * @param clazz
	 * @return
	 */
	<T> List<T> getAll(Class<T> clazz) throws DaoException;
	
	/**
	 * 多个主键查询
	 * @param clazz
	 * @param ids
	 * @return
	 */
	<T> List<T> get(Class<T> clazz, Serializable... ids) throws DaoException;
	
	/**
	 * 单个主键查询
	 * @param clazz
	 * @param id
	 * @return
	 */
	<T> T get(Class<T> clazz, Serializable id) throws DaoException;
	
	/**
	 * 新增
	 * @param object
	 * @return
	 */
	Serializable save(Object object) throws DaoException;
	
	/**
	 * 新增或更新
	 * @param object
	 */
	void saveOrUpdate(Object object) throws DaoException;
	
	/**
	 * 更新
	 * @param object
	 */
	void update(Object object) throws DaoException;
	
	/**
	 * 合并
	 * @param object
	 * @return
	 */
	Object merge(Object object) throws DaoException;
	
	/**
	 * 删除
	 * @param object
	 */
	void delete(Object object) throws DaoException;
	
	/**
	 * 多个主键删除
	 * @param clazz
	 * @param ids
	 */
	void delete(Class clazz, Serializable... ids) throws DaoException;
	
	/**
	 * 批量新增
	 * @param objects
	 * @param batchSize
	 */
	void batchSave(List objects, int batchSize) throws DaoException;
	
	/**
	 * 批量更新
	 * @param objects
	 * @param batchSize
	 */
	void batchUpdate(List objects, int batchSize) throws DaoException;
	
	/**
	 * 批量新增或更新
	 * @param objects
	 * @param batchSize
	 */
	void batchSaveOrUpdate(List objects, int batchSize) throws DaoException;
	
	/**
	 * 批量删除
	 * @param objects
	 * @param batchSize
	 */
	void batchDelete(List objects, int batchSize) throws DaoException;
	
	/**
	 * 批量保存
	 * @param objects
	 */
	void batchSave(List objects) throws DaoException;
	
	/**
	 * 批量更新
	 * @param objects
	 */
	void batchUpdate(List objects) throws DaoException;
	
	/**
	 * 批量新增或更新
	 * @param objects
	 */
	void batchSaveOrUpdate(List objects) throws DaoException;
	
	/**
	 * 批量删除
	 * @param objects
	 */
	void batchDelete(List objects) throws DaoException;
	
	/**
	 * 单行单列查询
	 * @param sql
	 * @param params
	 * @param requiredType
	 * @return
	 * @throws DaoException
	 */
	<T> T queryObject(String sql, Map<String, Object> params, Class<T> requiredType) throws DaoException;
	
	/**
	 * 单行查询
	 * @param sql
	 * @param params
	 * @return
	 * @throws DaoException
	 */
	Map<String, Object> queryMap(String sql, Map<String, Object> params)
			throws DaoException;
	
	/**
	 * 多行单列查询
	 * @param sql
	 * @param params
	 * @param elementType
	 * @return
	 * @throws DaoException
	 */
	<T> List<T> queryList(String sql, Map<String, Object> params, Class<T> elementType) throws DaoException;
	
	/**
	 * 多行多列查询
	 * @param sql
	 * @param params
	 * @return
	 * @throws DaoException
	 */
	List<Map<String, Object>> queryList(String sql,
			Map<String, Object> params) throws DaoException;

	
	/**
	 * 多行多列查询
	 * @param sql
	 * @param params
	 * @param firstResult
	 * @param maxResults
	 * @return
	 * @throws DaoException
	 */
	List<Map<String, Object>> queryList(String sql,
			Map<String, Object> params, Integer firstResult, Integer maxResults)
			throws DaoException;
	
	/**
	 * 多行多列查询
	 * @param sql
	 * @param args
	 * @param firstResult
	 * @param maxResults
	 * @return
	 * @throws DaoException
	 */
	List<Map<String, Object>> queryList(String sql, Object[] args,
			Integer firstResult, Integer maxResults) throws DaoException;
	
	/**
	 * HQL查询
	 * @param hql
	 * @param args
	 * @param firstResult
	 * @param maxResults
	 * @return
	 */
	List queryByHql(String hql, Object[] args, Integer firstResult,
			Integer maxResults) throws DaoException;
	
	/**
	 * HQL查询
	 * @param hql
	 * @param params
	 * @param firstResult
	 * @param maxResults
	 * @return
	 */
	List queryByHql(String hql, Map<String, Object> params,
			Integer firstResult, Integer maxResults) throws DaoException;
	
	/**
	 * 分页查询
	 * @param sql
	 * @param params
	 * @param page
	 * @return
	 */
	Page queryPage(String sql, Map<String, Object> params, Page page) throws DaoException;
	
	/**
	 * 分页查询
	 * @param sql
	 * @param args
	 * @param page
	 * @return
	 */
	Page queryPage(String sql, Object[] args, Page page) throws DaoException;

	/**
	 * 分页查询
	 * @param sql
	 * @param page
	 * @return
	 * @throws DaoException
	 */
	Page queryPage(String sql, Page page) throws DaoException;

	/**
	 * HQL分页查询
	 * @param hql
	 * @param args
	 * @param page
	 * @return
	 */
	Page queryPageByHql(String hql, Object[] args, Page page);

	/**
	 * HQL分页查询
	 * @param hql
	 * @param params
	 * @param page
	 * @return
	 */
	Page queryPageByHql(String hql, Map<String, Object> params, Page page);

	/**
	 * HQL分页查询
	 * @param hql
	 * @param page
	 * @return
	 */
	Page queryPageByHql(String hql, Page page);
	
	/**
	 * HQL查询
	 * @param hql
	 * @return
	 */
	List queryByHql(String hql);
	
	/**
	 * HQL查询
	 * @param hql
	 * @param args
	 * @return
	 */
	List queryByHql(String hql, Object[] args);
	
	/**
	 * HQL查询
	 * @param hql
	 * @param params
	 * @return
	 */
	List queryByHql(String hql, Map<String, Object> params);
	
	/**
	 * QBC分页查询
	 * @param clazz
	 * @param criteriaParam
	 * @param page
	 * @return
	 */
	Page queryPageByCriteriaParam(Class clazz, CriteriaParam criteriaParam, Page page);
	
	/**
	 * QBE分页查询
	 * @param clazz
	 * @param exampleParam
	 * @param page
	 * @return
	 */
	Page queryPageByExampleParam(Class clazz, ExampleParam exampleParam, Page page);

	/**
	 * 实体分页查询
	 * @param clazz
	 * @param page
	 * @return
	 */
	Page queryPage(Class clazz, Page page);
	

	/**
	 * Criteria查询
	 * @param criteria
	 * @return
	 */
	List queryByCriteria(Criteria criteria);
	
	/**
	 * Criteria查询
	 * @param clazz
	 * @param criteriaParam
	 * @return
	 */
	List queryByCriteriaParam(Class clazz, CriteriaParam criteriaParam);
	
	/**
	 * Example查询
	 * @param example
	 * @return
	 */
	List queryByExample(Example example);
	
	/**
	 * Example查询
	 * @param exampleParam
	 * @return
	 */
	List queryByExampleParam(ExampleParam exampleParam);
	
	/**
	 * SQLQuery查询
	 * @param sqlParam
	 * @return
	 */
	List queryBySqlParam(SqlParam sqlParam);

	Page queryPageBySqlParam(SqlParam sqlParam, Page page);
	
	/**
	 * Query查询
	 * @param hqlParam
	 * @return
	 */
	List queryByHqlParam(HqlParam hqlParam);
	
	/**
	 * 增删改
	 * @param sql
	 * @param params
	 * @return
	 * @throws DaoException
	 */
	int update(String sql, Map<String, Object> params)
			throws DaoException;
	
	
	/**
	 * HQL更新
	 * @param hql
	 * @return
	 * @throws DaoException
	 */
	int updateByHql(String hql) throws DaoException;
	
	/**
	 * HQL更新
	 * @param hql
	 * @param args
	 * @return
	 * @throws DaoException
	 */
	int updateByHql(String hql, Object[] args) throws DaoException;
	
	/**
	 * HQL更新
	 * @param hql
	 * @param params
	 * @return
	 * @throws DaoException
	 */
	int updateByHql(String hql, Map<String, Object> params) throws DaoException;
	
	/**
	 * 批量执行Sql
	 * @param sqls
	 * @return
	 * @throws DaoException
	 */
	int[] batchUpdate(String... sqls) throws DaoException;

}
