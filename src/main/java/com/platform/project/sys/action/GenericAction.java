package com.platform.project.sys.action;

import com.platform.util.RefUtils;


@SuppressWarnings({"serial","unchecked"})
public class GenericAction<T> extends BaseAction{
	protected T model;
	protected Class<T> clazz;
	
	public GenericAction(){
		try {
			clazz = (Class<T>) RefUtils.getGeneric(getClass());
			model = clazz.newInstance();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public T getModel() {
		return model;
	}

	
}
