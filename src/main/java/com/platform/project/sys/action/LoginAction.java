package com.platform.project.sys.action;

import javax.servlet.http.HttpSession;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;

import com.platform.project.sys.model.User;
import com.platform.project.sys.service.IUserService;
import com.platform.util.EmptyUtils;

@SuppressWarnings("serial")
@Namespace("/sys")
@Results({ 
	@Result(name = "index", type="redirect", location = "/views/docs/index.jsp"),
	@Result(name = "check", type="redirect", location = "/views/check/check.jsp"),
	@Result(name = "book", type="redirect", location = "/views/docs/catalog/book/book.jsp")
	})
public class LoginAction extends BaseAction {

	@Autowired
	IUserService userService;
	
	@SuppressWarnings("rawtypes")
	public String doLogin(){
		HttpSession session = getSession();
		String username = getValue("j_username");
		String pageid=getValue("pageid");
		try {
			session.setAttribute("username", username);
		} catch (ServiceException e) {
			e.printStackTrace();
			throw new ServiceException("用户登录失败", e);
		}
		//把主体对象
		if(EmptyUtils.isNotEmpty(pageid)){
			return pageid;
		}
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
