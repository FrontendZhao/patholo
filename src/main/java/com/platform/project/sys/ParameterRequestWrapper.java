package com.platform.project.sys;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public class ParameterRequestWrapper extends HttpServletRequestWrapper{

	private Map<String, String[]> params;
	private static String encoding = "UTF-8";
	
	public ParameterRequestWrapper(HttpServletRequest request) {
		this(request, encoding);
	}
	
	@SuppressWarnings("unchecked")
	public ParameterRequestWrapper(HttpServletRequest request, String encode) {
		super(request);
		if( null != encode ){
			encoding = encode;
		}
		params = new HashMap<String, String[]>(request.getParameterMap());
		if( "get".equalsIgnoreCase(request.getMethod()) ){
			try {
				request.setCharacterEncoding(encoding);
				Enumeration<String> names = request.getParameterNames();
				String name = null;
				while( names.hasMoreElements() ){
					name = names.nextElement();
					String[] values = request.getParameterValues(name);
					for (int i = 0; i < values.length; i++){
						values[i] = new String(values[i].getBytes("iso8859-1"), encoding);
					}
					params.put(name, values);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	@Override
	public Map<String, String[]> getParameterMap() {
		return params;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Enumeration getParameterNames() {
		return new Vector(params.keySet()).elements();
	}
	
	@Override
	public String[] getParameterValues(String name) {
		return params.get(name);
	}
	
	@Override
	public String getParameter(String name) {
		String[] values = getParameterValues(name);
		if( values != null ){
			return values[0];
		}
		return null;
	}
	
	
}
