var sendvisitinfo = function(type,page){};

bookConfig.totalPageCount=loadPageTotal();

$(function(){
	
})

function loadSubject(pageNo){
	var content="";
	$.ajax({
		async:false,
		url:WEB_ROOT+'/olo/subject!doFindSubjectPageData.do',
		data:{'subNo':getQueryString('subNo'),'pageID':pageNo},
		success:function(msg){
			
			content=loadContent(msg);;
		}
	})
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
function loadContent(msg){
     var c= "<div class='flipbook' style='position: relative; width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); margin-left: 0px;'>" +
     		"<div class='own-size page p2 even' style='width: 100%; height: 100%; float: left; position: absolute; top: 0px; left: 0px; bottom: auto; right: auto;'>" +
			"<div class='page-body page-body-with-title'><div class='page-title'></div>" +
			"<div class='page-content'>";
			
			if(msg){
			     
				c+="<div class='grade-title'><div class='grade-title-text'>"+msg.NAME+"</div></div>";
				
				for (var i = 0; i < msg.CHILD.length; i++) {
					
					c+="<div class='chapter-title'><div class='chapter-title-no'>"+(i+1)+"</div><div class='chapter-title-text'>"+msg.CHILD[i].NAME+"</div></div>";
					
					for (var j = 0; j < msg.CHILD[i].CHILD.length; j++) {
					
					     c+="<div class='section'><ul class='section-title'><li class='order-"+(j+1)+"'>"+msg.CHILD[i].CHILD[j].NAME+"</li></ul>";
					
					     c+="<ul class='section-slides section-slide-layout-large'>"
					     
					     for (var l = 0; l < msg.CHILD[i].CHILD[j].CHILD.length; l++) {
					     	
					     	   if(msg.CHILD[i].CHILD[j].CHILD[l].SLICEFLAG=="1"){
					     	       
					     	   	   	 c+="<li><a target='_blank' href='"+WEB_ROOT+"/views/docs/catalog/slice.jsp?sliceNo="+msg.CHILD[i].CHILD[j].CHILD[l].ID+"'>"+(l+1)+". "+msg.CHILD[i].CHILD[j].CHILD[l].NAME+"</a></li>";

					     	   }
					     	   if(msg.CHILD[i].CHILD[j].CHILD[l].SLICEFLAG=="2"){
					     	       
					     	   	   	 c+="<li><a target='_blank' href='"+WEB_ROOT+"/views/demo/spin.jsp'>"+(l+1)+". "+msg.CHILD[i].CHILD[j].CHILD[l].NAME+"</a></li>";

					     	   }
					     	   if(msg.CHILD[i].CHILD[j].CHILD[l].SLICEFLAG=="0"){
					     	       
					     	   	   	 c+="<li>"+(l+1)+". "+msg.CHILD[i].CHILD[j].CHILD[l].NAME+"</li>";

					     	   }
					
					
				         }
				         
				         c+="</ul></div>";
					
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
	return total;
}
function getQueryString(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]);  
        return null;  
}
