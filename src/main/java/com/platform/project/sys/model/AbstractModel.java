package com.platform.project.sys.model;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.SequenceGenerator;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

@MappedSuperclass
public abstract class AbstractModel<PK extends Serializable> implements Model<PK>{
	@Id
	@SequenceGenerator(name="SQE_OLO_1", initialValue=10000, allocationSize=1, sequenceName="SQE_OLO_1")     
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SQE_OLO_1")
	protected PK id;
	
	@Override
	public PK getId() {
		return id;
	}
	public void setId(PK id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return ReflectionToStringBuilder.reflectionToString(this);
	}
}
