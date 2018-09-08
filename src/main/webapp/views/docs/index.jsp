<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@include file="../init/base.jsp" %>
	<jsp:include page="${ctx}/views/comm/comm.jsp"></jsp:include>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<title>数字切片考核系统</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<link href="${ctx}/views/docs/css/style.css" type="text/css" rel="stylesheet" media="all">  
</head> 
<body>
    <!-- navigation -->
	<div class="top-nav">
		<nav class="navbar navbar-default">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">切换</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-center cl-effect-15">
						<li><a href="${ctx}/views/docs/index.jsp" >首页</a></li>
						<li><a href="#gallery" class="scroll" >科目</a></li>
						<li><a href="#about" class="scroll" >用户管理</a></li>					
						<li><a href="#gallery" class="scroll" >考核</a></li>
						<li><a href="#about" class="scroll" >关于</a></li>			
					</ul>	
					<div class="clearfix"> </div>
				</div>
			</div>	
		</nav>		
	</div>
    <!-- banner -->
	<div id="openSeadragon1" class="opensead"></div>	
	<!-- //banner -->
	
	<!-- services -->
	<div id="services" class="services jarallax">
		<div class="container"> 
			<h3 class="agileits-title">在线实例</h3> 
			<div class="services-agileinfo">
				<div class="col-sm-3 col-xs-6 wthree-services-grid">
					<div class="wthree-services-icon">
						<a href="${ctx}/views/docs/exam/example.jsp?exampleNo=0" target="_blank" ><img src="images/0000_0000.jpg" 
         alt="图片找不到啦" class="img-thumbnail" ></a>
					</div>
					<div class="wthree-services-info">
						<h5>实例1</h5>
						<p>Donec sed nisi leo. Ut at sagittis nisi. Cras porttitor a purus ac rutrum. </p>
					</div>
				</div>
				<div class="col-sm-3 col-xs-6 wthree-services-grid">
												<div class="wthree-services-icon">
						<a href="${ctx}/views/docs/exam/example.jsp?exampleNo=1" target="_blank"><img src="images/0000_0000.png" 
         alt="图片找不到啦" class="img-thumbnail"  ></a>
					</div>
					<div class="wthree-services-info">
						<h5>实例2</h5>
						<p>Donec sed nisi leo. Ut at sagittis nisi. Cras porttitor a purus ac rutrum. </p>
					</div>
				</div>
				<div class="col-sm-3 col-xs-6 wthree-services-grid">
					<div class="wthree-services-icon">
						<a href="${ctx}/views/docs/exam/example.jsp?exampleNo=0" target="_blank" ><img src="images/0000_0000.jpg" 
         alt="图片找不到啦" class="img-thumbnail" ></a>
					</div>
					<div class="wthree-services-info">
						<h5>实例3</h5>
						<p>Donec sed nisi leo. Ut at sagittis nisi. Cras porttitor a purus ac rutrum. </p>
					</div>
				</div>
				<div class="col-sm-3 col-xs-6 wthree-services-grid">
					<div class="wthree-services-icon">
						<a href="${ctx}/views/docs/exam/example.jsp?exampleNo=1" target="_blank"><img src="images/0000_0000.png" 
         alt="图片找不到啦" class="img-thumbnail"  ></a>
					</div>
					<div class="wthree-services-info">
						<h5>实例4</h5>
						<p>Donec sed nisi leo. Ut at sagittis nisi. Cras porttitor a purus ac rutrum. </p>
					</div>
				</div>
				
				<div class="clearfix"> </div>
			</div>
		</div>
	</div>
	<!-- //services -->
	
	
	
	<!-- gallery -->
	<div id="gallery" class="gallery">
		<div class="container">
			<h3 class="agileits-title w3title1">科目</h3> 
			<div class="gallery-grids">
				
			</div>
		</div>
	</div>
	<!-- //gallery -->
	<!-- 教师简介 -->
	<div id="about" class="welcome">
		<div class="container">
			<h3 class="agileits-title">教师简介</h3>
			<!-- <h4>教学经验丰富，专业知识扎实，授课体系清晰，善于学科之间联系及应用，深知学生所需，能够将内容前后联系，不断带领学生复习巩固，提倡边学边掌握，带领学生运用理解掌握法，深受学员信赖和喜爱 </h4> -->
			<h4>In education, a teacher is a person who provides schooling for others. A teacher who facilitates education for an individual student may also be described as a personal tutor or profession at a school or other place of formal education. </h4>
			<p class="w-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida mauris non mi gravida, at sollicitudin odio efficitur. Mauris ex nulla, aliquam ornare facilisis nec convallis pulvinar a non nunc non leo sollicitudin</p>
		</div>
	</div>
	<div class="team jarallax">
		<div class="carousel-example">
			<!-- FLEXIBLE BOOTSTRAP CAROUSEL -->
			<div id="simple-content-carousel" class="carousel flexible slide" data-ride="carousel" data-interval="10000" data-wrap="true">
				
				<div class="items itemp">
					<div class="flex-item">
						<div class="agile_team_grid">
					<div class="view w3-agile-view">
						<img src="images/test1.jpg" alt=" " class="img-responsive" />
						<div class="w3lmask">
							<h5>Stellawil</h5>
							<p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit.</p> 
							 
						</div>
					</div>
				</div>
						
					</div>
				
					<div class="flex-item">
						<div class="agile_team_grid">
					<div class="view w3-agile-view">
						<img src="images/test2.jpg" alt=" " class="img-responsive" />
						<div class="w3lmask">
							<h5>Stellawil</h5>
							<p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit.</p> 
						</div>
					</div>
				</div>
					</div>
					
					<div class="flex-item">
						<div class="agile_team_grid">
					<div class="view w3-agile-view">
						<img src="images/test3.jpg" alt=" " class="img-responsive" />
						<div class="w3lmask">
							<h5>Stellawil</h5>
							<p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit.</p> 
						</div>
					</div>
				</div>
					</div>
					<div class="flex-item">
						<div class="agile_team_grid">
					<div class="view w3-agile-view">
						<img src="images/test1.jpg" alt=" " class="img-responsive" />
						<div class="w3lmask">
							<h5>Stellawil</h5>
							<p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit.</p> 
						</div>
					</div>
				</div>
						
					</div>
					<div class="flex-item">
						<div class="agile_team_grid">
					<div class="view w3-agile-view">
						<img src="images/test2.jpg" alt=" " class="img-responsive" />
						<div class="w3lmask">
							<h5>Stellawil</h5>
							<p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit.</p> 
						</div>
					</div>
				</div>
						
					</div>
					<div class="flex-item">
						<div class="agile_team_grid">
					<div class="view w3-agile-view">
						<img src="images/test3.jpg" alt=" " class="img-responsive" />
						<div class="w3lmask">
							<h5>Stellawil</h5>
							<p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit.</p> 
						</div>
					</div>
				</div>
						
					</div>
					
				</div>
				
				<div class="carousel-inner" role="listbox">
					
				</div>
				
				<a class="left carousel-control" href="#simple-content-carousel" role="button" data-slide="prev">
					<span class="fa fa-angle-left" aria-hidden="true"></span>
					<span class="sr-only">上一张</span>
				</a>
				<a class="right carousel-control" href="#simple-content-carousel" role="button" data-slide="next">
					<span class="fa fa-angle-right" aria-hidden="true"></span>
					<span class="sr-only">下一张</span>
				</a>
			</div>
		  </div>
	   </div>
	
	<!-- //教师简介 -->
	<!-- footer -->
	<div class="footer">
		<div class="container">
			<h3><a href="index.html">Entity</a></h3>
			<p>Copyright &copy; 2018.宏图技术小组.</p>
		</div>
	</div>
	<!-- //footer -->	
	
<script src="${ctx}/views/docs/js/index.js"></script>
</body>
</html>