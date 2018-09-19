<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@include file="../init/base.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Home</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/style.css">
<style type="text/css">
body{
    background: url("images/backgroud1.jpg") no-repeat;
    background-size:cover;
}
</style>

</head>
<body>
	<div id="gtco-blog" data-section="blog" style="height: 100%;padding-top : 18%;padding-left: 18%;">
			<div class="gtco-container" style="text-align: center;">
				<div class="row">
					<div class="col-md-3" >
						<a href="${ctx}/views/check/dist.jsp" class="gtco-card-item has-text well" style="background-color: #DFE0C0;">
							<figure>
								<div class="overlay"><i class="ti-plus"></i></div>
							</figure>
							<div class="gtco-text text-center">
								<h2 style="font-size: 50px;color: white;">考核</h2>
								<p></p>
								<p class="gtco-category"></p>
							</div>
						</a>
					</div>
		
					<div class="col-md-3" >
						<a href="${ctx}/views/docs/index.jsp" class="gtco-card-item has-text well" style="background-color: #DFE0C0;">
							<figure >
								<div class="overlay" ><i class="ti-plus"></i></div>
							</figure>
							<div class="gtco-text text-center" >
								<h2 style="font-size: 50px;color: white;">浏览</h2>
								<p></p>
								<p class="gtco-category"></p>
							</div>
						</a>
					</div>
					<div class="clearfix visible-lg-block visible-md-block"></div>
					<div class="clearfix visible-sm-block"></div>
		
				</div>
			</div>
    </div>
</body>
</html>