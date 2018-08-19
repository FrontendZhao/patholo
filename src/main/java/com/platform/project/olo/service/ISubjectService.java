package com.platform.project.olo.service;

import java.io.File;
import java.util.List;

import org.hibernate.service.spi.ServiceException;

public interface ISubjectService {

	/**
	 * 取科目列表
	 * @return
	 * @throws SerialException
	 */
	public List<?> findSubjectData() throws ServiceException;
	
	/**
	 * 组合章节树
	 * @return
	 * @throws SerialException
	 */
	public List<?> findCatalogData(String subNo) throws ServiceException;
	
	/**
	 * 组合切片树
	 * @return
	 * @throws SerialException
	 */
	public List<?> findSliceData(String cataNo,String sql) throws ServiceException;
	
	/**
	 * 获取磁盘下所有实例名称
	 */
	public List<?> findSliceNames() throws ServiceException;
	
	/**
	 * 根据id获取切片信息
	 */
	public Object findSliceInfo(String sliceNo) throws ServiceException;
	
	/**
	 * 解析切片并返回切片
	 */
	public byte[] tileUrlSlice(String level,String x,String y,String sliceNo)throws ServiceException, InterruptedException ;
	
	/**
	 * 批注序列化
	 */
	public boolean savePostil(String postil,String sliceNo) throws ServiceException;
	/**
	 * 加载批注
	 * @param sliceNo
	 * @return
	 * @throws ServiceException
	 */
	public Object loadPostil(String sliceNo) throws ServiceException;
	/**
	 * 上传批注图片
	 */
	public void uploadFile(File file) throws ServiceException;
}
