package com.platform.project.olo.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *@author 名字 ：zhaoqingshan
 *@version 创建时间：2018年7月5日下午3:29:17
 */
@Entity
@Table(name="tb_postil")
public class Postil {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	@Column
	private String b;
	@Column
	private Integer sliceNo;
	@Column
	private Integer userId;
	@Column
	private Integer flag;
	
	public Integer getFlag() {
		return flag;
	}
	public void setFlag(Integer flag) {
		this.flag = flag;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getSliceNo() {
		return sliceNo;
	}
	public void setSliceNo(Integer sliceNo) {
		this.sliceNo = sliceNo;
	}
	public String getB() {
		return b;
	}
	public void setB(String b) {
		this.b = b;
	}
	
}
