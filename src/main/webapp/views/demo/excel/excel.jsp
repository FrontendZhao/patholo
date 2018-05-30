<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <title></title>
        <script src="jquery.min.js"></script>
        <script src="xlsx.full.min.js"></script>
    </head>

    <body>
        <input type="file"onchange="importf(this)" />
        <div id="demo"></div>
        <iframe id="iframeid"  name="iframeid" src="http://10.0.7.52:8020/MonitorTest/html/money.html" width="1000" height="1000" style="margin: 30px;" ></iframe>
        <script>
            
            var wb;//读取完成的数据
            var rABS = false; //是否将文件读取为二进制字符串

            function importf(obj) {//导入
                if(!obj.files) {
                    return;
                }
                var f = obj.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    var data = e.target.result;
                    if(rABS) {
                        wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = XLSX.read(data, {
                            type: 'binary'
                        });
                    }
                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据
                    var sheet=wb.Sheets[wb.SheetNames[0]];
                    var datajson=JSON.parse(JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])));
                    var B=[];
                    var C=[];
                    var D=[];
                    for (var i = 0; i < datajson.length; i++) {
                    	//开始时间
                    	$(window.frames["iframeid"].document).find("#rwsj").val(datajson[i].A);
                    	//结束时间
                    	$(window.frames["iframeid"].document).find("#lwsj").val(datajson[i].B);
                    	//点击计算按钮
                    	$("#iframeid")[0].contentWindow.park_money();
                    	//保存计算结果
                    	var a= $(window.frames["iframeid"].document).find("td:last")[0].innerHTML;
                    	D.push(a.slice(5))
                    	B.push(datajson[i].B);
                    	C.push(datajson[i].C);
					}
                    for (var i = 0; i < D.length; i++) {
                    	//打印计算结果，按f12看
                    	console.log(D[i]);
					}
                };
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            }

            function fixdata(data) { //文件流转BinaryString
                var o = "",
                    l = 0,
                    w = 10240;
                for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            }

        </script>
    </body>

</html>