package com.platform.project.sys.service.impl;

import java.util.List;

import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;

import com.platform.db.hibernate.param.CriteriaParam;
import com.platform.project.sys.model.User;
import com.platform.project.sys.service.BaseService;
import com.platform.project.sys.service.IUserService;

@Service
@SuppressWarnings({ "rawtypes", "unchecked" })
public class UserServiceImpl extends BaseService implements IUserService {

	Class<User> clazz = User.class;

	@Override
	public User findByUsernameAndPassword(String username, String password)
			throws ServiceException {
		List<User> list = hibernateDao.queryByCriteriaParam(
				clazz,
				CriteriaParam.getInstance().eq("encode", username)
						.eq("pwd", password));
		if (!list.isEmpty()) {
			return list.get(0);
		}
		return null;
	}

	
	
	public static Boolean isnumber(String str){
		for (int j = 0; j < str.length(); j++) {
			if(!Character.isDigit(str.charAt(j))){
				return false;
			}
		}
		return true;
	}
}
