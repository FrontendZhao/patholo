<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
 <c:set var="ctx"  value="${pageContext.request.contextPath}" />
<input type="hidden" id="input_hidden_ctx" name="ctx" value="${ctx}" />

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- Bootstrap Core CSS -->
<link href="${ctx}/resources/reference/jquery/bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet" media="all">
<!-- Dropdownhover CSS -->
<!-- fonts awesome -->
<link href="${ctx}/resources/reference/jquery/bootstrap/css/font-awesome.css" type="text/css" rel="stylesheet" media="all" />
<!-- Plugin CSS -->
<link rel="stylesheet" href="assets/css/animate.min.css" type="text/css" rel="stylesheet" media="all" >
<!-- Custom CSS -->
<link rel="stylesheet" href="assets/css/style.css" type="text/css" rel="stylesheet" media="all" >
<!-- Owl Carousel Assets -->
<link href="assets/owl-carousel/owl.carousel.css" rel="stylesheet">
<link href="assets/owl-carousel/owl.theme.css" rel="stylesheet">
<title>河北医科大学</title>
</head>
<body>
<!-- Preloader -->
<div id="preloader">
	<div id="loading">
	</div>
</div>
<header>
	<!-- top-menu -->
	<div class="top-menu">
		<!-- top-header -->
		<div class="top-header">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-sm-6 col-md-6">
						<div class="phone dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"><i class="fa fa-globe" aria-hidden="true"></i> 语言 : 中文 </a>
							 <ul class="dropdown-menu">
								 <li><a href="#">English</a></li>
								<li><a href="#">中文</a></li>
							</ul>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6">
						<div class="social">
							<ul>
							    <li><a  href="${ctx}/views/docs/index.jsp">主页</a></li>
								<li>|</li>
								<li><a id="loginName" href="${ctx}/views/users/login.jsp?pageid=book">登录</a><a id="userName"></a></li>
								<li>|</li>
								<li><a href="#" data-toggle="modal" data-target="#myModal">关于</a></li>
								<li>|</li>
								<li><a href="${ctx}/views/FAQ/help.jsp">帮助</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>

		</div>
		<!-- /top-header -->
	</div>
	<!-- /top-menu -->

	

</header>


<section class="viewed-courses">
	<!-- .viewed-courses -->
	<div class="container">
		<div class="row">
			<div class="tittle" style="text-align:center;">
				<h2>科目</h2>
			</div>
			<div class="row subject">
			
			</div>
		</div>
	</div>
	<!-- /.viewed-courses -->
</section>


<!-- START FOOTER SECTION -->
<footer>
	<div class="container">
		<div class="row">
			

				<div class="copyright">
					<span class="copyright"> 版权所有 &copy; 2017.河北医科大学-病理教研室<br>
					.技术支持：<a target="_blank" href="http://59.110.215.223:8080/">宏图技术小组</a></span>
					
				</div>
			</div>
		</div>
	</div>
</footer>
<div class="modal about-modal w3-agileits fade" id="myModal" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				  <div class="modal-header">
		             <button type="button" class="close" data-dismiss="modal" 
		                aria-hidden="true">×
		             </button>
		             <h4 class="modal-title" id="myModalLabel">
                                                                          关于
                     </h4>
		             
		          </div>
		          <div class="modal-body">
		                            <h5>切片 qiēpiàn</h5> 
						               <p>
						                    1. [slice]∶从物品上切出的扁薄部分
				                            2.[section]∶适于显微镜检验的极薄片
						               </p>
						               <p>
				切片（qiepian）玻片标本的一种。供光学显微镜或电子显微镜观察的动植物组织薄片。因要求不同，可用刀片进行徒手切片，也可将组织块包埋于石蜡或火棉胶中或以低温冰冻，用切片机切片。切成5～10微米薄片，供光学显微镜观察。用环氧树脂或甲基丙烯酸包埋组织块切制的超薄切片，其厚度在20～50纳米，专供在电子显微镜下观察。一般教学用的如根尖、茎的切片通称石蜡切片。
				切片：是在切片机上进行.切片的厚度因需要而定,一般在5-7微米(μm)左右.
				制作切片时应迅速前后多次切割，且每次切割后必须用刀片浸一下水，从中挑选最薄的一片，以便观察。</p>
		          
		               
               
		          </div>
			</div>
		</div>
</div>
<!-- jQuery -->
<script src="${ctx}/resources/reference/jquery/jquery.min.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="${ctx}/resources/reference/jquery/bootstrap/js/bootstrap.min.js"></script>
 <!-- 移动到顶部 -->
 <script src="${ctx}/resources/reference/jquery/bootstrap/js/move-top.js"></script>
<script src="assets/js/jquery.easing.min.js"></script>
<!-- Resource jQuery -->
<!--  countTo JavaScript  -->
<script type="text/javascript" src="assets/js/jquery.countTo.js"></script>
<!-- owl carousel -->
<script src="assets/owl-carousel/owl.carousel.js"></script>
<!--  Custom Theme JavaScript  -->
<script src="assets/js/custom.js"></script>
<script src="js/book.js"  ></script>
</body>
</html>