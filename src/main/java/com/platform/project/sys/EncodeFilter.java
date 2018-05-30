package com.platform.project.sys;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.platform.util.EmptyUtils;

public class EncodeFilter implements Filter{
	String encoding = "UTF-8";
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		String encode = filterConfig.getInitParameter("encoding");
		if( EmptyUtils.isNotEmpty(encode) ){
			encoding = encode;
		}
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		chain.doFilter(new ParameterRequestWrapper((HttpServletRequest) request, encoding), response);
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}
