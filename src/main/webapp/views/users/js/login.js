$(function(){
    
    //获取光标焦点
	$('input[name="name"]').focus();
	$('input[name="name"]').val('stu1');
	$('input[name="password"]').val('stu1');
	//回车键
    $('#form_login').keydown(function(e){
			var keyCode = e.which || e.keyCode;
		 	if (keyCode==13) {
		 		$('#sign_in_button').trigger("click");
			}
	});
	$('#sign_in_button').click(function(){
	    //判断用户名和密码是否输入完整
		var j_username = $('input[name="name"]').val().trim();
		if( j_username == '' ){
			$('#prompt_message').html('请输入账号');
			return;
		}
		var j_password = $('input[name="password"]').val().trim();
		if( j_password == '' ){
			$('#prompt_message').html('请输入密码');
			return;
		}
		//验证输入的用户名和密码是否正确doCheckLogin
		$.ajax({
			url: WEB_ROOT+'/sys/login!doCheckLogin.do',
			data:{'j_username': j_username, 'j_password': j_password},
			success: function(result){
				if( result ){
					$('<form>').appendTo('body')
					.attr({'action': WEB_ROOT+'/sys/login!doLogin.do', 'method':'post'})
					.append('<input name="j_username" value="'+j_username+'" />')
					.append('<input name="j_password" value="'+j_password+'" />')
					.append('<input name="pageid" value="'+getQueryString("pageid")+'" />')
					.append('<input type="submit" style="display:none" />')
					.find('input[type="submit"]').trigger('click');
				}else{
					$('#prompt_message').html('账号或密码错误，请重新输入');
				}
			}
		});
	})
})
function getQueryString(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]);  
        return null;  
    }