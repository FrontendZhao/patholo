var WEB_ROOT = $('#input_hidden_ctx').val();
$(function(){
	console.info(WEB_ROOT);
    //移动到顶部
    $().UItoTop({ easingType: 'easeOutQuart' });
    
    userShow();
   $.ajax({
    	url:WEB_ROOT+'/olo/subject!doFindSubjectData.do',
    	success:function(msg){
    		/*$.each(msg,function(i,val){
    			$('.gallery-grids').append('<div id="subject_'+val.id+'" class="col-sm-2 col-xs-3 col-xs-offset-2 col-sm-offset-1 gallery-grid"><div class="grid effect-apollo"><a  href="../docs/catalog/subject/subject1.jsp?subNo='+val.id+'" ><img src="/filePath/科目/'+val.name+'/'+val.name+'.png" alt="图片找不到啦"  /><div class="figcaption"><p>'+val.synopsis+'</p></div>	</a></div></div>');
    		});
    		$('.gallery-grids').append('<div class="clearfix"></div>');*/
    		
    		
    		$.each(msg,function(i,val){
    			if(i<=3){
    				var content='<div class="col-xs-12 col-sm-3 col-md-3"><div class="viewed-courses-box"><div class="viewed-courses-img grid effect-apollo">' +
    				'<a href="'+WEB_ROOT+'/views/docs/catalog/subject/subject1.jsp?subNo='+val.id+'"  target="_blank"><img src="/filePath/subject/'+val.id+'/'+val.id+'.jpg" alt="图片找不到啦"><div class="figcaption"><p>'+val.synopsis+'</p></div></a></div><div class="viewed-courses-text">' +
    				'<a href="'+WEB_ROOT+'/views/docs/catalog/subject/subject1.jsp?subNo='+val.id+'"  target="_blank"><h6>'+val.name+'</h6></a><p> '+val.synopsis+'</p>' +
    				'<div class="star">' +
    				'<i class="fa fa-star" aria-hidden="true"></i>' +
    				'<i class="fa fa-star" aria-hidden="true"></i>' +
    				'<i class="fa fa-star" aria-hidden="true"></i>' +
    				'<i class="fa fa-star" aria-hidden="true"></i>' +
    				'<i class="fa fa-star-o" aria-hidden="true"></i>' +
    				'</div><div class="price">切片数量：58 </div></div>' +
    				'</div></div>';
    			     $('.viewed-courses .subject').append(content);
    			}
    			
    		});
    		$('.viewed-courses .subject').append('<div class="col-md-12"><a href="'+WEB_ROOT+'/views/docs/catalog/book/book.jsp" class="button">更多课程</a></div>');
    		
					
				
    		
    	
					
    	
    	    
    	}
    	
    })
    /*$.ajax({
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
	})*/

	//动态加载在线实例
	/*$.ajax({
		async:false,
		url:WEB_ROOT+'/olo/subject!doFindSliceName.do',
		success:function(msg){
			console.info(msg);
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
function userShow(){
     $.ajax({
            url: WEB_ROOT+'/olo/subject!doLoginBL.do',
            type: "POST",
            success: function(data) {
                if(data){
                	$('#loginName').hide();
                	$('#userName').show();
                	$('#userName').html(data);
                }else{
                	$('#userName').hide();
                	$('#loginName').show();
                }
            }
       })
}
function initPic(){

	/*$.ajax({
		async:false,
		url:WEB_ROOT+'/olo/subject!doSliceThumbnail.do',
		success:function(sliceInfo){
			if(sliceInfo==null){
				
			  return false;
			}
			$('#services').find('img').prop('src','data:image/png;base64,'+sliceInfo[0])
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
	    showRotationControl:true,
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
		    scrollToZoom:true
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

