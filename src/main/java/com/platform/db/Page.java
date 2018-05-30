package com.platform.db;

import java.util.List;
@SuppressWarnings("rawtypes")
public interface Page {

	/**
	 * 获取页面大小
	 * @return
	 */
	int getPageSize();
	
	/**
	 * 获取页码
	 * @return
	 */
	int getPageNo();
	
	/**
	 * 获取查询的开始行
	 * @return
	 */
	int getFirstResult();
	
	/**
	 * 设置总记录数
	 * @param total
	 */
	void setTotal(long total);

	long getTotal();
	
	/**
	 * 设置页面数据
	 * @param data
	 */
	void setData(List data);

	List getData();
}
