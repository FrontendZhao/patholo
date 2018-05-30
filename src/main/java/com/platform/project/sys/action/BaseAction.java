package com.platform.project.sys.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.ParentPackage;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ActionSupport;
import com.platform.util.EmptyUtils;
import com.platform.util.Utils;

@SuppressWarnings({"serial"})
@ParentPackage("basePackage")
public class BaseAction extends ActionSupport {
	public static final String LIST = "list";
	protected Map<String, Object> dataMap = new LinkedHashMap<String, Object>();
	private Map<String, Object> paramMap = new HashMap<String, Object>();
	
	protected String view;
	protected String listView = LIST;
	
	static SerializerFeature[] features = new SerializerFeature[]{
			SerializerFeature.WriteDateUseDateFormat
		};
		
	public String toList(){
		return listView;
	}

	public String toView(){
		return view;
	}

	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public String getView() {
		return view;
	}

	public String getListView() {
		return listView;
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}

	public void setView(String view) {
		this.view = view;
	}

	public void setListView(String listView) {
		this.listView = listView;
	}

	protected void writeText(String text){
		
	}

	protected void writeXml(String xml){
		
	}
	
	/**
	 * 把一个对象转换成json字符串
	 * @param value
	 * @return
	 */
	public static String format(Object value){
		return JSON.toJSONString(value, features);
	}

	protected void writeStream(byte[] data){
		writeStream(data, "您下载的文件列表.zip");
	}
	
	protected void writeStream(byte[] data, String fileName){
		try {
			HttpServletRequest request = getRequest();
			String userAgent = request.getHeader("User-Agent");
			System.out.println(userAgent);
			//判断是否是IE浏览器
			byte[] fileNameData = userAgent.contains("MSIE") ? fileName.getBytes("GBK") : fileName.getBytes("UTF-8");
			fileName = new String(fileNameData, "ISO-8859-1");
			//设置响应头信息
			HttpServletResponse response = getResponse();
			response.setContentType("application/x-msdownload");
			//解决文件名中有空格的情况
			response.addHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", fileName)); // 文件名外的双引号处理firefox的空格截断问题
			ServletOutputStream out = getResponse().getOutputStream();
			//把数据写到客户端
			out.write(data);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	protected void writePng(byte[] data, String fileName){
		try {
			HttpServletRequest request = getRequest();
			String userAgent = request.getHeader("User-Agent");
			//判断是否是IE浏览器
			byte[] fileNameData = userAgent.contains("MSIE") ? fileName.getBytes("GBK") : fileName.getBytes("UTF-8");
			fileName = new String(fileNameData, "ISO-8859-1");
			//设置响应头信息
			HttpServletResponse response = getResponse();
			response.setContentType("application/x-png");
			//解决文件名中有空格的情况
			response.addHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", fileName+".png")); // 文件名外的双引号处理firefox的空格截断问题
			ServletOutputStream out = getResponse().getOutputStream();
			//把数据写到客户端
			out.write(data);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	protected void writeJson(Object json){
		HttpServletResponse response = getResponse();
		response.setContentType("application/x-json;charset=utf-8");
		PrintWriter w = null;
		try {
			w = response.getWriter();
			String jsonStr = format(json);
			LOG.info("~~~~~~~~~~~~~~~~~返回到客户端结果：开始~~~~~~~~~~~~~~~~~~");
			if( jsonStr.length()>100000 ){
				LOG.info(jsonStr.substring(0, 1000));
			}else{
				LOG.info(jsonStr);
			}
			LOG.info("~~~~~~~~~~~~~~~~~返回到客户端结果：结束~~~~~~~~~~~~~~~~~~");
			w.write( format(json) );
			w.flush();
			w.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	
	
	
/*	protected String getValue(String name){
		return getRequest().getParameter(name);
	}

	protected String[] getValues(String name){
		return getRequest().getParameterValues(name);
	}

	protected Integer getInteger(String name){
		String value = getValue(name);
		return EmptyUtils.isEmpty(value) ? null : Integer.valueOf(value);
	}

	protected Long getLong(String name){
		String value = getValue(name);
		return EmptyUtils.isEmpty(value) ? null : Long.valueOf(value);
	}

	protected Double getDouble(String name){
		String value = getValue(name);
		return EmptyUtils.isEmpty(value) ? null : Double.valueOf(value);
	}*/
	
	
    public String getValue(String paramName){
    	return getRequest().getParameter(paramName);
    }

	public String[] getValues(String paramName){
    	return getRequest().getParameterValues(paramName);
    }
    
    public Integer getInteger(String paramName){
    	return getParamValue(paramName, Integer.class);
    }

    public Integer[] getIntegers(String paramName){
    	return getParamValues(paramName, Integer.class);
    }

    public Long getLong(String paramName){
    	return getParamValue(paramName, Long.class);
    }

    public Long[] getLongs(String paramName){
    	return getParamValues(paramName, Long.class);
    }

    public Double getDouble(String paramName){
    	return getParamValue(paramName, Double.class);
    }
    
    public Double[] getDoubles(String paramName){
    	return getParamValues(paramName, Double.class);
    }
    
    private <T extends Number> T getParamValue(String paramName, Class<T> valueType){
    	T[] vals = getParamValues(paramName, valueType);
    	return EmptyUtils.isEmpty(vals) ? null : vals[0];
    }
    
    private <T extends Number> T[] getParamValues(String paramName, Class<T> valueType){
    	String[] values = getValues(paramName);
    	return EmptyUtils.isEmpty(values) ? null : Utils.numberStringArrayToArray(valueType, values);
    }
	
	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map<String, Object> getParamMap() {
		if(!paramMap.isEmpty()){
			return paramMap;
		}
		Map parameterMap = getRequest().getParameterMap();
		Set<Entry> entrySet = parameterMap.entrySet();
		String name = null;
		Object value = null;
		for (Entry entry : entrySet) {
			name = entry.getKey().toString();
			value = entry.getValue();
			if( EmptyUtils.isEmpty(value) ){
				paramMap.put(name, value);
				continue;
			}
			if(Array.getLength(value) == 1){
				paramMap.put(name, Array.get(value, 0));
				continue;
			}
			paramMap.put(name, value);
		}
		
		return paramMap;
	}

	public void setParamMap(Map<String, Object> paramMap) {
		this.paramMap = paramMap;
	}

	/**
	 * 获取request
	 * @return
	 */
	public HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}
	
	/**
	 * 获得response
	 * @return
	 */
	public HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	/**
	 * 获得session
	 * @return
	 */
	public HttpSession getSession() {
		return ServletActionContext.getRequest().getSession();
	}
	
	/**
	 * 获取ServletContext
	 * @return
	 */
	public ServletContext getServletContext() {
		return getSession().getServletContext();
	}
	
	/**
	 * 获取项目跟路径
	 * @return
	 */
	public String getRealPath(){
		return getServletContext().getRealPath("");
	}
	
	
}
