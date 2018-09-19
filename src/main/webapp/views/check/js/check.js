$(function(){
    
})

function doLoadOpenseadPNG(id){
	 $('#openSeadragon').html("");
     $.ajax({
     	async:false,
		url:WEB_ROOT+'/olo/subject!doFindSliceInfo.do',
		data:{'sliceNo':id},
		success:function(sliceInfo){
			 //生成图片
			 initPic(sliceInfo);
		}
	})
}	

function initPic(sliceinfo){
	var self = this;
    $(".panel-title").html(sliceinfo.NAME);
    
	//var p= getXmlDom('/filePath/科目/'+sliceInfo.SNAME+'/'+sliceInfo.CNAME+'/'+sliceInfo.NAME+'/1/DSI0/MoticDigitalSlideImage');
	if(!sliceinfo.WIDTH){
	    $("#openSeadragon").html("无切片展示！");
	    return;
	}
	
	viewer= OpenSeadragon({  
		  
	    id:  'openSeadragon',  
	    //按钮图片路径
	    prefixUrl: WEB_ROOT+'/resources/reference/jquery/images/', 
	    //图像旋转按钮
	    showRotationControl:false,
	    //home按钮填充视窗
	    homeFillsViewer:false,
	    //设置图像必须留着窗口中
	    visibilityRatio:0.8,
	    tileOverlap:1,
	    debugMode:false,
	    //preserveImageSizeOnResize:true,
	    //loadTilesWithAjax:true,
	    animationTime:2,
	    //是否显示控制按钮
		showNavigator:true,
		navigatorPosition:'BOTTOM_LEFT',
		minZoomImageRatio:1,
		zoomPerClick:1.8,
		zoomPerScroll:1.5,
		minZoomLevel:0.4,
		//maxZoomLevel:7.128,
		defaultZoomLevel:0,
		//navigatorSizeRatio:0.15,
		gestureSettingsMouse:{
		    scrollToZoom:true,
		    dblClickToZoom:true,
		    clickToZoom:false
		},
		preserveImageSizeOnResize:true,
		imageLoaderLimit:1,
	    tileSources: [{
	    	width:sliceinfo.WIDTH,
			height:sliceinfo.HEIGHT,
			tileSize:256,
	        getTileUrl:function(level,x,y){
	        	return WEB_ROOT+'/olo/subject!doTileUrlSlice.do?level='+level+'&x='+x+'&y='+y+'&sliceNo='+sliceinfo.ID;
	        }
        }]
	});
	
     
	
	
}