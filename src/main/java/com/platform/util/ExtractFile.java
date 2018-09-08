package com.platform.util;
import java.io.File;

import javax.servlet.ServletContext;

import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.platform.project.sys.spring.SpringUtil;


public class ExtractFile{
  static{
	System.out.println(System.getProperty("java.library.path"));
    System.loadLibrary(SpringUtil.getProperty("java_library_hongfei"));
    
  }
  ExtractFile(String filePath)
  {
	  CreateMDSFile(filePath);
    
  }
  public ExtractFile()
  {
    
  }
  
  public native void CreateMDSFile(String filePath);
  public native byte[] GetTileData(int Level,int x,int y);
  public native void ReleaseMDSFile();
  public native byte[] GetThumbnail(int height);
  public static Logger log=LoggerFactory.getLogger(ExtractFile.class);
  private long ptrMDS;
  public int maxLevel;
  public int ImageWidth;
  public int ImageHeight;
  public int TileWidth;
  public int TileHeight;
 /* public static void main(String[] args) {
	 System.out.println(99);
    //ExtractFile newClass=new ExtractFile("D:\\切片\\科目\\医学形态学实验\\第二章\\气管\\气管.mds");
    //ServletContext application=ServletActionContext.getServletContext();
	//application.setAttribute("extract", newClass);
    System.out.println("maxLevel:"+newClass.maxLevel);
    System.out.println("ImageWidth:"+newClass.ImageWidth);
    System.out.println("ImageHeight:"+newClass.ImageHeight);
    System.out.println("TileWidth:"+newClass.TileWidth);
    System.out.println("TileHeight:"+newClass.TileHeight);
    System.out.println(newClass.newClass.GetTileData(12,3,3));
		
   // byte[] data=newClass.GetTileData(11,1,1);
    //newClass.ReleaseMDSFile();
   }*/
	public static Object getSliceTileData(String path,String sliceNo) {
			ServletContext application=ServletActionContext.getServletContext();
			Object newClass=application.getAttribute(sliceNo);
			String slicePath= SpringUtil.getProperty("example_file_path");
			if(!EmptyUtils.isNotEmpty(newClass) && (new File(slicePath+"/科目/"+path+".mds").exists())){
				newClass=new ExtractFile(slicePath+"/科目/"+path+".mds");
				application.setAttribute(sliceNo,newClass);
				//((ExtractFile)newClass).ReleaseMDSFile();
			}
			return newClass;
	}
	
	
	
	public static byte[] getSliceTileData(String level,String x,String y,String sliceNo) throws InterruptedException{
		ServletContext application=ServletActionContext.getServletContext();
		if(!EmptyUtils.isNotEmpty(application.getAttribute(sliceNo))){
			return null;
		}
		byte [] b=null;
		try {
			ExtractFile newClass=(ExtractFile)application.getAttribute(sliceNo);
			b=newClass.GetTileData(Integer.parseInt(level),Integer.parseInt(x),Integer.parseInt(y));
		} catch (Exception e) {
			log.warn(level+","+x+","+y);
			//e.printStackTrace();
		}
		//Thread.sleep(1000);
		return b;
	}
	public static byte[] getSliceThumbnail(String height,String sliceNo) throws InterruptedException{
		ServletContext application=ServletActionContext.getServletContext();
		if(!EmptyUtils.isNotEmpty(application.getAttribute(sliceNo))){
			return null;
		}
		byte [] b=null;
		try {
			ExtractFile newClass=(ExtractFile)application.getAttribute(sliceNo);
			b=newClass.GetThumbnail(Integer.parseInt(height));
		} catch (Exception e) {
			log.warn(sliceNo+"缩略图出错");
		}
		return b;
	}
}
