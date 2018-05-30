function sendAjax(service, body, callback) {
	//var bodyInfo = $.toJSON(body);
	$.ajax({
		type: "GET",
		//contentType:"application/x-www-form-urlencoded; charset=UTF-8",
		url : "http://10.0.7.52:2301/"+service,
		//url : "http://10.0.7.41:8080/TTpark/"+service,
		//url : "http://120.77.182.92:6455/ttpark-data/"+service,
		//url : service,
		data :body,		
		success : function(message) {
			callback(message);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('读取超时，请检查网络连接');
		}
	});
}

//系统时间
function sys_time(){
	var oDate = new Date(); //实例一个时间对象；
	var time=oDate.getFullYear()+"-"
				+sys_time_jia(oDate.getMonth()+1)+"-"
				+sys_time_jia(oDate.getDate())+" "
				+sys_time_jia(oDate.getHours())+":"
				+sys_time_jia(oDate.getMinutes())+":"
				+sys_time_jia(oDate.getSeconds());
	return time;
}

//获取系统时间
function sys_time_jia(number){
	if(number>9){
		return number;
	}else{
		return "0"+number;
	}
}