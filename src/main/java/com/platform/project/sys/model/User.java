package com.platform.project.sys.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tb_user")
public class User {
   
	@Id
	private Integer id;
	@Column
	private String encode;
	@Column
	private String name;
	@Column
	private String pwd;
	
	public Integer getId() {
		return id;
	}
	public String getEncode() {
		return encode;
	}
	public String getName() {
		return name;
	}
	public String getPwd() {
		return pwd;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public void setEncode(String encode) {
		this.encode = encode;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	
	
}
