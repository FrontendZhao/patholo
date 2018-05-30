package com.platform.project.sys.job;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.platform.util.Utils;
import com.platform.project.sys.spring.SpringUtil;

public class BackupJob {
	static final Logger LOG = LoggerFactory.getLogger(BackupJob.class);
	
	/**
	 * 备份数据库
	 */
	public void backupDb(){
		String url = SpringUtil.getProperty("db.url");
		String user = SpringUtil.getProperty("db.username");
		String password = SpringUtil.getProperty("db.password");
		String dbName = url.substring(url.lastIndexOf(":") + 1, url.length());
		String dbExpPath = SpringUtil.getProperty("db_exp_path");
		String file = dbExpPath.replaceAll("\\\\", "/");
		String log = dbExpPath.replaceAll("\\\\", "/");
		
		String format = SpringUtil.getProperty("db_exp_format");
		String dbFileName = user + "aa";//DateTimeUtils.format(new Date(), format);
		file = "\"" + file + "/" + dbFileName + ".dmp\"";
		log = "\"" + log + "/" + dbFileName + ".log\"";
		String expCmd = "exp " + user + "/" + password + "@" + dbName + " file="+file+" log=" + log + " owner=" + user + " rows=y";
		LOG.warn("++++++备份数据库开始:"+expCmd+"++++++");
		Utils.execCmd(expCmd);
		LOG.warn("++++++备份数据库结束:"+expCmd+"++++++");
	}
	
	public void backupProj(){
		LOG.warn("++++++开始备份项目1++++++");
		LOG.warn("++++++结束备份项目1++++++");
	}
	
	public static void main(String[] args) {
		String webappRoot = System.getProperty("webapp.root");
		System.out.println(webappRoot);
	}
	
}
