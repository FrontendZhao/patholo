package com.platform.project.sys.service;


import org.hibernate.service.spi.ServiceException;

import com.platform.project.sys.model.User;
public interface IUserService{
	

	/**
	 * 通过用户名和密码查询
	 * @param username
	 * @param password
	 * @return
	 */
	User findByUsernameAndPassword(String username, String password) throws ServiceException;
	
	
}
