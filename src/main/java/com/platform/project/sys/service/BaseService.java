package com.platform.project.sys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.platform.db.hibernate.IHibernateDao;

public abstract class BaseService {
	@Autowired
	protected IHibernateDao hibernateDao; 

	@Autowired
	protected JdbcTemplate jdbcTemplate; 
	
}
