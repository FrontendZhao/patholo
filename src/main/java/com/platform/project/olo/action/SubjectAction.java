package com.platform.project.olo.action;


import java.io.File;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.platform.project.olo.service.ISubjectService;
import com.platform.project.sys.action.BaseAction;
import com.platform.project.sys.spring.SpringUtil;
import com.platform.util.EmptyUtils;
import com.platform.util.ExtractFile;


@SuppressWarnings("serial")
@Namespace("/olo")
@Action("subject")
@Results({@Result(name=BaseAction.LIST,location="/views/docs/index.jsp")})
public class SubjectAction extends BaseAction {

	@Autowired
	private ISubjectService subjectService;
	
	public void doFindSubjectData(){
		try {
			writeJson(subjectService.findSubjectData());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public void doFindCatalogData(){
		try {
			writeJson(subjectService.findCatalogData(getValue("subNo")));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void doFindSliceData(){
		try {
			Object obj= getSession().getAttribute("username");
			String sql="";
			if(EmptyUtils.isEmpty(obj)){
				sql+=" and tourist=1";
			}
			writeJson(subjectService.findSliceData(getValue("ID"),sql));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void doFindSliceName(){
		try {
			writeJson(subjectService.findSliceNames());
		} catch (Exception e) {
		    e.printStackTrace();
		}
	}
	
	public void doFindSliceInfo(){
		try {
			writeJson(subjectService.findSliceInfo(getValue("sliceNo")));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void doSliceThumbnail(){
		try {
			String thumbnail= SpringUtil.getProperty("Thumbnail");
			
			String thumbnailhigh= SpringUtil.getProperty("ThumbnailHigh");
			
			String [] thumb=thumbnail.split(",");
			
			byte [][] b=new byte[thumb.length][];
			
			b[0]=ExtractFile.getSliceThumbnail(thumbnailhigh, thumb[0]);
			b[1]=b[0];
			b[2]=b[0];
			b[3]=b[0];
			
			/*for (int i = 0; i < thumb.length; i++) {
				
				 b[i]=ExtractFile.getSliceThumbnail(thumbnailhigh, thumb[i]);
			} ;*/
			writeJson(b);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public void doTileUrlSlice(){
		try {
			String sliceNo=getValue("sliceNo");
			String level=getValue("level");
			String x=getValue("x");
			String y=getValue("y");
			writePng(ExtractFile.getSliceTileData(level,x,y,sliceNo),sliceNo+"_"+level+"_"+x+"_"+y);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void doSavePostil(){
		try {
			Object obj= getSession().getAttribute("username");
			
			if(EmptyUtils.isNotEmpty(obj)){
				
				writeJson(subjectService.savePostil(getValue("postil"),getValue("sliceNo"),obj.toString(),getValue("noteBL")));

			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void doLoadPostil(){
		try {
			
            Object obj= getSession().getAttribute("username");
			
			if(EmptyUtils.isNotEmpty(obj)){
				
			       writeJson(subjectService.loadPostil(getValue("sliceNo"),obj.toString()));
			}else{
				   writeJson(null);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void doUploadFile(){
		try {
			MultipartResolver resolver = new CommonsMultipartResolver(getRequest().getSession().getServletContext());
			MultipartHttpServletRequest multipartRequest = resolver.resolveMultipart(getRequest());
			MultipartFile file= multipartRequest.getFile("upfile");
			System.out.println(file);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void doLoginBL(){
		try {
			Object obj= getSession().getAttribute("username");
			if(EmptyUtils.isNotEmpty(obj)){
				writeJson(obj);
			}else{
				writeJson(false);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void doLoginUser(){
		try {
			Object obj= getSession().getAttribute("username");
			
			if(!EmptyUtils.isNotEmpty(obj)){
				
				writeJson(0);
			}else{
				
				writeJson(subjectService.loginUser(obj.toString()));
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
