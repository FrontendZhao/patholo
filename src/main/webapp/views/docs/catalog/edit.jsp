<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@include file="../../init/root.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
</style>
<link href="${ctx}/resources/reference/jquery/colorpicker/dist/css/bootstrap-colorpicker.min.css"  type="text/css" rel="stylesheet" media="all" >
</head>
<body>

				<ul id="myTab" class="nav nav-tabs">
					<li class="active"><a href="#edit" data-toggle="tab">图形信息</a></li>
					<li><a href="#prop" data-toggle="tab">测量信息</a></li>
					<li><a href="#textID" data-toggle="tab">文本说明</a></li>
					<li><a href="#videoID" id="videoTitle" data-toggle="tab" style="display: none;">视频教学</a></li>
				</ul>
				<div id="myTabContent" class="tab-content">
				
					<div class="tab-pane fade in active" id="edit">
					         <div class="modal-body">
						         <table class="table-condensed">
									   <tbody>
									   
									      <tr>
									         <td>类型:</td>
									         <td>
										         <select id="propType" style="width: 340">
									                 <option value="line">直线</option>
									                 <option value="curv">曲线</option>
									                 <option value="roun">圆型</option>
									                 <option value="elli">椭圆</option>
									                 <option value="rect">矩形</option>
									                 <option value="poly">正多边形</option>
									                 <option value="angp">折线</option>
									                 <option value="arcp1">贝塞尔曲线</option>
									                 <option value="arcp">圆弧</option>
									                 <option value="roup">封闭折线</option>
									             </select>
									         </td>
									      </tr>
									   
									      <tr>
									         <td>线宽:</td>
									         <td>
									             <select id="strokeW" style="width: 340">
									                 <option value="1">1</option>
									                 <option value="2">2</option>
									                 <option value="3">3</option>
									                 <option value="4">4</option>
									                 <option value="5">5</option>
									                 <option value="6">6</option>
									                 <option value="7">7</option>
									                 <option value="8">8</option>
									                 <option value="9">9</option>
									                 <option value="10">10</option>
									                 <option value="20">20</option>
									             </select>
											 </td>
									      </tr>
									   
									      <tr>
									         <td>名字:</td>
									         <td>
										         <input type="text" style="width: 340"  id="name" >
											 </td>
									      </tr>
									      
									      <tr>
									         <td>颜色:</td>
									         <td>
										         <div id="editColorPicker" class="input-group colorpicker-component" >
											         <span class="input-group-addon"><i></i></span>
											         <input id="editColor"  type="text" class="form-control" style="width: 300" value="#0000ff"/>
											     </div>
									         </td>
									      </tr>
									      
									      <!-- <tr>
									         <td>描述:</td>
									         <td>
										         <textarea class="form-control" rows="3"></textarea>
									         </td>
									      </tr> -->
									      <tr>
									         <td>标准批注:</td>
									         <td>
									                <div class="bootstrap-switch-square">
									                     <input type="checkbox" data-toggle="switch" disabled="disabled" id="switchID" />
									                </div> 
									         </td>
									      </tr>
									   </tbody>
									</table>
					         
					            
					         </div>
					</div>
					<div class="tab-pane fade" id="prop">
						         <div class="modal-body">
						         <div class="row">
                                     <div class="col-md-6">
                                          <div class="form-group" id="width" >
										      <label   class="control-label"></label>
										   </div>
										   <div class="form-group" id="height"  >
										      <label   class="control-label"></label>
										   </div>
										   <div class="form-group" id="girth" >
										      <label   class="control-label"></label>
										   </div>
										   <div class="form-group" id="area" >
										      <label   class="control-label"></label>
										   </div>
                                     </div>
                                     <!-- <div class="col-md-6">
                                           <div id="openSeadProp" style="width: 500px;height: 500px;"></div>
                                     </div> -->
                                  </div>
			
						         </div>
					</div>
					<div class="tab-pane fade" id="videoID">
						<video id="video" controls="controls"  width="400">
				            <source src="/filePath/科目/医学形态学实验/第二章/大动脉/video/1.mp4" type="video/mp4" />
				         </video>
				         <div class="form-group">
						      <label for="inputfileVideo">视频上传:</label>
						      <input type="file" id="inputfileVideo" accept="audio/*,video/*">
						      
						 </div>
					</div>
					
					<div class="tab-pane fade" id="textID">
						<textarea cols="80" id="editor1" name="editor1" rows="10" data-sample="1" data-sample-short="">
			            </textarea>

					</div>
				</div>


			        
		         <div class="modal-footer">
		            <button id="save" type="button" class="btn btn-primary" data-dismiss="modal">
		                                         提交
		            </button>
		            <button type="button" class="btn btn-primary" 
		               data-dismiss="modal">取消
		            </button>
		            <button id="yingyong" type="button" class="btn btn-primary" data-dismiss="modal">
		                                         应用
		            </button>
		         </div>
<script src="${ctx}/resources/reference/jquery/colorpicker/dist/js/bootstrap-colorpicker.min.js"></script>
<script src="${ctx}/resources/reference/jquery/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="${ctx}/views/docs/catalog/js/prop.js"></script>
<script type="text/javascript">
var myeditor;
$(function(){
	
	init();
	
	myeditor= CKEDITOR.replace( 'editor1');
	console.info(selObject);
	 $('#editColorPicker').colorpicker({
		container:true,
		color:selObject.stroke
	});
	 selObject.lineW && $('#strokeW').val(selObject.lineW);
	 selObject.prop && $('#propType').val(selObject.prop.propType);

	$('#yingyong').click(function(){
		var zoom= viewer.viewport.getZoom(true);
		var linew=$('#strokeW').val();
		var color=$('#editColor').val();
		selObject.set({'strokeWidth':linew/zoom,'stroke':color});
		selObject.lineW=linew;
		canvas.renderAll();
		
	}); 
	$.ajax({
		 async:false,
  	     url:WEB_ROOT+'/olo/subject!doloadCkeditop.do',
  	     contentType: 'application/json',
  	     success:function(msg){
  	    	 console.info(msg);
  	    	 if(msg!=null){
  	    		myeditor.setData(msg);
  	    	 }
  	     }
  	     
  	 })
	
	
})
console.info(selObject);
var prop=new Prop({'obj':selObject});
    prop[selObject.prop.propType]();

</script>
<script type="text/javascript">
var n=0;
$(function(){
	
	$('#inputfileImg').change(function(msg){
		//fd.append("upfile", $("#inputfileImg").get(0).files[0]);//上传的文件file
        $.ajax({
             url: WEB_ROOT+'/olo/subject!doUploadFile.do',
             type: "POST",
             processData: false,
             contentType: false,
             data: {'upfile':$("#inputfileImg").get(0).files[0]},
             success: function(data) {
                console.log(data);
             }
        })
		console.log($("#inputfileImg").get(0).files[0]);
	})
	
	$('#save').click(function(){
		var da=null;
		$.ajax({
			async:false,
            url: WEB_ROOT+'/olo/subject!doLoginBL.do',
            type: "POST",
            success: function(data) {
                if(data){
                	
                	da=data;
                	
                	savePostil();
                	
                }else{
                	
                	
                }
            }
       })
       if(da==null){
    	   
    	   window.open(WEB_ROOT+"/views/users/login.jsp","_blank");
       }
		
	})
	if(n==2){
		$('#switchID').removeAttr("disabled");
	}
	$('#switchID').change(function(){
		
		if($(this).prop("checked")){
			
			$('#videoTitle').css('display', 'block');
		}else{
			$('#videoTitle').css('display', 'none');
		}
	})
	
})
function init(){
	
	findUser();
	
	console.info(selObject);
}
function findUser(){
	$.ajax({
		async:false,
        url: WEB_ROOT+'/olo/subject!doLoginUser.do',
        type: "POST",
        success: function(data) {
            n=data;
        }
   })
}
function savePostil(){
	
	var zoom= viewer.viewport.getZoom(true);
	
	var postil=selObject.toObject(); //JSON.stringify(canvas);
	
	console.info(JSON.stringify(postil));
	
	var noteBL= $('#switchID').prop("checked");
	
	console.info(noteBL);
	
    if(postil!='undefined' && postil!=''){
    
    	 /* $.ajax({
    	     url:WEB_ROOT+'/olo/subject!doSavePostil.do',
    	     data:{'postil':JSON.stringify(postil),'sliceNo':sliceinfo.ID,'noteBL':noteBL},
    	     contentType: 'application/json',
    	     dataType:'json',
    	     success:function(success){
    	        console.info(success);
    	     }
    	     
    	 }) */
    	OnSave();
    	 
    }
	canvas.renderAll();
}
function OnSave(){
	if(CKEDITOR.instances.editor1.getData()==""){
	    alert("内容不能为空！");
	    return false;
	}else {
		var data=CKEDITOR.instances.editor1.getData();
		$.ajax({
			 type:'post',
	   	     url:WEB_ROOT+'/olo/subject!doSaveCkeditop.do',
	   	     data:{'postil':data}
	   	 })
	    console.info(CKEDITOR.instances.editor1.getData());
	}
}
</script>
</body>
</html>