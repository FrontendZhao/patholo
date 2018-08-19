<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!-- 服务端参数 -->
<c:set var="ctx"  value="${pageContext.request.contextPath}" />
<input type="hidden" id="input_hidden_ctx" name="ctx" value="${ctx}" />
<link href="${ctx}/resources/reference/jquery/bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet" media="all"> 
<script src="${ctx}/resources/reference/jquery/jquery.min.js"></script>
<script src="${ctx}/resources/reference/jquery/bootstrap/js/bootstrap.min.js"></script>
<script src="${ctx}/resources/reference/jquery/jquery-ui.min.js"></script>

<!-- 全局变量定义 -->
<script type="text/javascript">
	var WEB_ROOT = $('#input_hidden_ctx').val();
	/* //解析xml
	function getXmlDom(xmlPath){
		var p=new Object();
	     $.ajax({
	          url:xmlPath,
	          async:false,
	          type:'get',
	          dataType:'text',
	          timeout:2000,
	          cache:false,
	          error:function(){
	              console.info('解析失败');
	          },
	          success:function(xmlDom){
	        	  xmlDom= xmlDom.replace('unicode','UTF-8');
	        	  var xmlDom=$.parseXML(xmlDom);
	              p.w=256*parseInt($(xmlDom).find('Cols').attr('value'));
	              p.h=256*parseInt($(xmlDom).find('Rows').attr('value'));
	              p.maxlevelVal=Math.ceil(Math.log(Math.max(p.w,p.h))/Math.LN2);
	              var level=new Array();
	              $(xmlDom).find('Scale').each(function(i){
	                 level.unshift($(this).attr('value'));
	              });
	              p.Levellength=level.length;
	              p.v=p.maxlevelVal-(p.Levellength-1);
	              p.levelArray=level; 
	          }
	     })
	     return p;
	} */
</script>