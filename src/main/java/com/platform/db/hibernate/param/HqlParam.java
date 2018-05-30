package com.platform.db.hibernate.param;

import java.util.HashMap;
import java.util.Map;

@SuppressWarnings({"rawtypes"})
public class HqlParam {

	private String hql;
	private Class resultTransformerType;
	private Integer firstResult;
	private Integer maxResults;
	private Object[] args;
	private Map<String, Object> params;
	
	public HqlParam(){
	}

	public HqlParam(String hql){
		this.hql = hql;
	}
	
	public String getHql() {
		return hql;
	}

	public Class getResultTransformerType() {
		return resultTransformerType;
	}

	public HqlParam setHql(String hql) {
		this.hql = hql;
		return this;
	}

	public HqlParam setResultTransformerType(Class resultTransformerType) {
		this.resultTransformerType = resultTransformerType;
		return this;
	}

	public Integer getFirstResult() {
		return firstResult;
	}

	public Integer getMaxResults() {
		return maxResults;
	}

	public HqlParam setFirstResult(Integer firstResult) {
		this.firstResult = firstResult;
		return this;
	}

	public HqlParam setMaxResults(Integer maxResults) {
		this.maxResults = maxResults;
		return this;
	}
	
	public Map<String, Object> getParams() {
		return params;
	}
	
	public Object[] getArgs() {
		return args;
	}
	
	public HqlParam setParams(Map<String, Object> params) {
		this.params = params;
		return this;
	}

	public HqlParam setArgs(Object ... args) {
		this.args = args;
		return this;
	}
	
	public HqlParam addParam(String name, Object value){
		if( params == null ){
			params = new HashMap<String, Object>();
		}
		params.put(name, value);
		return this;
	}
	
	public static HqlParam getInstance(String hql){
		return new HqlParam(hql);
	}
}
