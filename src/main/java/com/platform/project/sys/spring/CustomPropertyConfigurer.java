package com.platform.project.sys.spring;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;


public class CustomPropertyConfigurer extends PropertyPlaceholderConfigurer {
	private static Map<String, Object> ctxPropertiesMap;

	@Override
	protected void processProperties(
			ConfigurableListableBeanFactory beanFactoryToProcess,
			Properties props) throws BeansException {
		super.processProperties(beanFactoryToProcess, props);
		// load properties to ctxPropertiesMap
		ctxPropertiesMap = new HashMap<String, Object>();
		for (Object key : props.keySet()) {
			String keyStr = key.toString();
			String value = props.getProperty(keyStr);
			ctxPropertiesMap.put(keyStr, value);
		}

	}
	
	//static method for accessing context properties  
    public static Object getContextProperty(String name) {  
        return ctxPropertiesMap.get(name);  
    } 

}
