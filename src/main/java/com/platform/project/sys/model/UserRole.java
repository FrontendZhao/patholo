package com.platform.project.sys.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *@author 名字 ：zhaoqingshan
 *@version 创建时间：2018年9月2日下午5:28:50
 */

@Entity
@Table(name="tb_user_role")
public class UserRole {

	@Id
	private Integer id;
	@Column
	private Integer userId;
	@Column
	private Integer roleId;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getUserId() {
		return userId;
	}
	public Integer getRoleId() {
		return roleId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	
	
}
