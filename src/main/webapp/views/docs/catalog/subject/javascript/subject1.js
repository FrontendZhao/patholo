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
				content=loadContent(msg,pageNo-1);
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
     var c="<iframe  frameborder='0'  src='"+WEB_ROOT +"/views/docs/catalog/subject/demo"+pageNo+".jsp' style='border:0; width:100%;height:100%;' ></iframe>";
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
