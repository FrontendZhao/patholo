<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"  isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<!DOCTYPE html>
<!-- 服务端参数 -->
<html lang="zh-cn">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="renderer" content="webkit">
    <title>登录</title>
	
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="${ctx}/resources/reference/jquery/jquery.min.js"></script>
</head>
<body>
<c:set var="ctx"  value="${pageContext.request.contextPath}" />
<input type="hidden" id="input_hidden_ctx" name="ctx" value="${ctx}" />

    <div class="bg"></div>
    <div class="container">
        <div class="line bouncein">
            <div class="xs6 xm4 xs3-move xm4-move">
                <div style="height:150px;"></div>
                <div class="media media-y margin-big-bottom">
					<!-- 提示错误信息 -->
					<p id="prompt_message" class="quc-tip-error"></p>
                </div>
                <form  id="form_login">
                    <div class="panel loginbox">
                        <div class="text-center margin-big padding-big-top">
                            <h1>登陆</h1>
                        </div>
                        <div class="panel-body" style="padding:30px; padding-bottom:10px; padding-top:10px;">
                            <div class="form-group">
                                <div class="field field-icon-right">
                                    <input type="text" class="input input-big" name="name" id="username" placeholder="登录账号" />
                                    <span class="icon icon-user margin-small"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="field field-icon-right">
                                    <input type="password" class="input input-big" name="password" id="password"  placeholder="登录密码" />
                                    <span class="icon icon-key margin-small"></span>
                                </div>
                            </div>
                            <!-- <div class="form-group">
                                <div class="field">
                                    <input type="text" class="input input-big" name="code" placeholder="填写右侧的验证码" />
                                    <img src="images/passcode.jpg" alt="" width="100" height="32" class="passcode" style="height:43px;cursor:pointer;" onClick="this.src=this.src+'?'">
                                </div>
                            </div> -->
                        </div>
                        <div style="padding:30px;">
                            <input type="button" id="sign_in_button" class="button button-block bg-main text-big input-big" value="登录">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
<script type="text/javascript">
var WEB_ROOT = $('#input_hidden_ctx').val();
</script>
<script type="text/javascript" src="js/login.js"></script>
</body>
</html>