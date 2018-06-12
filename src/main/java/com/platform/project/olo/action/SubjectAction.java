package com.platform.project.olo.action;


import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.platform.project.olo.service.ISubjectService;
import com.platform.project.sys.action.BaseAction;
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
			writeJson(subjectService.findSliceData(getValue("ID")));
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
}
