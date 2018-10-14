<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@include file="../../init/root.jsp" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<title>切片</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="css/slice.css"  type="text/css" rel="stylesheet" media="all" >
<link href="${ctx}/resources/reference/jquery/ContextJS/css/context.standalone.css"  type="text/css" rel="stylesheet" media="all" >
</head> 
<body>
 <div class="panel panel-default">
	   <div class="panel-heading">
		  <h2 class="panel-title"></h2>
	   </div>   
	   <div class="panel-body" >
	      <div id="openSeadragon" class="opensead"></div>
	   </div>
</div>
<div id="toolbar">
    <div class="panel-toolbar">
         <a href="javascript:void(0)" class="toolPNG"><img alt="" src="images/make_arro.png"></a>
         <!-- <a href="javascript:void(0)" class="toolPNG selectes"><img alt="" src="images/make_arro.png"></a> -->
         <a href="javascript:void(0)" class="toolPNG curvs"><img alt="" src="images/make_curv.png"></a>
         <a href="javascript:void(0)" class="toolPNG roups"><img alt="" src="images/make_roup.png"></a>
         <a href="javascript:void(0)" class="toolPNG texts"><img alt="" src="images/make_text.png"></a>
         <a href="javascript:void(0)" class="toolPNG tolists"><img alt="" src="images/tolist.png"></a>
         <a href="javascript:void(0)" class="toolPNG configs"><img alt="" src="images/config.png"></a>
         
         
         <ul class="list-group curvs curvs-groups">
            <a href="javascript:void(0)" class="list-group-item" data="line"><img alt="" src="images/make_line.png"><span class="badge">直线</span></a>
			<a href="javascript:void(0)" class="list-group-item" data="curv"><img alt="" src="images/make_curv.png"><span class="badge">曲线</span></a>
			<a href="javascript:void(0)" class="list-group-item" data="elli"><img alt="" src="images/make_elli.png"><span class="badge">椭圆</span></a>
			<a href="javascript:void(0)" class="list-group-item" data="roun"><img alt="" src="images/make_roun.png"><span class="badge">圆形</span></a>
			<a href="javascript:void(0)" class="list-group-item" data="rect"><img alt="" src="images/make_rect.png"><span class="badge">矩形</span></a>
			<a href="javascript:void(0)" class="list-group-item poly" data="poly"><img alt="" src="images/make_polp.png">
					<div class="input-group">
				         <span class="input-group-addon">边数</span>
				         <input type="number" min="3" max="15" value="3" class="form-control">
				    </div><span class="badge">正多边形</span>
		    </a>
	     </ul>
	     
	     
	     <ul class="list-group roups roups-groups">
	        <a href="javascript:void(0)" class="list-group-item" data="loca"><img alt="" src="images/make_loca.png"><span class="badge">标注</span></a>
			<a href="javascript:void(0)" class="list-group-item" data="angp"><img alt="" src="images/make_angp.png"><span class="badge">折线</span></a>
			<a href="javascript:void(0)" class="list-group-item" data="arcp1"><img alt="" src="images/make_arcp.png"><span class="badge">贝塞尔曲线</span></a>
			<a href="javascript:void(0)" class="list-group-item" data="arcp"><img alt="" src="images/make_arcp.png"><span class="badge">圆弧</span></a>
			<a href="javascript:void(0)" class="list-group-item" data="roup"><img alt="" src="images/make_roup.png"><span class="badge">圆形</span></a>
			<a href="javascript:void(0)" class="list-group-item" data="curp"><img alt="" src="images/make_curp.png"><span class="badge">封闭折线</span></a>
	     </ul>
	    
	    
	     <ul class="list-group texts texts-groups">
			<a href="javascript:void(0)" class="list-group-item lineW" data="lineW"><img alt="" src="">
					<div class="input-group">
				         <span class="input-group-addon">px</span>
				         <input type="number" min="1" max="100" value="4" class="form-control">
				    </div><span class="badge">线宽</span>
		    </a>
		    <a href="javascript:void(0)" class="list-group-item color"  data=""><img alt="" src="">
		    
					<div id="colorpicker" class="input-group colorpicker-component">
					<span class="input-group-addon"><i></i></span>
					     <input id="color" type="text" class="form-control" value="#0000ff"/>
					</div><span class="badge">颜色</span>
		    </a>
	     </ul>
	     
	     
	     <ul class="list-group tolists tolists-groups">
			<a href="javascript:void(0)" class="list-group-item"><img alt="" src="images/make_rect.png"><span class="badge">选择</span></a>
			<a href="javascript:void(0)" class="list-group-item"><img alt="" src="images/make_rect.png"><span class="badge">选择</span></a>
			<a href="javascript:void(0)" class="list-group-item"><img alt="" src="images/make_rect.png"><span class="badge">选择</span></a>
	     </ul>
	     
	     
	     <ul class="list-group configs configs-groups">
			<a href="javascript:void(0)" class="list-group-item"><img alt="" src="images/make_rect.png"><span class="badge">选择</span></a>
			<a href="javascript:void(0)" class="list-group-item"><img alt="" src="images/make_rect.png"><span class="badge">选择</span></a>
			<a href="javascript:void(0)" class="list-group-item"><img alt="" src="images/make_rect.png"><span class="badge">选择</span></a>
	     </ul>
    </div>
    <a class="ui-btn ui-btn-up-a ui-btn-inline ui-btn-corner-all ui-shadow toolbutton-jqm">
            <span class="ui-btn-inner ui-btn-corner-all">批注</span>
    </a>
</div>
<div class="modal about-modal w3-agileits fade" id="commModal" aria-hidden="true" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				  
				<ul id="myTab" class="nav nav-tabs">
					<li class="active"><a href="#edit" data-toggle="tab">图形信息</a></li>
					<li><a href="#prop" data-toggle="tab">测量信息</a></li>
					<li><a id="textTitleID" href="#textID" data-toggle="tab">文本说明</a></li>
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


				  
			</div>
		</div>
</div>



<%-- <script src="${ctx}/resources/reference/jquery/jcrop/jquery.Jcrop.min.js"></script>
<script src="${ctx}/resources/reference/jquery/html2canvas/html2canvas.min.js"></script> --%>
<script src="${ctx}/resources/reference/jquery/ContextJS/js/context.js"></script>
<script src="${ctx}/views/docs/catalog/js/control.js"></script>
<script src="${ctx}/views/docs/catalog/js/draw.js"></script>
<script src="${ctx}/views/docs/catalog/js/slice.js"></script>
<script src="${ctx}/views/docs/catalog/js/edit.js"></script>
<script src="${ctx}/views/docs/catalog/js/prop.js"></script>
</body>
</html>