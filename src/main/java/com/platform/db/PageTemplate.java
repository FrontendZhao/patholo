package com.platform.db;

import java.util.ArrayList;
import java.util.List;

public class PageTemplate implements Page{
	
	private int pageSize = 10;
	private int pageNo = 1;
	private long total;
	@SuppressWarnings("rawtypes")
	private List data = new ArrayList();
	
	@Override
	public int getPageSize() {
		return pageSize;
	}

	@Override
	public int getPageNo() {
		return pageNo;
	}

	@Override
	public int getFirstResult() {
		return (pageNo - 1) * pageSize;
	}

	@Override
	public void setTotal(long total) {
		this.total = total;
	}

	@Override
	public long getTotal() {
		return total;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public void setData(List data) {
		this.data = data;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public List getData() {
		return data;
	}

}
