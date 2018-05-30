<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@include file="../../init/base.jsp" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<title>目录</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<link href="${ctx}/views/docs/catalog/css/subject.css" type="text/css" rel="stylesheet" media="all" />
</head> 
<body>
<jsp:include page="${ctx}/views/comm/comm.jsp"></jsp:include>
<hr style="height:2px;border:none;border-top:1px dotted #000000;" >    
    <!-- ztreediv -->
    <div class="ztreediv">
	<div class="panel panel-default">
	   <div class="panel-heading">
	      <h1 class="panel-title">
	                               目录
	      </h1>
	   </div>
	   <div class="panel-body">
	      <ul id="cataLogzTree" class="ztree"></ul>
	   </div>
	</div>
	</div>
	<!-- //ztreeDiv -->

<script src="${ctx}/views/docs/catalog/js/subject.js"></script>
</body>
</html>