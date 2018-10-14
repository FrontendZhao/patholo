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
<link rel="stylesheet" href="assets/css/bootstrap-dropdownhover.min.css" type="text/css" rel="stylesheet" media="all">
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
								<li><a id="loginName" href="${ctx}/views/users/login.jsp?pageid=index">登录</a><a id="userName"></a></li>
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
		<div id="myCarousel" class="carousel slide" style="position: relative;">
   <!-- 轮播（Carousel）指标 -->
   <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" 
         class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
      <li data-target="#myCarousel" data-slide-to="3"></li>
      <li data-target="#myCarousel" data-slide-to="4"></li>
      <li data-target="#myCarousel" data-slide-to="5"></li>
   </ol>   
   <!-- 轮播（Carousel）项目 -->
   <div class="carousel-inner">
      <div class="item active">
         <img src="img/1.jpg"  alt="First slide">
      </div>
      <div class="item">
         <img src="img/2.jpg"  alt="Second slide">
      </div>
      <div class="item">
         <img src="img/3.jpg"  alt="Third slide">
      </div>
      <div class="item">
         <img src="img/4.jpg"  alt="four slide">
      </div>
      <div class="item">
         <img src="img/5.jpg"  alt="five slide">
      </div>
      <div class="item">
         <img src="img/6.jpg"  alt="six slide">
      </div>
   </div>
   <div style="text-align:center; position: absolute;bottom: 0px;right: 13%">
          <div class="header-text">
				<div class="col-xs-12 col-sm-5 col-md-5">
				</div>
				<div class="header-bg col-xs-12 col-sm-7 col-md-7" style="opacity:0;">
					<h1>河北医科大学病理学虚拟仿真实验室</h1>
					<p>该虚拟仿真实验教学系统在更加真实的呈现大体标本和镜下切片同时，建立完整的考核切片库，切片库中的病例具备完整临床信息、大体特点和全景数字化切片，模拟临床病理诊断，使学生通过对系统中病例的学习及自我考核，掌握一定的病理诊断技能。这种实验教学系统克服了传统临床实践教学资源有限的不足，使学生更真实地进行病理诊断，收到良好的学习效果。线上虚拟教学系统有良好的开放性，可方便地扩充和更新教学资源，方便加入新的病例和病理学资料。本实验也计划在建立和完善虚拟仿真教学病例和考核病例库的基础上，可以逐步加入临床病理工作中的其他相关内容，如标本的取材、免疫组织化学检测和分子病理检测的选择和判读。今后在充分完善炎症性疾病病理虚拟仿真教学系统的基础上，可以延伸建立更多其他病种的虚拟仿真教学系统，如肿瘤、血液循环障碍等供学生使用。通过虚拟教学系统的学习，使学生掌握疾病的病理学特点及病理学诊断，为将来的临床工作打下坚实的基础。 </p>
					
				</div>
				<div style="width:680px;position: relative ;bottom: 10%;left:60%">
				<div class="col-xs-3 col-sm-5 col-md-5">
				<a href="javascript:void(0)" id="rrr"  class="header-btn">虚拟仿真实验室介绍</a>
				</div>
				<div class="col-xs-3 col-sm-5 col-md-5">
				<a href="${ctx}/views/docs/catalog/subject/subject1.jsp?subNo=2#p=7" target="_blank" class="header-btn">进入―>炎症的形态学类型</a>
				</div>
				</div>
	     </div>
	     </div>
   </div>
</div>
		<!-- mainNav -->
		<div id="mainNav" class="navbar-fixed-top">
			<div class="container">
				<div class="row">
					<nav class="navbar navbar-inverse navbar-default">

						<!-- Brand and toggle get grouped for better mobile display -->
						<div class="navbar-header">
							<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
							<a class="navbar-brand" href="${ctx}/views/docs/index.jsp"><img src="assets/img/logo.png" alt="logo"></a>
						</div>
						<!-- Collect the nav links, forms, and other content for toggling -->
						<div class="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1" data-hover="dropdown" data-animations="fadeIn fadeInLeft fadeInUp fadeInRight">
							<ul class="nav navbar-nav">
								<li><a href="${ctx}/views/docs/index.jsp">主页</a></li>
								<li><a href="${ctx}/views/docs/catalog/book/book.jsp">虚拟仿真实验教学系统</a></li>
								<li><a href="${ctx}/views/check/dist.jsp" target="_blank"><span></span>虚拟仿真实验在线考试系统</a></li>
							</ul>
							<!-- /.navbar-collapse -->
						</div>

					</nav>
				</div>
			</div>


		</div>
		<!-- /mainNav -->
	</div>
	<!-- /top-menu -->

	

</header>
<section class="for-box">
	<!-- .for-box -->
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-6 col-md-3 wow fadeInLeft  animated">
				<div class="clr1">
					<div class="for-box-crecl">
						<i class="fa fa-users" aria-hidden="true"></i>
					</div>
					<h2>
						互动教学<br/> Students
					</h2>
				</div>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-3 wow fadeInLeft  animated">
				<div class="clr1">
					<div class="for-box-crecl">
						<i class="fa fa-bookmark" aria-hidden="true"></i>
					</div>
					<h2>
						课程安排<br/>courses
					</h2>
				</div>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-3 wow fadeInRight  animated">
				<div class="clr1">
					<div class="for-box-crecl">
						<i class="fa fa-phone" aria-hidden="true"></i>
					</div>
					<h2>
						呼叫指导<br/> anytime
					</h2>
				</div>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-3 wow fadeInRight  animated">
				<div class="clr1">
					<div class="for-box-crecl">
						<i class="fa fa-line-chart" aria-hidden="true"></i>
					</div>
					<h2>
						信息统计<br/>on you sutdy
					</h2>
				</div>
			</div>
		</div>
	</div>
	<!-- /.for-box -->
</section>

<section class="viewed-courses">
	<!-- .viewed-courses -->
	<div class="container">
		<div class="row">
			<div class="tittle">
				<h2>显微形态学虚拟仿真实验中心</h2>
			</div>
			<div class="row subject"></div>
		</div>
	</div>
	<!-- /.viewed-courses -->
</section>

<section class="px-bg">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h2>学生通过使用该虚拟仿真实验系统，可提高学习兴趣，增加学习的主动性，加强了基础理论知识的掌握和病理阅片能力。<br/> 该实验项目对于实践类知识的掌握获益更加明显，传统教材仅提供文字表述和少量病理图片，而该系统提供的病理诊断模拟界面，让学生有一种身临其境的学习体验，利于知识的掌握。尤其是考核病例库，模拟临床病理诊断，使学生掌握了临床病理诊断的基本流程，掌握病理阅片能力。该系统给学生创造了良好的学习环境，也解决了部分病理切片匮乏的困境。</h2>
				<a href="#" class="button">虚拟仿真实验教学创新中心</a>
			</div>
		</div>
	</div>
</section>

<section class="instructor-container">
	<!-- .instructor-container -->
	<div class="container">
		<div class="tittle">
			<h2>
				虚拟实验教学案例展示
				<span class="customNavigation">
					<a class="btn prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
					<a class="btn next"><i class="fa fa-angle-right" aria-hidden="true"></i></a>
				</span>
			</h2>
		</div>
		<div class="row">
			<div class="owl-demo-outer">
				<!-- #owl-demo -->
				<div id="owl-demo" class="owl-carousel owl-theme">
					<div class="item">
						<div class="col-xs-12 col-sm-4 col-md-4">
							<!-- .instructor -->
							<div class="instructor">
							<a href="${ctx}/views/docs/catalog/slice.jsp?sliceNo=1053" target="_blank">
								<div class="instructor-img">
									<img src="assets/img/instructor-img1.jpg" alt="instructor-img1" />
								</div>
								<h4>
									
										显微虚拟案例展示一<br/>
									<span>案例信息：</span>
								  
								</h4>
								</a>
								<p>
									反复头痛一年余，MRI 显示左侧脑膜瘤。术中见左侧蝶骨嵴脑肿瘤，质地中等，血供丰富，侵入颅骨，破坏脑膜。临床诊断：左蝶骨嵴脑膜瘤。巨检：灰红带部分脑膜结节状肿物，3.5cm×3.5cm×0.8cm。
								</p>
							</div>
							<!-- /.instructor -->
						</div>
						<div class="col-xs-12 col-sm-4 col-md-4">
							<!-- .instructor -->
							<div class="instructor">
							<a href="${ctx}/views/docs/catalog/slice.jsp?sliceNo=1110" target="_blank">
								<div class="instructor-img">
									<img src="assets/img/instructor-img2.jpg" alt="instructor-img1" />
								</div>
								<h4>
									<a href="#">
										显微虚拟案例展示二<br/>
									<span>案例信息：</span>
								</h4>
								</a>
								<p>
									发现右大腿后方肿块半年余。无疼痛，下肢麻木，半年来肿块未消退，遂来我院就诊。MRI示：右大腿下段后侧软组织占位，考虑良性可能性大。
								</p>
							</div>
							<!-- /.instructor -->
						</div>
						<div class="col-xs-12 col-sm-4 col-md-4">
							<!-- .instructor -->
							<div class="instructor">
							<a href="${ctx}/views/docs/catalog/slice.jsp?sliceNo=1134" target="_blank">
								<div class="instructor-img">
									<img src="assets/img/instructor-img3.jpg" alt="instructor-img1" />
								</div>
								<h4>
									<a href="#">
										显微虚拟案例展示三<br/>
									<span>案例信息：</span>
								</h4>
								</a>
								<p>
									颈部、腋下、腹股沟肿块，最大者直径4-5cm，并逐渐肿大。骨髓穿刺：符合急性髓系白血病，M2a型。巨检：右颈部活检淋巴结一枚，体积1.9cm×1.4cm×1.1cm，切面实性灰白色，略呈分叶状。镜检：HE切片1枚。
								</p>
							</div>
							<!-- /.instructor -->
						</div>
						<div class="col-xs-12 col-sm-4 col-md-4">
							<!-- .instructor -->
							<div class="instructor">
							<a href="${ctx}/views/demo/spin.jsp?sliceNo=1116" target="_blank">
								<div class="instructor-img">
									<img src="assets/img/instructor-img4.jpg" alt="instructor-img1" />
								</div>
								<h4>
									<a href="#">
									3D旋转大体病例案例展示一<br/>
									<span>案例信息：</span>
								</h4>
								</a>
								<p>
									白喉（Diphtheria）标本来自幼儿尸体检材料（包括舌、咽、气管、支气管和肺脏组织），于气管和支气管粘膜可见灰白色或黑褐色（出血）之膜状物卷曲欲脱落。
								</p>
							</div>
							<!-- /.instructor -->
						</div>
						<div class="col-xs-12 col-sm-4 col-md-4">
							<!-- .instructor -->
							<div class="instructor">
							<a href="${ctx}/views/demo/spin.jsp?sliceNo=1126" target="_blank">
								<div class="instructor-img">
									<img src="assets/img/instructor-img5.jpg" alt="instructor-img1" />
								</div>
								<h4>
									<a href="#">
										3D旋转大体病例案例展示二<br/>
									<span>案例信息：</span>
								</h4>
								</a>
								<p>
									肺脓肿（Abscess）：肺切面可见多个散在的大小不等的灰白色区域，即为脓肿。脓肿与周围组织界限清楚，腔内部分脓性渗出物已流失而呈脓腔
								</p>
							</div>
							<!-- /.instructor -->
						</div>
						<div class="col-xs-12 col-sm-4 col-md-4">
							<!-- .instructor -->
							<div class="instructor">
							<a href="${ctx}/views/demo/spin.jsp?sliceNo=1124" target="_blank">
								<div class="instructor-img">
									<img src="assets/img/instructor-img6.jpg" alt="instructor-img1" />
								</div>
								<h4>
									<a href="#">
									3D旋转大体病例案例展示三<br/>
									<span>案例信息：</span>
								</h4>
								</a>
								<p>
									肝脓肿（Abscess of liver）肝切面可见多个散在的大小不等的黄白色区域，即为脓肿。脓肿与周围肝组织界限清楚，腔内脓性渗出物已流失而呈脓腔

								</p>
							</div>
							<!-- /.instructor -->
						</div>
					</div>
					<div class="item">
					<div class="col-xs-12 col-sm-4 col-md-4">
							<!-- .instructor -->
							<div class="instructor">
							<a href="${ctx}/views/demo/spin.jsp?sliceNo=1127" target="_blank">
								<div class="instructor-img">
									<img src="assets/img/instructor-img5.jpg" alt="instructor-img1" />
								</div>
								<h4>
									<a href="#">
										3D旋转大体病例案例展示四<br/>
									<span>案例信息：</span>
								</h4>
								</a>
								<p>
									肺脓肿（Abscess）：肺切面可见多个散在的大小不等的灰白色区域，即为脓肿。脓肿与周围组织界限清楚，腔内部分脓性渗出物已流失而呈脓腔
								</p>
							</div>
							<!-- /.instructor -->
						</div>
						<div class="col-xs-12 col-sm-4 col-md-4">
							<!-- .instructor -->
							<div class="instructor">
							<a href="${ctx}/views/demo/spin.jsp?sliceNo=1125" target="_blank">
								<div class="instructor-img">
									<img src="assets/img/instructor-img6.jpg" alt="instructor-img1" />
								</div>
								<h4>
									<a href="#">
									3D旋转大体病例案例展示五<br/>
									<span>案例信息：</span>
								</h4>
								</a>
								<p>
									肝脓肿（Abscess of liver）肝切面可见多个散在的大小不等的黄白色区域，即为脓肿。脓肿与周围肝组织界限清楚，腔内脓性渗出物已流失而呈脓腔

								</p>
							</div>
							<!-- /.instructor -->
						</div>
					</div>

					<!-- /#owl-demo -->
				</div>
			</div>
		</div>
	</div>
	<!-- /.instructor-container -->
</section>

<section class="price-container">
	<!-- .price-container -->
	<div class="container">
		<div class="tittle">
			<h2>在线考试信息发布</h2>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-4 col-md-4">
				<!-- .price-box -->
				<div class="price-box">
					<div class="price-tittle">
						考试安排一
					</div>
					<div class="price-text">
						<div class="price-no">
							<sub>考试科目：病理学</sub>
						</div>
						<p>考试时间：<br> 2018年12月15日上午8:30-10:00</p>
						<p>考    场：<br> 显微形态学虚拟仿真实验中心-第二教室</p>
						<p>考试形式： 机考-闭卷</p>
						<a href="${ctx}/views/check/dist.jsp"  target="_blank">进入考试系统</a>
					</div>
				</div>
				<!-- .price-box -->
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<!-- .price-box -->
				<div class="price-box active">
					<div class="price-tittle">
						考试安排二
					</div>
					<div class="price-text">
						<div class="price-no">
							<sub>考试科目：组织学</sub>
						</div>
						<p>考试时间：<br> 2018年12月18日上午8:30-10:00</p>
						<p>考    场：<br> 显微形态学虚拟仿真实验中心-第一教室</p>
						<p>考试形式： 机考-闭卷</p>
						<a href="${ctx}/views/check/dist.jsp"  target="_blank">进入考试系统</a>
					</div>
				</div>
				<!-- .price-box -->
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<!-- .price-box -->
				<div class="price-box">
					<div class="price-tittle">
						考试安排三
					</div>
					<div class="price-text">
						<div class="price-no">
							<sub>考试科目：寄生虫学</sub>
						</div>
						<p>考试时间：<br> 2018年12月19日上午8:30-10:00</p>
						<p>考    场：<br> 显微形态学虚拟仿真实验中心-第二教室</p>
						<p>考试形式： 机考-闭卷</p>
						<a href="${ctx}/views/check/dist.jsp"  target="_blank">进入考试系统</a>
					</div>
				</div>
				<!-- .price-box -->
			</div>
		</div>
	</div>
	<!-- /.price-container -->
</section>

<section class="px-bg2">
	<!-- .Subscribe -->
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="subscribe">
					<h2>将病例资料、图片及视频上传至服务器，并呈现在特定的交互系统中，供学生在自己的笔记本上自主地浏览学习。在完成所有的学习内容后，学生可在虚拟切片库中进行阅片、分析、诊断及自测，巩固学习的效果。</h2>
					<a href="#" class="button">虚拟仿真知识互动</a>
				</div>
			</div>
		</div>
	</div>
	<!-- /.Subscribe -->
</section>


<!-- START FOOTER SECTION -->
<footer>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="flog"><a href="${ctx}/views/docs/index.jsp"><img src="assets/img/logo.png" alt="f-logo" /></a></div>
			</div>
			<div class="col-12-12 col-sm-6 col-md-6">
				<span class="地址">地址：河北省石家庄市<br>
				 街道： 中山东路361号<br>邮编：050000
				 </span>
			</div>
			<div class="col-12-12 col-sm-6 col-md-6">
				<span class="phone">电话 : +86 0311 86265724 <br>
					Fax : +86 0311 86265725<br>
					E-mail:zhaosongheb@sohu.com</span>
			</div>

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
<script src="assets/js/bootstrap-dropdownhover.min.js"></script>
<!-- Plugin JavaScript -->
 <!-- 移动到顶部 -->
 <script src="${ctx}/resources/reference/jquery/bootstrap/js/move-top.js"></script>
<script src="assets/js/jquery.easing.min.js"></script>
<script src="assets/js/jquery.fittext.js"></script>
<script src="assets/js/wow.min.js"></script>
<script src="assets/js/modernizr.js"></script>
<!-- Modernizr -->
<script src="assets/js/main.js"></script>
<!-- Resource jQuery -->
<!--  countTo JavaScript  -->
<script type="text/javascript" src="assets/js/jquery.countTo.js"></script>
<!-- owl carousel -->
<script src="assets/owl-carousel/owl.carousel.js"></script>
<!--  Custom Theme JavaScript  -->
<script src="assets/js/custom.js"></script>
<script src="js/index.js"  ></script>
</body>
</html>