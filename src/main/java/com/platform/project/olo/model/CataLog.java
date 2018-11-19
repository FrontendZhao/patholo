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
@Table(name="tb_catalog")
public class CataLog  implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	@Column
	private String name;
	@Column
	private String category;
	@Column
	private Integer pid;
	@Column
	private String synopsis;
	@Column
	private Boolean visible;
	@Column
	private Integer sortId;
	@Column
	private Integer chapsort;
	@Column
	private Integer nodesort;
	@Column
	private Integer sliceFlag;
	@Column
	private String idcode;
	
	
	public Integer getSliceFlag() {
		return sliceFlag;
	}
	public String getIdcode() {
		return idcode;
	}
	public void setSliceFlag(Integer sliceFlag) {
		this.sliceFlag = sliceFlag;
	}
	public void setIdcode(String idcode) {
		this.idcode = idcode;
	}
	public Integer getNodesort() {
		return nodesort;
	}
	public void setNodesort(Integer nodesort) {
		this.nodesort = nodesort;
	}
	public Integer getChapsort() {
		return chapsort;
	}
	public void setChapsort(Integer chapsort) {
		this.chapsort = chapsort;
	}
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
	public Integer getPid() {
		return pid;
	}
	public void setPid(Integer pid) {
		this.pid = pid;
	}
	public String getSynopsis() {
		return synopsis;
	}
	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}
	public Boolean getVisible() {
		return visible;
	}
	public void setVisible(Boolean visible) {
		this.visible = visible;
	}
	public Integer getSortId() {
		return sortId;
	}
	public void setSortId(Integer sortId) {
		this.sortId = sortId;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	
	
	
	
}
