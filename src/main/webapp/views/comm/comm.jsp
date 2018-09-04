<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- Custom Theme files -->
<link href="${ctx}/views/comm/css/style.css" type="text/css" rel="stylesheet" media="all">  
<link href="${ctx}/views/comm/css/lightbox.css" rel="stylesheet">
<!-- //Custom Theme files --> 
</head> 
<body>
	<!-- header -->
	<div class="header" id="home">
	
		<div class="container" >
		
			<div class="agile_header_grid" > 
			
				<div class="header-mdl agileits-logo navbar-left"><!-- header-two --> 
					<h1><a  href="${ctx}/views/docs/index.jsp">Physic</a></h1>
				</div>
				<div class="navbar-right">
					 <nav class="navbar navbar-default" id="example-navbar-menuchild" role="navigation">
					   <div class="navbar-header navbar-right">
					      <button type="button" class="navbar-toggle" data-toggle="collapse" 
					         data-target="#example-navbar-collapse">
					         <span class="sr-only">切换</span>
					         <span class="icon-bar"></span>
					         <span class="icon-bar"></span>
					         <span class="icon-bar"></span>
					      </button>
					   </div>
					   <div class="collapse navbar-collapse" id="example-navbar-collapse">
					      <ul class="nav navbar-nav navbar-right">
					         <li class="icon-bar"><a id="loginName" href="${ctx}/views/users/login.jsp" >登陆</a><a id="userName"></a></li>
					         <li class="icon-bar"><a href="${ctx}/views/FAQ/help.jsp"  target="_blank"  >帮助</a></li>
					         <li class="dropdown">
					            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
					                                                 语言 <span class="caret"></span>
					            </a>
					            <ul class="dropdown-menu">
					               <li><a href="#">中文</a></li>
					               <li><a href="#">English</a></li>
					            </ul>
					         </li>
					      </ul>
					   </div>
					</nav> 
				</div>

				<div class="clearfix"> </div>
			</div>  
		</div>	
	</div>	
	<!-- //header -->
	<div class="modal about-modal w3-agileits fade" id="commModal" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				
			</div>
		</div>
   </div>	
	
   <script src="${ctx}/views/comm/js/comm.js"></script>
</body>
</html>