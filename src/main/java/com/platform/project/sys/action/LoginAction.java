package com.platform.project.sys.action;

import javax.servlet.http.HttpSession;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;

import com.platform.project.sys.model.User;
import com.platform.project.sys.service.IUserService;

@SuppressWarnings("serial")
@Namespace("/sys")
@Results({ 
	@Result(name = "index", type="redirect", location = "/views/docs/index.jsp")
	})
public class LoginAction extends BaseAction {

	@Autowired
	IUserService userService;
	
	@SuppressWarnings("rawtypes")
	public String doLogin(){
		HttpSession session = getSession();
		String username = getValue("j_username");
		try {
			session.setAttribute("username", username);
		} catch (ServiceException e) {
			e.printStackTrace();
			throw new ServiceException("用户登录失败", e);
		}
		//把主体对象
		return "index";
	}
	
	
	/**
	 * 登录验证
	 */
	public void doCheckLogin(){
		String username = getValue("j_username");
		String password = getValue("j_password");
		try {
			User user = userService.findByUsernameAndPassword(username, password);
			writeJson(user == null ? false : true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
}
