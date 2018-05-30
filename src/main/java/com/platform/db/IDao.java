package com.platform.db;

import java.util.List;
import java.util.Map;

public interface IDao {
	
	/**
	 * 单行单列查询
	 * @param sql	查询SQL
	 * @param requiredType	单列类型
	 * @return
	 * @throws DaoException
	 */
	<T> T queryObject(String sql, Class<T> requiredType) throws DaoException;
	
	/**
	 * 单行单列查询
	 * @param sql	查询SQL
	 * @param args	查询参数
	 * @param requiredType	单列类型
	 * @return
	 * @throws DaoException
	 */
	<T> T queryObject(String sql, Object[] args, Class<T> requiredType)
			throws DaoException;
	
	/**
	 * 单行查询
	 * @param sql	查询SQL
	 * @return
	 * @throws DaoException
	 */
	Map<String, Object> queryMap(String sql)
			throws DaoException;
	
	/**
	 * 单行查询
	 * @param sql	查询SQL
	 * @param args	查询参数
	 * @return
	 * @throws DaoException
	 */
	Map<String, Object> queryMap(String sql, Object[] args)
			throws DaoException;
	
	/**
	 * 多行多列查询
	 * @param sql	查询SQL
	 * @return
	 * @throws DaoException
	 */
	List<Map<String, Object>> queryList(String sql)
			throws DaoException;
	
	/**
	 * 多行单列查询
	 * @param sql	查询SQL
	 * @param args	查询参数
	 * @param elementType	单列类型
	 * @return
	 * @throws DaoException
	 */
	<T> List<T> queryList(String sql, Object[] args, Class<T> elementType)
			throws DaoException;
	
	/**
	 * 多行多列查询
	 * @param sql	查询SQL
	 * @param args	查询参数
	 * @return
	 * @throws DaoException
	 */
	List<Map<String, Object>> queryList(String sql, Object[] args)
			throws DaoException;
	
	/**
	 * 增删改操作
	 * @param sql	更新SQL
	 * @param args	更新参数
	 * @return
	 * @throws DaoException
	 */
	int update(String sql, Object[] args) throws DaoException;

	/**
	 * 增删改操作
	 * @param sql	更新SQL
	 * @return
	 * @throws DaoException
	 */
	int update(String sql) throws DaoException;
	
	/**
	 * 批量增删改操作
	 * @param sql	更新SQL
	 * @param batchArgs	批量更新参数
	 * @return
	 * @throws DaoException
	 */
	int[] batchUpdate(String sql, List<Object[]> batchArgs)
			throws DaoException;

}
