<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Three</title>
<script src="three.js-master/build/three.js"></script>
<script src="three.js-master/build/OrbitControls.js"></script>
<script src="three.js-master/build/jquery.min.js"></script>
<style type="text/css">
div#canvas-frame {
	border: none;
	cursor: pointer;
	width: 100%;
	height: 600px;
	background-color: #EEEEEE;
}
</style>

<script>
	
	var container; var camera, scene, renderer,controls; var lineArr=[];var cylinderArr=[];var lineArrtwo=[];var rs=[];
	var hs=[];
	var ls=[];var num=[];var n=1;var j=0;
	//20,18,16,14,12,10,5,0,-5,-10,-12,-14,-16,-18,-20
	function main(){ 
		for (var i = -30; i < 30; i++) {
			num.push(i);
		}
		//添加一个div元素 
		
		scene = new THREE.Scene();//创建一个新场景 
		//添加一个透视相机
		camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 1, 10000); 
		camera.position.set(-120,100,0);
		//设置相机位置 
		camera.lookAt(new THREE.Vector3(0,0,0));//让相机指向原点
		
		//渲染 //antialias:true增加抗锯齿效果 
		renderer = new THREE.WebGLRenderer({antialias:true});
		renderer.setClearColor(new THREE.Color(0xffffff));//设置窗口背景颜色为黑 
		renderer.setSize(window.innerWidth, window.innerHeight);//设置窗口尺寸 
		//将renderer关联到container，这个过程类似于获取canvas元素 
		document.getElementById('canvas-frame').appendChild(renderer.domElement);
		//container.appendChild(renderer.domElement); 
		
		//控制器
		controls = new THREE.OrbitControls( camera);
		//controls.minDistance = 100;
		//controls.maxDistance = 200;
		//给场景添加光源 
		//环境光
		var ambientLight = new THREE.AmbientLight( 0x0c0c0c);
		scene.add( ambientLight );
		//生成一个平面
        var planeGeometry=new THREE.PlaneGeometry(100,100,10,10);//平面
        //生成一个材质
        var planeMaterial=new THREE.MeshLambertMaterial({color:0xffffff});
        //生成一个网格，将平面和材质放在一个网格中，组合在一起，组成一个物体
        var plane=new THREE.Mesh(planeGeometry,planeMaterial);
        plane.rotation.x=-0.5*Math.PI;//将平面沿着x轴进行旋转
        plane.position.x=0;
        plane.position.y=-100;
        plane.position.z=0;
        plane.receiveShadow=true;//平面进行接受阴影
        scene.add(plane);
        
		//自然光 
		/* var directionalLight = new THREE.DirectionalLight( 0xffffff);
			directionalLight.position.set(0,100,0);
	        directionalLight.castShadow = true;
	        directionalLight.shadowCameraNear =6;
	        directionalLight.shadowCameraFar =10;
	        directionalLight.shadowCameraLeft =-5;
	        //directionalLight.shadowCameraLeft = 10;
	        directionalLight.shadowCameraRight =5;
	        directionalLight.shadowCameraTop =5;
	        directionalLight.shadowCameraBottom =-5;
	        directionalLight.shadowCameraVisible=true;
	        //directionalLight.distance = 5;
	        directionalLight.target=plane;
	        directionalLight.intensity = 0.5;
			scene.add( directionalLight );  */
		var directionalLight = new THREE.DirectionalLight( 0xffffff );
			directionalLight.angle = Math.PI / 5;
			directionalLight.penumbra = 0.2;
			directionalLight.position.set( 0, 100, 0 );
			directionalLight.castShadow = true;
			directionalLight.shadow.camera.near = 3;
			directionalLight.shadow.camera.far = 10;
			directionalLight.shadow.mapSize.width = 1024;
			directionalLight.shadow.mapSize.height = 1024;
			scene.add( directionalLight );
		/* plane();
		cube();
		sphere();*/
		/* cylinder(15,60,0,0,20); 
		cylinder(10,60,0,0,80); 
		cylinder(7,40,0,0,120); 
		cylinder(5,40,0,0,-20); 
		cylinder(2,40,0,0,-60); */
		var arr=[];
		init(arr,cylinderArr,lineArr);
		for (var i = 0; i < arr.length-3; i+=3) {
			lineArrtwo.push(line(arr[i],arr[i+1],arr[i+2],arr[i+3],arr[i+4],arr[i+5],0xFF0000,0xFF0000));
		}
		render();
		animate();
		} 
	    //初始化图形
	    function init(arr,cylinderArr,lineArr){
			$.ajax({
				async:false,
				url:'shaft_parameters2.txt',
				dataType:"text",
				success:function(msg){
					rs= msg.split("\r\n");
				}
			})
			$.ajax({
				async:false,
				url:'mode_shape2.txt',
				dataType:"text",
				success:function(msg){
					ls= msg.split("\r\n");
				}
			})
			
			var y=-60;
			var mat;
			var k=-1;
			for (var i = 0; i < rs.length-1; i++) {
				var p=rs[i].split("	");
				var r=parseFloat(p[1])*0.002;
				var h=parseFloat(p[2])*0.005;
				var z=0;
				var x=0;
				y+=h/2;
				//ls[i]= i/rs.length;
				ls[i]=ls[i].split("         ")[1]*1;
				//ls[i]=(ls[i]+0.845842003822327)/1.845842003822327;
				l=ls[i];
				arr.push(y);
				arr.push(10);
				arr.push(l);
				if(p[3]!=k){
					if(p[3]!='undefined' && p[3]!=null){
						k=p[3];
					}
					mat= createMat('img/'+k+'.jpg')
				}
				cylinderArr.push(cylinder(r,h,z,x,y,mat));
				lineArr.push(line(y,0,0,y,10,l,0x00FF00,0x00FF00));
				
			}
	    }
	    
	    
	    
	    
	    function createMat(path){
	    	var texture =new THREE.ImageUtils.loadTexture(path);
		    var cylinderMat = new THREE.MeshPhongMaterial({
	    		//创建材料 
	    		map:texture,
	    		wireframe:false 
	    	});
		    return cylinderMat;
	    }
	    //创建圆柱体
	    function cylinder(r,h,z,x,y,mat){ 
	    	//创建圆柱体 
	    	var cylinderGeo = new THREE.CylinderGeometry(r, r ,h ,40 ,40);
	    	 
	    	//创建圆柱体网格模型 
	    	var cylinderMesh = new THREE.Mesh(cylinderGeo, mat); 
	    	cylinderMesh.rotation.x=90*Math.PI/180;
	    	//cylinderMesh.rotation.z=30*Math.PI/180;
	    	//设置圆柱坐标
	    	cylinderMesh.position.set(z, x, y);
	    	scene.add(cylinderMesh);//向场景添加
	    	return cylinderGeo;
	    }
	    //线
	    function line(x1,y1,z1,x2,y2,z2,c1,c2){
	    	var geometry = new THREE.Geometry({verticesNeedUpdate:true});
            var material = new THREE.LineBasicMaterial( { vertexColors: true } );
            var color1 = new THREE.Color( c1 ), color2 = new THREE.Color( c2 );

            // 线的材质由2点的颜色决定
            var p1 = new THREE.Vector3( z1, y1, x1);
            var p2 = new THREE.Vector3( z2, y2, x2 );
            geometry.vertices.push(p1);
            geometry.vertices.push(p2);
            geometry.colors.push( color1, color2 );
            var line = new THREE.Line( geometry, material, THREE.LinePieces );
            scene.add(line);
            return line;
	    }
	    //顶端连接线
	    function linetwo(){
	    	for (var i = 0; i < lineArr.length-1; i++) {
				lineArrtwo[i].geometry.vertices[0].x=lineArr[i].geometry.vertices[1].x;
				lineArrtwo[i].geometry.vertices[0].y=lineArr[i].geometry.vertices[1].y;
				lineArrtwo[i].geometry.vertices[0].z=lineArr[i].geometry.vertices[1].z;
				lineArrtwo[i].geometry.vertices[1].x=lineArr[i+1].geometry.vertices[1].x;
				lineArrtwo[i].geometry.vertices[1].y=lineArr[i+1].geometry.vertices[1].y;
				lineArrtwo[i].geometry.vertices[1].z=lineArr[i+1].geometry.vertices[1].z;
				lineArrtwo[i].geometry.verticesNeedUpdate=true;
			}
	    }
	    //渲染 
	    function render(){ renderer.render(scene, camera); }
	    function animate() {
	    	
	    		requestAnimationFrame( animate );
	    	
	    	for (var i = 0; i < lineArr.length; i++) {
				var y1=10; //lineArr[i].geometry.vertices[1].y;
				lineArr[i].geometry.vertices[1].x=y1*Math.sin(num[j]*ls[i]*(Math.PI/180));
				lineArr[i].geometry.vertices[1].y=y1*Math.cos(num[j]*ls[i]*(Math.PI/180));
				lineArr[i].geometry.verticesNeedUpdate=true;
			}
	    	
	    	linetwo();
	    	
	    	if((j+n)==num.length || (j+n)<0){
	    		n=n*-1;
	    	}
	    	j=j+n;  
			
			controls.update();
			renderer.render( scene, camera );
		}
</script>
</head>

<body onload="main();">
	<div id="canvas-frame"></div>
</body>
</html>
