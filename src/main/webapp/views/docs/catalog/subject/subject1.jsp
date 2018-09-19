<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="monitor-signature" content="monitor:player:html5">
 <meta name="apple-mobile-web-app-status-bar-style" content="black" />
 
<meta name="Keywords" content="" />
<title>目录</title>
<link rel="stylesheet" href="style/book.css" />
<link rel="stylesheet" href="style/style.css" />
<link rel="stylesheet" href="style/phoneTemplate.css" />
<script src="${ctx}/resources/reference/jquery/jquery.min.js"></script>

<script src="javascript/config.js"></script>

</head>	
<body>
<c:set var="ctx"  value="${pageContext.request.contextPath}" />
<input type="hidden" id="input_hidden_ctx" name="ctx" value="${ctx}" />
<!-- bootstrap -->
<script type="text/javascript">
	var WEB_ROOT = $('#input_hidden_ctx').val();
</script>
 
<script src="javascript/LoadingJS.js"></script>

<script src="javascript/main.js"></script>

<script src="${ctx}/views/docs/catalog/subject/javascript/subject1.js"></script>
</body>
</html>