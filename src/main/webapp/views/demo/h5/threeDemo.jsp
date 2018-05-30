<!DOCTYPE html>
<html>
	<head>
		<title>demo</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
	</head>

	<body>

		<script src="three.js-master/build/three.js"></script>

		<script src="three.js-master/build/inflate.min.js"></script>
		<script src="three.js-master/build/FBXLoader.js"></script>

		<script src="three.js-master/build/OrbitControls.js"></script>

		<script src="three.js-master/build/Detector.js"></script>
		<script src="three.js-master/build/stats.min.js"></script>

		<script>

			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var container, stats, controls;
			var camera, scene, renderer, light;

			var clock = new THREE.Clock();

			var mixers = [];
			var obj=null;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.set( 100, 200, 300 );

				controls = new THREE.OrbitControls( camera );
				controls.target.set( 0, 100, 0 );
				controls.update();

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xa0a0a0 );
				scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

				light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				light.position.set( 0, 4000, 0 );
				scene.add( light );

				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 80, 80 );
				light.castShadow = true;
				light.shadow.camera.top = 180;
				light.shadow.camera.bottom = -100;
				light.shadow.camera.left = -120;
				light.shadow.camera.right = 120;
				scene.add( light );
				


				var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				scene.add( mesh );

				var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
				grid.material.opacity = 0.2;
				grid.material.transparent = true;
				scene.add( grid );

				
				var loader = new THREE.FBXLoader();
				// 引入模型文件
				loader.load( 'utils/Samba Dancing.fbx', function ( object ) {

					object.mixer = new THREE.AnimationMixer( object );
					mixers.push( object.mixer );

					var action = object.mixer.clipAction( object.animations[ 0 ] );
					action.play();

					object.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;

						}

					} );
					obj=object;

					scene.add( object );

				} );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				container.appendChild( renderer.domElement );

				window.addEventListener( 'resize', onWindowResize, false );

				// stats
				stats = new Stats();
				container.appendChild( stats.dom );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				console.info(obj);
				//此出控制局部旋转效果
				obj.children[0].children[1].children[1].rotation.y+=0.1;  
				obj.children[0].children[3].rotation.y+=0.1;  

				 /* if ( mixers.length > 0 ) {

					for ( var i = 0; i < mixers.length; i ++ ) {

						mixers[ i ].update( clock.getDelta() );

					}

				}  */

				renderer.render( scene, camera );

				stats.update();

			}
			function stop() {

				obj.children[0].children[1].children[1].rotation.y+=0;  
				obj.children[0].children[3].rotation.y+=0;  

			}
			function begin() {

				obj.children[0].children[1].children[1].children[1].children[1].rotation.y+=0.1;  
				obj.children[0].children[3].rotation.y+=0.1;  

			}

		</script>
		  <div style="width: 100px;height:100px;"></div>
	      <a id="stop" onclick="stop()">暂停</a>
	      <a id="begin" onclick="begin()">开始</a>
	</body>
</html>
