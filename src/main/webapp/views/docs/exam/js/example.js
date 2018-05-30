var p1;
var p2;
$(function(){
	console.info(getQueryString('exampleNo'));
	//getSliceData(getQueryString('exampleNo'));
	//查询实例名称
	/*$.ajax({
		async:false,
		url:WEB_ROOT+'/olo/subject!doFindSliceName.do',
		success:function(msg){
			console.info(msg);
		}
	})*/
	p1= getXmlDom('/filePath/在线实例/血细胞/1/DSI0/MoticDigitalSlideImage');
	p2= getXmlDom('/filePath/在线实例/大动脉/1/DSI0/MoticDigitalSlideImage');
	
	OpenSeadragon({  
		  
	    id:  'openSeadragon',  
	    //按钮图片路径
	    prefixUrl: WEB_ROOT+'/resources/reference/jquery/images/', 
	    //保存切片属性的xml路径（等同于下面的image标签），fileImage为tomcat的server里配置的虚拟路径
	    //tileSources: '/fileImage/24581213_9.xml',
	    //图像旋转按钮
	    showRotationControl:false,
	    //home按钮填充视窗
	    homeFillsViewer:false,
	    //设置图像必须留着窗口中
	    visibilityRatio:1,
	    tileOverlap:1,
	    debugMode:false,
	    preserveImageSizeOnResize:true,
	    //是否显示控制按钮
		showNavigator:true,
		minZoomImageRatio:1,
		zoomPerClick:1.5,
		minZoomLevel:0.5,
		defaultZoomLevel:0,
		navigatorSizeRatio:0.15,
		gestureSettingsMouse:{
		    scrollToZoom:true
		},
		sequenceMode:true,
        showReferenceStrip:true,
	    tileSources:getSliceData(getQueryString('exampleNo'))
	});
	
})

function getSliceData(examNo){
    var sliceArray=[{
	    	width:p1.w,
			height:p1.h,
			tileSize:256,
	        getTileUrl: function(level, x, y){
	        	 $(".panel-title").html('实例1');
			     if(level<=p1.v){
			     	 return '/filePath/在线实例/血细胞/1/DSI0/'+p1.levelArray[0]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
			         return '/filePath/在线实例/血细胞/1/DSI0/'+p1.levelArray[p1.Levellength-(p1.maxlevelVal-level)-1]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
        },{
	    	width:p2.w,
			height:p2.h,
			tileSize:256,
	        getTileUrl: function(level, x, y){
	        	 $(".panel-title").html('实例2');
			     if(level<=p2.v){
				     return '/filePath/在线实例/大动脉/1/DSI0/'+p2.levelArray[0]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
			         return '/filePath/在线实例/大动脉/1/DSI0/'+p2.levelArray[p2.Levellength-(p2.maxlevelVal-level)-1]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
        },{
	    	width:p1.w,
			height:p1.h,
			tileSize:256,
	        getTileUrl: function(level, x, y){
	        	 $(".panel-title").html('实例1');
			     if(level<=p1.v){
				     return '/filePath/在线实例/血细胞/1/DSI0/'+p1.levelArray[0]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
			         return '/filePath/在线实例/血细胞/1/DSI0/'+p1.levelArray[p1.Levellength-(p1.maxlevelVal-level)-1]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
        },{
	    	width:p2.w,
			height:p2.h,
			tileSize:256,
	        getTileUrl: function(level, x, y){
	        	 $(".panel-title").html('实例2');
			     if(level<=p2.v){
				     return '/filePath/在线实例/大动脉/1/DSI0/'+p2.levelArray[0]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
			         return '/filePath/在线实例/大动脉/1/DSI0/'+p2.levelArray[p2.Levellength-(p2.maxlevelVal-level)-1]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
        },{
	    	width:p1.w,
			height:p1.h,
			tileSize:256,
	        getTileUrl: function(level, x, y){
	        	 $(".panel-title").html('实例1');
			     if(level<=p1.v){
				     return '/filePath/在线实例/血细胞/1/DSI0/'+p1.levelArray[0]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
			         return '/filePath/在线实例/血细胞/1/DSI0/'+p1.levelArray[p1.Levellength-(p1.maxlevelVal-level)-1]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
        },{
	    	width:p2.w,
			height:p2.h,
			tileSize:256,
	        getTileUrl: function(level, x, y){
	        	 $(".panel-title").html('实例2');
			     if(level<=p2.v){
				     return '/filePath/在线实例/大动脉/1/DSI0/'+p2.levelArray[0]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
			         return '/filePath/在线实例/大动脉/1/DSI0/'+p2.levelArray[p2.Levellength-(p2.maxlevelVal-level)-1]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
        },{
	    	width:p1.w,
			height:p1.h,
			tileSize:256,
	        getTileUrl: function(level, x, y){
	        	 $(".panel-title").html('实例1');
			     if(level<=p1.v){
				     return '/filePath/在线实例/血细胞/1/DSI0/'+p1.levelArray[0]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
			         return '/filePath/在线实例/血细胞/1/DSI0/'+p1.levelArray[p1.Levellength-(p1.maxlevelVal-level)-1]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
        },{
	    	width:p2.w,
			height:p2.h,
			tileSize:256,
	        getTileUrl: function(level, x, y){
	        	 $(".panel-title").html('实例2');
			     if(level<=p2.v){
				     return '/filePath/在线实例/大动脉/1/DSI0/'+p2.levelArray[0]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
			         return '/filePath/在线实例/大动脉/1/DSI0/'+p2.levelArray[p2.Levellength-(p2.maxlevelVal-level)-1]+'/'+pad(y,4)+'_'+pad(x,4);
			     }
        }];
    sliceArray.unshift(sliceArray[examNo]);
    sliceArray.splice(examNo+1,1);
    return sliceArray;
}
//拼接文件名称
function pad(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
function getQueryString(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]);  
        return null;  
    }