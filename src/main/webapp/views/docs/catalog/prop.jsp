<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%@include file="../../init/root.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
                    <div class="modal-header">
			            <button type="button" class="close" 
			               data-dismiss="modal" aria-hidden="true">
			                  &times;
			            </button>
			            <h4 class="modal-title" id="myModalLabel">批注属性</h4>
			         </div>
			         <div class="modal-body">
			                  <div class="form-group" id="width" >
							      <label   class="control-label"></label>
							   </div>
							   <div class="form-group" id="height"  >
							      <label   class="control-label"></label>
							   </div>
							   <div class="form-group" id="girth" >
							      <label   class="control-label"></label>
							   </div>
							   <div class="form-group" id="area" >
							      <label   class="control-label"></label>
							   </div>
							   

			         </div>
<script type="text/javascript" src="${ctx}/views/docs/catalog/js/prop.js"></script>
<script type="text/javascript">

var prop=new Prop({'obj':selObject});
    prop[selObject.prop.propType]();
    
</script>			         
</body>
</html>