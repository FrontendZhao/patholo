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
<script src="${ctx}/resources/reference/jquery/jquery.min.js"></script>
<title>河北医科大学</title>
			
</head>
	
<body>
<c:set var="ctx"  value="${pageContext.request.contextPath}" />
<input type="hidden" id="input_hidden_ctx" name="ctx" value="${ctx}" />
<!-- bootstrap -->
<script type="text/javascript">
	var WEB_ROOT = $('#input_hidden_ctx').val();
	$(function(){
		$.ajax({
			url:WEB_ROOT+'/olo/subject!doFindSpin.do',
			data:{'id':getQueryString('sliceNo')},
			success:function(msg){
				console.info(msg);
				if(msg){
					$('#iframeID').attr('src','/filePath/subject/'+msg.idcode+'/ShowH5.html');
				}else{
					$('#iframeID').attr('src',WEB_ROOT+'/views/comm/error.jsp');
				}
				
			}
		})
	})
function getQueryString(name) {  
       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
       var r = window.location.search.substr(1).match(reg); 
       if (r != null) return unescape(r[2]);  
       return null;  
}
</script>
		<iframe id="iframeID"  frameborder="0"  src="" style="border:0; width:100%;height:800px;" ></iframe>
</body>
</html>