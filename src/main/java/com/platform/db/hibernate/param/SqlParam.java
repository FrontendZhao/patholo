package com.platform.db.hibernate.param;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.type.ByteType;
import org.hibernate.type.CharacterType;
import org.hibernate.type.DateType;
import org.hibernate.type.DoubleType;
import org.hibernate.type.FloatType;
import org.hibernate.type.IntegerType;
import org.hibernate.type.ShortType;
import org.hibernate.type.StringType;
import org.hibernate.type.TimestampType;
import org.hibernate.type.Type;

import com.sun.tools.jdi.LinkedHashMap;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class SqlParam {

	private String sql;
	private Class resultTransformerType;
	private Map<String, Type> columnAliasAndTypeMap;
	private Integer firstResult;
	private Integer maxResults;

	private Object[] args;
	private Map<String, Object> params;
	
	private List<Class> entityTypeList = new ArrayList<Class>();
	
	public SqlParam() {
	}

	public SqlParam(String sql) {
		this.sql = sql;
	}

	public SqlParam addScalar(String columnAlias, Class type) {
		if (columnAliasAndTypeMap == null) {
			columnAliasAndTypeMap = new LinkedHashMap();
		}
		Type hType = null;
		if (type == byte.class || type == Byte.class) {
			hType = ByteType.INSTANCE;
		} else if (type == char.class || type == Character.class) {
			hType = CharacterType.INSTANCE;
		} else if (type == short.class || type == Short.class) {
			hType = ShortType.INSTANCE;
		} else if (type == int.class || type == Integer.class) {
			hType = IntegerType.INSTANCE;
		} else if (type == float.class || type == Float.class) {
			hType = FloatType.INSTANCE;
		} else if (type == double.class || type == Double.class) {
			hType = DoubleType.INSTANCE;
		} else if (type == String.class) {
			hType = StringType.INSTANCE;
		} else if (type == Date.class) {
			hType = DateType.INSTANCE;
		} else if (type == Timestamp.class) {
			hType = TimestampType.INSTANCE;
		}
		columnAliasAndTypeMap.put(columnAlias, hType);
		return this;
	}

	public SqlParam addScalar(String columnAlias) {
		return addScalar(columnAlias, null);
	}

	public SqlParam addParam(String name, Object value) {
		if (params == null) {
			params = new HashMap<String, Object>();
		}
		params.put(name, value);
		return this;
	}

	public String getSql() {
		return sql;
	}

	public Class getResultTransformerType() {
		return resultTransformerType;
	}

	public Map<String, Type> getColumnAliasAndTypeMap() {
		return columnAliasAndTypeMap;
	}

	public SqlParam setSql(String sql) {
		this.sql = sql;
		return this;
	}

	public SqlParam setResultTransformerType(Class resultTransformerType) {
		this.resultTransformerType = resultTransformerType;
		return this;
	}

	public Integer getFirstResult() {
		return firstResult;
	}

	public Integer getMaxResults() {
		return maxResults;
	}

	public SqlParam setFirstResult(Integer firstResult) {
		this.firstResult = firstResult;
		return this;
	}

	public SqlParam setMaxResults(Integer maxResults) {
		this.maxResults = maxResults;
		return this;
	}

	public Map<String, Object> getParams() {
		return params;
	}

	public Object[] getArgs() {
		return args;
	}

	public SqlParam setParams(Map<String, Object> params) {
		this.params = params;
		return this;
	}

	public SqlParam setArgs(Object... args) {
		this.args = args;
		return this;
	}
	
	public SqlParam addEntity(Class entityType){
		entityTypeList.add(entityType);
		return this;
	}
	
	public List<Class> getEntityTypeList() {
		return entityTypeList;
	}

	public void setEntityTypeList(List<Class> entityTypeList) {
		this.entityTypeList = entityTypeList;
	}

	public static SqlParam getInstance(String sql) {
		return new SqlParam(sql);
	}

}
