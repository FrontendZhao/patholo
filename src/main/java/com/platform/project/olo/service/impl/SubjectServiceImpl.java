package com.platform.project.olo.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;

import com.platform.project.olo.model.Subject;
import com.platform.project.olo.service.ISubjectService;
import com.platform.project.sys.service.BaseService;
import com.platform.util.EmptyUtils;
import com.platform.util.ExtractFile;

@Service
public class SubjectServiceImpl extends BaseService implements ISubjectService {

	@Override
	public List<?> findSubjectData() throws ServiceException {
		return hibernateDao.queryByHql("from "+Subject.class.getName()+" where visible=1 order by sortId");
	}

	@Override
	public List<?> findCatalogData(String subNo) throws ServiceException {
		String sql="select ID,NAME,PID from tb_subject where ID=? and visible=1 union select ID,NAME,PID from tb_catalog where pid=? and visible=1";
		return hibernateDao.queryList(sql,new Object[]{subNo,subNo});
	}

	@Override
	public List<?> findSliceData(String cataNo) throws ServiceException {
		String sql="select ID,NAME,PID from tb_slice where pid=? and visible=1";
		return hibernateDao.queryList(sql,new Object[]{cataNo});
	}

	@Override
	public List<?> findSliceNames() throws ServiceException {
		String filePath= "D:\\切片\\在线实例";//SpringUtil.getProperty("example_file_path");
		File[] files = new File(filePath).listFiles();
		List<String> list=new ArrayList<>();
		for (int i = 0; i < files.length; i++) {
			 list.add(files[i].getName());
		}
		return list;
	}

	@Override
	public Object findSliceInfo(String sliceNo) throws ServiceException {
		String sql="select t.id ID,t.name NAME,t.path PATH,t.pid PID,t.visible VISIBLE,t.sortid SORTID,c.name CNAME,s.name SNAME from tb_slice t,tb_catalog c,tb_subject s where t.pid=c.id and c.pid=s.id and t.id=?";
		Map<String, Object> map=hibernateDao.queryMap(sql, new Object[]{sliceNo});
		String path="";
		if(!EmptyUtils.isNotEmpty(map)){
			return null;
		}
		if(EmptyUtils.isNotEmpty(map.get("SNAME")) && EmptyUtils.isNotEmpty(map.get("CNAME")) && EmptyUtils.isNotEmpty(map.get("NAME"))){
			path+=map.get("SNAME").toString()+"\\"+map.get("CNAME").toString()+"\\"+map.get("NAME").toString()+"\\"+map.get("NAME").toString();
		}else{
			return null;
		}
		Object obj=ExtractFile.getSliceTileData(path,sliceNo);
		if(EmptyUtils.isNotEmpty(obj)){
			ExtractFile extractFile=(ExtractFile)obj;
			map.put("WIDTH", extractFile.ImageWidth);
			map.put("HEIGHT", extractFile.ImageHeight);
			map.put("MAXLEVEL", extractFile.maxLevel);
		}
		
		return map;
	}
	@Override
	public byte[] tileUrlSlice(String level, String x, String y,
			String sliceNo) throws ServiceException, InterruptedException {
		return ExtractFile.getSliceTileData(level,x,y,sliceNo);
	}
	
	

}
