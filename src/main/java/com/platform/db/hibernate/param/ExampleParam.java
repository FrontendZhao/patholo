package com.platform.db.hibernate.param;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
public class ExampleParam {

	protected Integer firstResult = -1;
	protected Integer maxResults = -1;
	private Object entity;			//查询的实体 
	private boolean excludeNone; 	//是否忽略值为Null的字段
	private boolean ignoreCase;		//是否忽略大小写(字符串类型)
	private boolean excludeZeroes; 	//是否忽略值为0的字段
	private boolean enableLike;		//是否使用模糊查询
	private MatchMode likeMatchMode;		//模糊查询的匹配模式
	private List<String> excludePropertys = new ArrayList<String>(); //需要被忽略的字段
	private List<Order> orders = new ArrayList<Order>();
	
	public ExampleParam(){
		this.excludeNone = false;
		this.ignoreCase = true;
		this.excludeZeroes = false;
		this.enableLike = true;
		this.likeMatchMode = MatchMode.ANYWHERE;
	}
	
	public ExampleParam(Object entity) {
		this.entity = entity;
	}

	public ExampleParam addExcludeProperty(String...propertysName){
		for (int i = 0; i < propertysName.length; i++) {
			excludePropertys.add(propertysName[i]);
		}
		return this;
	}

	public ExampleParam asc(String... propertyNames){
		for (Integer i = 0; i < propertyNames.length; i++) {
			orders.add(Order.asc(propertyNames[i]));
		}
		return this;
	}

	public ExampleParam desc(String... propertyNames) {
		for (Integer i = 0; i < propertyNames.length; i++) {
			orders.add(Order.desc(propertyNames[i]));
		}
		return this;
	}
	
	public ExampleParam startLikeMatchMode(){
		likeMatchMode = MatchMode.START;
		return this;
	}

	public ExampleParam endLikeMatchMode(){
		likeMatchMode = MatchMode.START;
		return this;
	}

	public ExampleParam anywhereLikeMatchMode(){
		likeMatchMode = MatchMode.ANYWHERE;
		return this;
	}


	public boolean isExcludeNone() {
		return excludeNone;
	}

	public boolean isIgnoreCase() {
		return ignoreCase;
	}

	public boolean isExcludeZeroes() {
		return excludeZeroes;
	}

	public boolean isEnableLike() {
		return enableLike;
	}

	public MatchMode getLikeMatchMode() {
		return likeMatchMode;
	}

	public List<String> getExcludePropertys() {
		return excludePropertys;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public ExampleParam setExcludeNone(boolean excludeNone) {
		this.excludeNone = excludeNone;
		return this;
	}

	public ExampleParam setIgnoreCase(boolean ignoreCase) {
		this.ignoreCase = ignoreCase;
		return this;
	}

	public ExampleParam setExcludeZeroes(boolean excludeZeroes) {
		this.excludeZeroes = excludeZeroes;
		return this;
	}

	public ExampleParam setEnableLike(boolean enableLike) {
		this.enableLike = enableLike;
		return this;
	}

	public ExampleParam setLikeMatchMode(String likeMatchModeString) {
		if( MatchMode.ANYWHERE.name().equalsIgnoreCase(likeMatchModeString) ){
			likeMatchMode = MatchMode.ANYWHERE; 
		}else if ( MatchMode.START.name().equalsIgnoreCase(likeMatchModeString) ) {
			likeMatchMode = MatchMode.START;
		}else if ( MatchMode.END.name().equalsIgnoreCase(likeMatchModeString) ) {
			likeMatchMode = MatchMode.END;
		}
		return this;
	}

	public ExampleParam setExcludePropertys(List<String> excludePropertys) {
		this.excludePropertys = excludePropertys;
		return this;
	}

	public ExampleParam setOrders(List<Order> orders) {
		this.orders = orders;
		return this;
	}
	

	public Integer getFirstResult() {
		return firstResult;
	}

	public Integer getMaxResults() {
		return maxResults;
	}

	public ExampleParam setFirstResult(Integer firstResult) {
		this.firstResult = firstResult;
		return this;
	}

	public ExampleParam setMaxResults(Integer maxResults) {
		this.maxResults = maxResults;
		return this;
	}

	public Object getEntity() {
		return entity;
	}

	public ExampleParam setEntity(Object entity) {
		this.entity = entity;
		return this;
	}

	public static ExampleParam getInstance(Object entity){
		return new ExampleParam(entity);
	}
}
