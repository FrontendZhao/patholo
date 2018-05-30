<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
         <div class="modal-header">
			  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>						
		 </div>
         <div style="margin: 50px;text-align: center;">
            <img width="100px" height="100px" style="border: 3px solid #CCCCCC;" class="img-circle" src="${ctx}/views/users/images/1204593.png">
         </div>
         <div style="padding: 50px 50px 20px;">
		   <form class="bs-example bs-example-form" role="form">
		   
		      <div class="input-group input-group-lg">
		         <span class="input-group-addon"><img width="25px" height="25px" src="${ctx}/views/users/images/user.png"></span>
		         <input type="text" class="form-control" placeholder="">
		      </div><br>
		      <div class="input-group input-group-lg">
		         <span class="input-group-addon"><img width="25px" height="25px" src="${ctx}/views/users/images/pwd.png"></span>
		         <input type="password" class="form-control" placeholder="">
		      </div><br>
		   </form>
		   <button type="button" class="btn btn-primary btn-lg" style="font-size: 25px;width: 100%;margin-top: 20px;">
			  <span class="glyphicon"></span> 登陆
			</button>
		   
		</div>

</body>
</html>