<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@include file="../../init/base.jsp" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<title>在线实例</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<style type="text/css">
.panel-title{
    text-align: center;
}
.panel-body{
    height: 90%;
    padding: 0;
}

</style>
</head> 
<body>
<div class="panel panel-default">
	   <div class="panel-heading">
	      <h3 class="panel-title"></h3>
	   </div>
	   <div class="panel-body">
	      <div id="openSeadragon" class="opensead"></div>
	   </div>
</div>
<script src="${ctx}/views/docs/exam/js/example.js"></script>
</body>
</html>