function park_money(){
				$("#money_info").empty();
				var service="ParkMoney/getMoney";
				var parameter={
					mfscsflj:$("input[name='mfscsflj']:checked").val(),
					tsclzk:$("#tsclzk").val(),
					ykkssj:$("#ykkssj").val(),
					ykjssj:$("#ykjssj").val(),
					ykmfkssj:$("#ykmfkssj").val(),
					ykmfjssj:$("#ykmfjssj").val(),
					cllx:$("input[name='cllx']:checked").val(),
					clzl:$("input[name='clzl']:checked").val(),
                    rwsj:$("#rwsj").val(),
                    lwsj:$("#lwsj").val(),
                    sflx:$("#sflx").val()
                    //mfkssj:$("#mfkssj").val(),
                    //mfjssj:$("#mfjssj").val()
				}
				var a=JSON.stringify(parameter);
				var body={
                    authKey:"6d31faa965e8c22d3d18507e75005cdf",
                    appType:"1",
                    version:"2.1.06",
                    parameter:a
				}
				sendAjax(service,body,function(message){
					console.log(message);					
					if(message.code==0){	
						var result=message.result.moneyLists;
						var html = "";
						html+="<table id='table'>";
						html+="<tr><td style='text-align: center;'><h3>停车费用计算明细</h3></td></tr>";
						for(var i=0;i<result.length;i++){
							html+="<tr>";								
								html+="<td>";
								html+=result[i].kssj+"至"+result[i].jssj;	
								html+="，收费："+result[i].money/100+"元，";	
								html+="【"+result[i].sfmc+"】，"+result[i].bz;
								html+="</td>";
							html+="</tr>";						
						}
						html+="<tr><td>停车费用："+(message.result.ddje/100)+"元</td></tr>";
						html+="</table>";
						$("#money_info").html(html);
					}else{
						alert("停车费用计算失败,请联系管理员");
					}
				});

			}

我 2018/4/20 14:48:43
他计费的

我 2018/4/20 14:48:53
函数

珊 2018/4/20 14:49:02
直接能用吗

我 2018/4/20 14:50:38
var service="ParkMoney/getMoney";这个是他的算法地址
14:55:01
珊 2018/4/20 14:55:01
那这地址有了可以写了吗
14:57:18
我 2018/4/20 14:57:18
==
15:01:10
我 2018/4/20 15:01:10
把那个Base64.js发给我
15:04:34
珊 2018/4/20 15:04:34
/**
*
* Base64 encode / decode
*
* @author haitao.tu
* @date 2010-04-26
* @email tuhaitao@foxmail.com
*
*/
function Base64() {
 // private property
 _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 // public method for encoding
 this.encode = function (input) {
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  input = _utf8_encode(input);
  while (i < input.length) {
   chr1 = input.charCodeAt(i++);
   chr2 = input.charCodeAt(i++);
   chr3 = input.charCodeAt(i++);
   enc1 = chr1 >> 2;
   enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
   enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
   enc4 = chr3 & 63;
   if (isNaN(chr2)) {
    enc3 = enc4 = 64;
   } else if (isNaN(chr3)) {
    enc4 = 64;
   }
   output = output +
   _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
   _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  }
  return output;
 }
 // public method for decoding
 this.decode = function (input) {
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
   enc1 = _keyStr.indexOf(input.charAt(i++));
   enc2 = _keyStr.indexOf(input.charAt(i++));
   enc3 = _keyStr.indexOf(input.charAt(i++));
   enc4 = _keyStr.indexOf(input.charAt(i++));
   chr1 = (enc1 << 2) | (enc2 >> 4);
   chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
   chr3 = ((enc3 & 3) << 6) | enc4;
   output = output + String.fromCharCode(chr1);
   if (enc3 != 64) {
    output = output + String.fromCharCode(chr2);
   }
   if (enc4 != 64) {
    output = output + String.fromCharCode(chr3);
   }
  }
  output = _utf8_decode(output);
  return output;
 }
 // private method for UTF-8 encoding
 _utf8_encode = function (string) {
  string = string.replace(/\r\n/g,"\n");
  var utftext = "";
  for (var n = 0; n < string.length; n++) {
   var c = string.charCodeAt(n);
   if (c < 128) {
    utftext += String.fromCharCode(c);
   } else if((c > 127) && (c < 2048)) {
    utftext += String.fromCharCode((c >> 6) | 192);
    utftext += String.fromCharCode((c & 63) | 128);
   } else {
    utftext += String.fromCharCode((c >> 12) | 224);
    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    utftext += String.fromCharCode((c & 63) | 128);
   }
  }
  return utftext;
 }
 // private method for UTF-8 decoding
 _utf8_decode = function (utftext) {
  var string = "";
  var i = 0;
  var c = c1 = c2 = 0;
  while ( i < utftext.length ) {
   c = utftext.charCodeAt(i);
   if (c < 128) {
    string += String.fromCharCode(c);
    i++;
   } else if((c > 191) && (c < 224)) {
    c2 = utftext.charCodeAt(i+1);
    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
    i += 2;
   } else {
    c2 = utftext.charCodeAt(i+1);
    c3 = utftext.charCodeAt(i+2);
    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
    i += 3;
   }
  }
  return string;
 }
}
