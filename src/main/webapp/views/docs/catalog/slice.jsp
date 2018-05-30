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
<script src="${ctx}/resources/reference/jquery/openseadragon/openseadragon.min.js"></script>
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
         <a href="javascript:void(0)" class="toolPNG selectes"><img alt="" src="images/make_arro.png"></a>
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
			<a href="javascript:void(0)" class="list-group-item"><img alt="" src="images/make_rect.png"><span class="badge">选择</span></a>
			<a href="javascript:void(0)" class="list-group-item"><img alt="" src="images/make_rect.png"><span class="badge">选择</span></a>
			<a href="javascript:void(0)" class="list-group-item"><img alt="" src="images/make_rect.png"><span class="badge">选择</span></a>
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
<script src="${ctx}/resources/reference/jquery/openseadragon/openseadragon-fabricjs-overlay.js"></script>
<script src="${ctx}/resources/reference/jquery/openseadragon/fabric.adapted.js"></script>
<script src="${ctx}/views/docs/catalog/js/control.js"></script>
<script src="${ctx}/views/docs/catalog/js/draw.js"></script>
<script src="${ctx}/views/docs/catalog/js/slice.js"></script>
</body>
</html>