<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!-- 服务端参数 -->
<c:set var="ctx"  value="${pageContext.request.contextPath}" />
<input type="hidden" id="input_hidden_ctx" name="ctx" value="${ctx}" />

<!-- css资源 -->
<link href="${ctx}/resources/reference/jquery/bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet" media="all">
<!-- 矢量图标 -->
<link href="${ctx}/resources/reference/jquery/bootstrap/css/font-awesome.css" type="text/css" rel="stylesheet" media="all" />

<link href="${ctx}/resources/reference/jquery/bootstrap/css/flexible-bootstrap-carousel.css" type="text/css" rel="stylesheet" media="all">

<link href="${ctx}/resources/reference/jquery/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css" rel="stylesheet" media="all" />
<!-- JavaScript扩展 -->
<script src="${ctx}/resources/reference/javascript/javascript.extension.js"></script>

<!-- jQuery -->
<script src="${ctx}/resources/reference/jquery/jquery.min.js"></script>
<script src="${ctx}/resources/reference/jquery/jquery.extension.js"></script>
<!-- 弹出框 -->

 <!-- 移动到顶部 -->
 <script src="${ctx}/resources/reference/jquery/bootstrap/js/move-top.js"></script>
 <!-- 缓动效果 -->
 <script src="${ctx}/resources/reference/jquery/bootstrap/js/easing.js"></script>


<%-- <script src="${ctx}/resources/reference/javascript/manage_bl.js"></script> --%>

<script src="${ctx}/resources/reference/jquery/openseadragon/openseadragon.min.js"></script>
<!-- bootstrap -->
<script src="${ctx}/resources/reference/jquery/bootstrap/js/bootstrap.min.js"></script>
<!-- 图片轮播 -->
<script src="${ctx}/resources/reference/jquery/bootstrap/js/flexible-bootstrap-carousel.js"></script>

<script src="${ctx}/resources/reference/jquery/zTree/js/jquery.ztree.all.min.js"></script>

<!-- Static资源 -->
<link rel="stylesheet" type="text/css" href="${ctx}/resources/reference/css/base.css">
<link rel="stylesheet" type="text/css" href="${ctx}/resources/reference/css/table_form.css">



<!-- JSON解析 -->
<script src="${ctx}/resources/reference/jquery/plugins/jquery.json.js"></script>

<!-- 全局变量定义 -->
<script type="text/javascript">
	var WEB_ROOT = $('#input_hidden_ctx').val();
	//解析xml
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
	}
</script>