package com.platform.project.sys.model;

import java.io.Serializable;


public interface Model<PK extends Serializable> {
	PK getId();
}
