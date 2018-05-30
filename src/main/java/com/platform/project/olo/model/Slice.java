package com.platform.project.olo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name="tb_slice")
public class Slice  implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	@Column
	private String name;
	@Column
	private String path;
	@Column
	private Integer pid;
	@Column
	private Integer visible;
	@Column
	private Integer sortId;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public Integer getPid() {
		return pid;
	}
	public void setPid(Integer pid) {
		this.pid = pid;
	}
	public Integer getVisible() {
		return visible;
	}
	public void setVisible(Integer visible) {
		this.visible = visible;
	}
	public Integer getSortId() {
		return sortId;
	}
	public void setSortId(Integer sortId) {
		this.sortId = sortId;
	}
	
	
	
	
}
