$(function(){
    //移动到顶部
    $().UItoTop({ easingType: 'easeOutQuart' });
    $.ajax({
    	url:WEB_ROOT+'/olo/subject!doFindSubjectData.do',
    	success:function(msg){
    		$.each(msg,function(i,val){
    			$('.gallery-grids').append('<div id="subject_'+val.id+'" class="col-sm-2 col-xs-3 col-xs-offset-2 col-sm-offset-1 gallery-grid"><div class="grid effect-apollo"><a  href="../docs/catalog/subject.jsp?subNo='+val.id+'" target="_blank" ><img src="/filePath/科目/'+val.name+'/'+val.name+'.png" alt="图片找不到啦"  /><div class="figcaption"><p>'+val.synopsis+'</p></div>	</a></div></div>');
    		});
    		$('.gallery-grids').append('<div class="clearfix"></div>');
    	}
    	
    })
    $.ajax({
		async:false,
		url:WEB_ROOT+'/olo/subject!doFindSliceInfo.do',
		data:{'sliceNo':100001},
		success:function(sliceInfo){
			if(sliceInfo==null){
				
			  return false;
			}
			 sliceinfo=sliceInfo;
			 //生成图片
			 initPic();
		}
	})

	//动态加载在线实例
	/*$.ajax({
		async:false,
		url:WEB_ROOT+'/olo/subject!doFindSliceName.do',
		success:function(msg){
			$.each(msg,function(i,val){
				var p= getXmlDom('/filePath/EXAMPLE/'+val+'/1/DSI0/MoticDigitalSlideImage');
				$('.services-agileinfo').append('<div class="col-sm-3 col-xs-6 wthree-services-grid">'
						+'<div class="wthree-services-icon"><a href="../docs/example.jsp?exampleNo='+val+'" target="_blank" ><img src="/filePath/EXAMPLE/'+val+'/1/DSI0/'+p.level[0]+'/0000_0000" alt="图片找不到啦" class="img-thumbnail" ></a></div>'
						+'<div class="wthree-services-info"><h5>'+val+'</h5><p>Donec sed nisi leo. Ut at sagittis nisi. Cras porttitor a purus ac rutrum. </p></div></div>');
			})
			    $('.services-agileinfo').append('<div class="clearfix"></div>');
			
		}
	})*/


})
function initPic(){

	/*$.ajax({
		async:false,
		url:WEB_ROOT+'/olo/subject!doSliceThumbnail.do',
		success:function(sliceInfo){
			if(sliceInfo==null){
				
			  return false;
			}
			console.info(sliceInfo);
		}
	})*/
    //读取xml
    //var p= getXmlDom(WEB_ROOT+'/views/docs/DSI0/MoticDigitalSlideImage');
    //console.info(p);
	
	OpenSeadragon({  
		  
	    id:  'openSeadragon1',  
	    //按钮图片路径
	    prefixUrl: WEB_ROOT+'/resources/reference/jquery/images/', 
	    //保存切片属性的xml路径（等同于下面的image标签），fileImage为tomcat的server里配置的虚拟路径
	    //tileSources: '/fileImage/24581213_9.xml',
	    //图像旋转按钮
	    showRotationControl:false,
	    //home按钮填充视窗
	    homeFillsViewer:true,
	    //设置图像必须留着窗口中
	    visibilityRatio:1,
	    tileOverlap:1,
	    debugMode:false,
	    preserveImageSizeOnResize:true,
	    //是否显示控制按钮
		showNavigator:true,
		minZoomImageRatio:1,
		zoomPerClick:1.5,
		minZoomLevel:1,
		defaultZoomLevel:1,
		imageLoaderLimit:1,
		gestureSettingsMouse:{
		    scrollToZoom:false
		},
	    tileSources:   {
	    	width:24392,
			height:11642,
			tileSize:256,
			getTileUrl:function(level,x,y){
	        	return WEB_ROOT+'/olo/subject!doTileUrlSlice.do?level='+level+'&x='+x+'&y='+y+'&sliceNo=100001';
	        }
        }
	});
}

//拼接文件名称
function pad(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

