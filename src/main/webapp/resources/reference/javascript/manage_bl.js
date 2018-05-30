var managerBL=false;
$(function(){
	$.ajax({
	       url:WEB_ROOT+'/nx/syscfg/measure!dofindManage',
	       success:function(result){
	       	  $.each(result,function(i,val){
	       	      if(val.ROLEID==1){
	       	        managerBL=true;
	       	        return false;
	       	      }
	       	  })
	       }
	    })
})
	    
