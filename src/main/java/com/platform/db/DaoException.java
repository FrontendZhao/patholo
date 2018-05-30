package com.platform.db;
@SuppressWarnings("serial")
public class DaoException extends RuntimeException{
	public DaoException(String msg) {
		super(msg);
	}
	public DaoException(String msg, Throwable cause) {
		super(msg, cause);
	}
}
