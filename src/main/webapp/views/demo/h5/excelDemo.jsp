<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>模拟计算停车费用</title>
		<script src="../js/jquery-1.11.1.js"></script>
		<script src="../js/Base64.js"></script>
		
		<script src="../js/ajaxUtil.js"></script>
		<style>
			#table{
				border: solid 1px;
			}
			.input{
				width: 300px;
			}
		</style>
		<script>
			//初始化加载
			$(document).ready(function() {
				//加载收费标准
				init_sfbz();
				$("#rwsj").val(sys_time());
				$("#lwsj").val(sys_time());
			});	
			
			//加载收费标准
			function init_sfbz(){
				var parameter={
                    sflx:$("#sflx").val()
				}
				var a=JSON.stringify(parameter);
	
				var service="ParkMoney/findSFBZ";
				var body={
                    authKey:"6d31faa965e8c22d3d18507e75005cdf",
                    appType:"1",
                    version:"2.1.06",
                    parameter:a
				}
				sendAjax(service,body,function(message){
					console.log(message);	
					if(message.code==0){						
						var result=message.result;
						var html = "";
						html+="<table id='table'>";
						html+="<tr><td colspan='2' style='text-align: center;'><h3>收费标准详情</h3></td></tr>";
						for(var i=0;i<result.length;i++){
							html+="<tr>";
								html+="<td>收费名称：</td>";
								html+="<td>";
								html+=result[i].sfmc;
								html+="</td>";
							html+="</tr>";
							html+="<tr>";
								html+="<td>收费类型：</td>";
								html+="<td>";
								if(result[i].sflx==1){
									html+="按次收费";
								}else if(result[i].sflx==2){
									html+="全天收费";
								}else if(result[i].sflx==3){
									html+="时段收费";
								}								
								html+="</td>";
							html+="</tr>";
							html+="<tr>";
								html+="<td>日期类型：</td>";
								html+="<td>";
								if(result[i].rqlx==1){
									html+="工作日";
								}else if(result[i].rqlx==2){
									html+="周末";
								}								
								html+="</td>";
							html+="</tr>";
							html+="<tr>";
								html+="<td>车辆种类：</td>";
								html+="<td>";
								if(result[i].clzl==0){
									html+="小型车辆";
								}else if(result[i].clzl==1){
									html+="中型车辆";
								}else if(result[i].clzl==2){
									html+="大型车辆";
								}								
								html+="</td>";
							html+="</tr>";
							html+="<tr>";
								html+="<td>免费时长：</td>";
								html+="<td>";
								html+=result[i].mfsc+"分钟";
								html+="</td>";
							html+="</tr>";
							html+="<tr>";
								html+="<td>免费时间段：</td>";
								html+="<td>";
								html+=result[i].ksmfsd+"至"+result[i].jsmfsd;
								html+="</td>";
							html+="</tr>";
							html+="<tr>";
								html+="<td>单位价格：</td>";
								html+="<td>";
								html+=result[i].dwjg/100+"元";
								if(result[i].sflx>1){
									html+="\/"+result[i].dwsc+"分钟"
								}
								html+="</td>";
							html+="</tr>";
							if(result[i].sflx>1){
								html+="<tr>";
									html+="<td>起步价格：</td>";
									html+="<td>";
									html+=result[i].qbjg/100+"元\/"+result[i].qbsc+"分钟";						
									html+="</td>";
								html+="</tr>";
								html+="<tr>";
									html+="<td>最高价格：</td>";
									html+="<td>";
									html+=result[i].zgjg/100+"元";						
									html+="</td>";
								html+="</tr>";
							}
							html+="<tr><td colspan='2'  style='border-top: dashed;'></td></tr>";
						}
						html+="</table>";
						$("#sfbz").html(html);
						//console.log(html);	
						//alert("初始化收费标准成功");
					}else{
						alert("初始化收费标准失败,请联系管理员");
					}
				});
			}
		
			//计算停车费用
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
			
			//入位系统时间
			function rw_sys_time(){
				$("#rwsj").val(sys_time());
			}
			
			//离位系统时间
			function lw_sys_time(){
				$("#lwsj").val(sys_time());
			}
			
			//月卡车辆全天免费
			function yk_qtmf_time(){
				$("#ykmfkssj").val("00:00:00");
				$("#ykmfjssj").val("23:59:59");
			}
		</script>
	</head>
	<body>
		<h1 style="text-align: center;">模拟计算停车费用</h1>
		<div id="sfbz" style="float: left;padding-left: 10px;">
			
		</div>
		<div style="float: left;padding-left: 10px;padding-right: 500px;">
			<table id="table">
				<tr>
					<td colspan="3" style="text-align: center;">
						<h3>算法基本信息配置</h3>
					</td>
				</tr>
				<tr>
					<td>收费类型：</td>
					<td>
						<select onchange="init_sfbz()" id="sflx">
							<option value="1">按次收费</option>
							<option value="2">全天收费</option>
						</select>
					</td>						
				</tr>
				<tr>
					<td>免费时长是否累计：</td>
					<td>
						否<input type="radio" name="mfscsflj" id="mfscsflj" class="radio" value="0" checked="checked"/>
						是<input type="radio" name="mfscsflj" id="mfscsflj" class="radio" value="1"/>
					</td>						
				</tr>
				<tr>
					<td>特殊车辆折扣：</td>
					<td><input type="text" id="tsclzk" name="tsclzk" class="input"/ value="1"></td>
					<td>例如：0.95</td>
				</tr>
				<tr>
					<td colspan="3" style="border-top: dashed;"></td>
				</tr>
				<tr>
					<td colspan="3" style="text-align: center;">
						<h3>月卡车辆信息配置</h3>
					</td>
				</tr>
				<tr>
					<td>月卡开始时间：</td>
					<td><input type="text" id="ykkssj" name="ykkssj" class="input"/ value=""></td>
				</tr>
				<tr>
					<td>月卡结束时间：</td>
					<td><input type="text" id="ykjssj" name="ykjssj" class="input"/ value=""></td>
				</tr>
				<tr>
					<td>月卡免费开始时间段：</td>
					<td><input type="text" id="ykmfkssj" name="ykmfkssj" class="input"/ value=""></td>
					<td><input type="button" value="全天免费" onclick="yk_qtmf_time()"/></td>
				</tr>
				<tr>
					<td>月卡免费结束时间段：</td>
					<td><input type="text" id="ykmfjssj" name="ykmfjssj" class="input"/ value=""></td>
				</tr>							
				<tr>
					<td colspan="3" style="border-top: dashed;"></td>
				</tr>
				<tr>
					<td colspan="3" style="text-align: center;">
						<h3>停车基本信息配置</h3>
					</td>
				</tr>
				<tr>
					<td>车辆类型：</td>
					<td>
						普通车辆<input type="radio" name="cllx" id="cllx" class="radio" value="1" checked="checked"/>
						特殊车辆<input type="radio" name="cllx" id="cllx" class="radio" value="2"/>						
					</td>
				</tr>	
				<tr>
					<td>车辆种类：</td>
					<td>
						小型车辆<input type="radio" name="clzl" id="clzl" class="radio" value="0" checked="checked"/>
						中型车辆<input type="radio" name="clzl" id="clzl" class="radio" value="1"/>
						大型车辆<input type="radio" name="clzl" id="clzl" class="radio" value="2"/>
					</td>
				</tr>	
				<tr>
					<td>入位时间：</td>
					<td><input type="text" id="rwsj" name="rwsj" class="input"/></td>
					<td><input type="button" value="系统时间" onclick="rw_sys_time()"/></td>
				</tr>
				<tr>
					<td>离位时间：</td>
					<td><input type="text" id="lwsj" name="lwsj" class="input"/></td>
					<td><input type="button" value="系统时间" onclick="lw_sys_time()"/></td>
				</tr>
				<tr>
					<td></td>
					<td><input type="button" value="计算停车费用" onclick="park_money()"/></td>					
				</tr>
			</table>
		</div>
		
		<div id="money_info" style="float: left;padding-left: 10px;padding-top: 20px;">
			
		</div>
	</body>
</html>
