<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<style type = "text/css">
		#CanvasBG
		{
			position: absolute;
			top: 0px;
			left: 0px;
			margin: 0px;
			border: 0px;
			width: 100%;
			height: 100%;
			z-index: 0;
		}
		
		#CanvasUI
		{
			position: absolute;
			top: 0px;
			left: 0px;
			margin: 0px;
			border: 0px;
			width: 100%;
			height: 100%;
			z-index: 1;
		}
		
		#Log 
		{
			position: absolute;
			top: 0px;
			left: 0px;
			background-color: #ff0000;
			font-size: 300%;
			z-index: 2;
		}
	</style>

	<head>
		<meta charset="utf-8" ></meta>
		<script src="H5Player/Core.js" type="text/javascript" ></script>
		<title>血液循环障碍-出血性肺梗死</title>
	</head>
	
	<body>
		<p id = "Log"></p>
		
		<img id = "Thumbnail" src = "Thumbnail.jpg" style = "width:0px; height:0px; overflow:hidden;"></img>

		<canvas id="CanvasBG">非常抱歉！您的浏览器不支持Html5体验，请使用其它浏览器尝试。</canvas>
		<canvas id="CanvasUI" ontouchstart="TouchDown(event)" ontouchmove="TouchMove(event)" ontouchend="TouchUp(event)"onmousedown="MouseDown(event)" onmousemove="MouseMove(event)" onmouseup="MouseUp(event)" onmousewheel="MouseWheel(event)"></canvas>
		<script type="text/javascript">
			var bgR = 233;
			var bgG = 228;
			var bgB = 226;
			var fps = 5;
			window.onload = function(e) 
			{	
				Initialize();
				LoadPhotos("H5Src/", 1, 50, 3072, 2048);
			}
		</script>
	</body>
</html>