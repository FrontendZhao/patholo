package com.platform.project.sys.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *@author 名字 ：zhaoqingshan
 *@version 创建时间：2018年9月2日下午5:27:16
 */
@Entity
@Table(name="tb_role")
public class Role {

	@Id
	private Integer id;
	@Column
	private String name;
	
	public Integer getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
