var sendvisitinfo = function(type,page){};

bookConfig.totalPageCount=loadPageTotal();

$(function(){
	
})

function loadSubject(pageNo){
	var content="";
	if(pageNo==1){
		content="<img style='width: 100%; height: 100%;' src='/filePath/subject/"+getQueryString('subNo')+"/"+getQueryString('subNo')+".jpg'>";
	}else{
	
		$.ajax({
			async:false,
			url:WEB_ROOT+'/olo/subject!doFindSubjectPageData.do',
			data:{'subNo':getQueryString('subNo'),'pageID':pageNo-1},
			success:function(msg){
				content=loadContent(msg,pageNo);
			}
		})
	}
	
	return content;
	/*$.ajax({
	    url:WEB_ROOT+'/olo/subject!doFindSubjectPageData.do',
    	success:function(msg){
    		$.each(msg,function(i,val){
    			$('.gallery-grids').append('<div id="subject_'+val.id+'" class="col-sm-2 col-xs-3 col-xs-offset-2 col-sm-offset-1 gallery-grid"><div class="grid effect-apollo"><a  href="../docs/catalog/subject/subject1.jsp?subNo='+val.id+'" ><img src="/filePath/科目/'+val.name+'/'+val.name+'.png" alt="图片找不到啦"  /><div class="figcaption"><p>'+val.synopsis+'</p></div>	</a></div></div>');
    		});
    		$('.gallery-grids').append('<div class="clearfix"></div>');
    	}
	})*/
}
function loadContent(msg,pageNo){
     var c= "<div class='flipbook' style='position: relative; width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); margin-left: 0px;'>" +
     		"<div class='own-size page p2 even' style='width: 100%; height: 100%; float: left; position: absolute; top: 0px; left: 0px; bottom: auto; right: auto;'>" +
			"<div class='page-body page-body-with-title'><div class='page-title'></div>" +
			"<div class='page-content' style='overflow:hidden;height:564px;' >";
			
			if(msg){
			     
				c+="<div class='grade-title'><div class='grade-title-text'>"+msg.NAME+"</div></div>";
				
				for (var i = 0; i < msg.CHILD.length; i++) {
					
					c+="<div class='chapter-title'><div class='chapter-title-no'>"+(i+1)+"</div><div class='chapter-title-text'>"+msg.CHILD[i].NAME+"</div></div>";
					
					for (var j = 0; j < msg.CHILD[i].CHILD.length; j++) {
					
					     c+="<div class='section'><ul class='section-title'><li class='order-"+(j+1)+"'>"+msg.CHILD[i].CHILD[j].NAME+"</li></ul>";
					
					     c+="<ul class='section-slides section-slide-layout-large'>"
					     
					     var a="",b="",g=1;
					     
					     for (var l = 0; l < msg.CHILD[i].CHILD[j].CHILD.length; l++) {
					     	
					     	   
					     	
					     	   if(msg.CHILD[i].CHILD[j].CHILD[l].SLICEFLAG=="1"){
					     	       
					     	   	   	 a+="<li><a target='_blank' href='"+WEB_ROOT+"/views/docs/catalog/slice.jsp?sliceNo="+msg.CHILD[i].CHILD[j].CHILD[l].ID+"'> "+msg.CHILD[i].CHILD[j].CHILD[l].NAME+"</a></li>";

					     	   }
					     	   if(msg.CHILD[i].CHILD[j].CHILD[l].SLICEFLAG=="2"){
					     	       
					     	   	   	 a+="<li><a target='_blank' href='"+WEB_ROOT+"/views/demo/spin.jsp?sliceNo="+msg.CHILD[i].CHILD[j].CHILD[l].ID+"'> "+msg.CHILD[i].CHILD[j].CHILD[l].NAME+"</a></li>";

					     	   }
					     	   if(msg.CHILD[i].CHILD[j].CHILD[l].SLICEFLAG=="0"){
					     	   	
					     	   	     
					     	   	     if(msg.CHILD[i].CHILD[j].CHILD[l].CHILD!=undefined && msg.CHILD[i].CHILD[j].CHILD[l].CHILD.length!=0){
					     	   	         
					     	   	     	 b+="<ul class='section-title'><li><strong>"+(j+1)+"."+(g)+" </strong>"+msg.CHILD[i].CHILD[j].CHILD[l].NAME+"</li></ul><ul class='section-slides section-slide-layout-large'>";
					     	   	     	 
					     	   	     	 var e="",k=1;
					     	   	     	 for (var t = 0; t < msg.CHILD[i].CHILD[j].CHILD[l].CHILD.length; t++) {
					     	   	     	       
					     	   	     	 	   if(msg.CHILD[i].CHILD[j].CHILD[l].CHILD[t].SLICEFLAG=="1"){
					     	       
									     	   	   	 e+="<li><a target='_blank' href='"+WEB_ROOT+"/views/docs/catalog/slice.jsp?sliceNo="+msg.CHILD[i].CHILD[j].CHILD[l].CHILD[t].ID+"'> "+msg.CHILD[i].CHILD[j].CHILD[l].CHILD[t].NAME+"</a></li>";
				
									     	   }
									     	   if(msg.CHILD[i].CHILD[j].CHILD[l].CHILD[t].SLICEFLAG=="2"){
									     	       
									     	   	   	 e+="<li><a target='_blank' href='"+WEB_ROOT+"/views/demo/spin.jsp?sliceNo="+msg.CHILD[i].CHILD[j].CHILD[l].CHILD[t].ID+"'> "+msg.CHILD[i].CHILD[j].CHILD[l].CHILD[t].NAME+"</a></li>";
				
									     	   }
									     	   if(msg.CHILD[i].CHILD[j].CHILD[l].CHILD[t].SLICEFLAG=="0"){
									     	   	
					     	   	     	
									     	   	    e+="<li>"+msg.CHILD[i].CHILD[j].CHILD[l].CHILD[t].NAME+"</li>";
									     	   	     
									     	   
									     	   }
					     	   	     	 	
					     	   	     	 
					     	   	     	 }
					     	   	     	 b+=e+"</ul>";
					     	   	     	 g++;
					     	   	     }else{
					     	   	     	
					     	   	     	 b+="<ul class='section-title'><li><strong>"+(j+1)+"."+(g++)+"</strong>"+msg.CHILD[i].CHILD[j].CHILD[l].NAME+"</li></ul>";
					     	   	     }

					     	   }
					
				         }
				         
				         c+=a+b+"</ul></div>";
					
				    }
					
				}
				
			}else{
			     c+="<h3>未查到目录</h3>";
			}
			c+="</div></div></div></div>";
			return c;
}
function loadPageTotal(){
    
	var total=1;
	$.ajax({
		async:false,
		url:WEB_ROOT+'/olo/subject!doFindSubjectPageTotal.do',
		data:{'subNo':getQueryString('subNo')},
		success:function(msg){
			total=msg.TOTAL;
		}
	})
	return total+1;
}
function getQueryString(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]);  
        return null;  
}
