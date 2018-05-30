package com.platform.util;

import java.lang.reflect.Array;
import java.util.Collection;
import java.util.Map;

/**
 * 非空判断工具类
 */
@SuppressWarnings("rawtypes")
public class EmptyUtils {
	/** 
	 * 判断为Null
	 * @param obj
	 * @return
	 */
	public static boolean isNull(Object obj){
		return obj == null;
	}
	
	/**
	 * 判断不为Null
	 * @param obj
	 * @return
	 */
	public static boolean isNotNull(Object obj){
		return ! isNull(obj);
	}
	
	/**
	 * 判断为空
	 * @param obj
	 * @return
	 */
	public static boolean isEmpty(Object obj){
		return ! isNotEmpty(obj);
	}
	
	/**
	 * 判断不为空
	 * @param obj
	 * @return
	 */
	public static boolean isNotEmpty(Object obj){
		if( isNull(obj) ){
			return false;
		}
		if( obj instanceof String ){
			return obj.toString().trim().length() > 0;
		}
		if( obj instanceof Collection ){
			return ! ( (Collection)obj ).isEmpty();
		}
		if( obj instanceof Map ){
			return ! ( (Map)obj ).isEmpty();
		}
		if( obj.getClass().isArray() ) {
			return Array.getLength(obj) > 0;
		}
		return true;
	}
	
}
