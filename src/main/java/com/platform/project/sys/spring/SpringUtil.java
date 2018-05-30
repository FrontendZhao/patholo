package com.platform.project.sys.spring;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.platform.util.EmptyUtils;


public class SpringUtil {
	/**
	 * 获取属性配置文件中的属性
	 * @param propName
	 * @return
	 */
	public static String getProperty(String propName){
		Object property = CustomPropertyConfigurer.getContextProperty(propName);
		return EmptyUtils.isNotEmpty(property) ? String.valueOf(property) : null;
	}

	public static String getProperty(String propName, String replaceParam){
		Object property = CustomPropertyConfigurer.getContextProperty(propName);
		return EmptyUtils.isNotEmpty(property) ? String.valueOf(property).replaceAll("\\{[^{}]*\\}", replaceParam) : null;
	}

	public static String getProperty(String propName, Map<String, String> replaceParamMap){
		Object property = CustomPropertyConfigurer.getContextProperty(propName);
		if( EmptyUtils.isEmpty(property) ){
			return null;
		}
		String propVal = String.valueOf(property);
		if( EmptyUtils.isNotEmpty(replaceParamMap) ){
			Set<Entry<String,String>> entrySet = replaceParamMap.entrySet();
			for (Entry<String, String> entry : entrySet) {
				propVal = propVal.replaceAll("\\{"+entry.getKey()+"\\}", entry.getValue());
			}
		}
		return propVal;
	}
	
	
}
