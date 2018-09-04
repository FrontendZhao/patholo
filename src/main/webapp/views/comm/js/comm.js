$(function(){
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
})