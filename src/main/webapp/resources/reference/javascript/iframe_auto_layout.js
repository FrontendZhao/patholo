/*iframe高度自适应*/
function resize(idSelector){ 
	var iframe = document.getElementById();
	try{
		var height = 0;
		var ifBody = iframe.contentWindow.document.body;
		if(ifBody){
		    height = iframe.contentWindow.document.body.offsetHeight;
		}else{
		    height = iframe.contentWindow.document.documentElement.scrollHeight;
		}
		iframe.height =  height;
	}catch (ex){
		console.info("iframe_auto_layout.js>>>>resize()"+ex)
	}
} 

/*iframe高度时时变化*/
function resizeIframe(idSelector) {
    var iframe = document.getElementById(idSelector);
 	try{
		var ifBody = iframe.contentWindow.document.body;
		if(!ifBody){
		    iframe.height =  500;
		}
		setInterval(function(){
			resize(idSelector);
		}, 10);
	}catch (ex){
		console.info("iframe_auto_layout.js>>>>resizeIframe()"+ex)
	}
	$(top.window).scrollTop(0);
}