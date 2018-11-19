var myeditor;

var n=0;
$(function(){
    myeditor= CKEDITOR.replace('editor1');
})
function initModal(){
	
	findUser();
	//console.info(selObject);
	
	 $('#editColorPicker').colorpicker({
		container:true,
		color:selObject.stroke
	});
	 selObject.lineW && $('#strokeW').val(selObject.lineW);
	 selObject.prop && $('#propType').val(selObject.prop.propType);

	$('#yingyong').click(function(){
		var zoom= viewer.viewport.getZoom(true);
		var linew=$('#strokeW').val();
		var color=$('#editColor').val();
		selObject.set({'strokeWidth':linew/zoom,'stroke':color});
		selObject.lineW=linew;
		canvas.renderAll();
		
	}); 
	$('#textTitleID').click(function(){
		$.ajax({
			 async:true,
	  	     url:WEB_ROOT+'/olo/subject!doloadCkeditop.do',
	  	     contentType: 'application/json',
	  	     success:function(msg){
	  	    	 
	  	    	 if(msg!=null){
	  	    		myeditor.setData(msg);
	  	    	 }
	  	     }
	  	     
	  	 })
	})
	$('#inputfileImg').change(function(msg){
		//fd.append("upfile", $("#inputfileImg").get(0).files[0]);//上传的文件file
        $.ajax({
             url: WEB_ROOT+'/olo/subject!doUploadFile.do',
             type: "POST",
             processData: false,
             contentType: false,
             data: {'upfile':$("#inputfileImg").get(0).files[0]},
             success: function(data) {
                //console.log(data);
             }
        })
		//console.log($("#inputfileImg").get(0).files[0]);
	})
	
	$('#save').click(function(){
		var da=null;
		$.ajax({
			async:false,
            url: WEB_ROOT+'/olo/subject!doLoginBL.do',
            type: "POST",
            success: function(data) {
                if(data){
                	
                	da=data;
                	
                	savePostil();
                	
                }else{
                	
                	
                }
            }
       })
       if(da==null){
    	   
    	   window.open(WEB_ROOT+"/views/users/login.jsp?pageid=book","_blank");
       }
		
	})
	if(n==2){
		$('#switchID').removeAttr("disabled");
	}
	$('#switchID').change(function(){
		
		if($(this).prop("checked")){
			
			$('#videoTitle').css('display', 'block');
		}else{
			$('#videoTitle').css('display', 'none');
		}
	})
	
	var prop=new Prop({'obj':selObject});
    prop[selObject.prop.propType]();
}
function findUser(){
	$.ajax({
		async:false,
        url: WEB_ROOT+'/olo/subject!doLoginUser.do',
        type: "POST",
        success: function(data) {
            n=data;
        }
   })
}
function savePostil(){
	
	var openSeadHeight=$('#openSeadragon').height();
	
	var zoom= viewer.viewport.getZoom(true);
	//console.info(selObject);
	var postil=selObject.toObject(); //JSON.stringify(canvas);
	//console.info(postil);
	postil= setAbsPostil(postil);
	
	var noteBL= $('#switchID').prop("checked");
	
    if(postil!='undefined' && postil!=''){
    
    //console.info(JSON.stringify(postil));//$.parseJSON( jsonstr );
	/*$.ajax({
	     url:WEB_ROOT+'/olo/subject!doSavePostil.do',
	     data:{'postil':JSON.stringify(postil),'sliceNo':1076,'noteBL':noteBL},
	     contentType: 'application/json',
	     dataType:'json',
	     success:function(success){
	        //console.info(success);
	     }
	     
	 })*/
    	OnSave();
    	 
    }
	canvas.renderAll();
}
function OnSave(){
	if(CKEDITOR.instances.editor1.getData()==""){
	    //alert("内容不能为空！");
	    return false;
	}else {
		var data=CKEDITOR.instances.editor1.getData();
		$.ajax({
			 type:'post',
	   	     url:WEB_ROOT+'/olo/subject!doSaveCkeditop.do',
	   	     data:{'postil':data}
	   	 })
	    //console.info(CKEDITOR.instances.editor1.getData());
	}
}
function setAbsPostil(postil){
    console.info(selObject);
		console.info(postil);
	var maxZoom=gitMaxZoom();
	
	var prop={};
	
	prop.propType=selObject.prop.propType;
	
	prop.linewState=selObject.prop.linewState;
	
    prop.sizeState=selObject.prop.sizeState;; 
    
    prop.lineW=selObject.prop.lineW;
    
    prop.top=postil.top*maxZoom;
    
    prop.left=postil.left*maxZoom;
    
    prop.width=postil.width*maxZoom;
	
	prop.height=postil.height*maxZoom;
	
	if(prop.propType=='rect'){
	
		
	}
	if(prop.propType=='line'){
	
		prop.x1=postil.x1*maxZoom;
		
		prop.y1=postil.y1*maxZoom;
		
		prop.x2=postil.x2*maxZoom;
		
		prop.y2=postil.y2*maxZoom;
	}
	if(prop.propType=='curv'){
	
		
	}
	if(prop.propType=='elli'){
	
		prop.rx=postil.rx*maxZoom;
		
		prop.ry=postil.ry*maxZoom;
	}
	if(prop.propType=='roun'){
	
		prop.radius=postil.radius*maxZoom;
	}
	if(prop.propType=='poly'){
	
		var points=[]; 
		
		for (var i = 0; i < postil.points.length; i++) {
			
			points.push({'x':postil.points[i].x*maxZoom,'y':postil.points[i].y*maxZoom})
		} 
		prop.points=points;
		
	}
	if(prop.propType=='loca'){
	
		console.info(2222);
		
	}
	if(prop.propType=='angp'){
	
		console.info(selObject);
		console.info(postil);
	}
	if(prop.propType=='arcp1'){
	
		
	}
	if(prop.propType=='arcp'){
	
		if(!prop.serialization){
		   postil=selObject.item(0).toObject();
		}
		
		prop.radius=postil.radius*maxZoom;
	}
	if(prop.propType=='roup'){
	
		
	}
	if(prop.propType=='curp'){
	
		
	}
	
	postil.prop=prop;
	
	
	//console.info(selObject);
	
	//console.info(postil);
	
	return postil;
}
function gitMaxZoom(){
	var maxZoom=0;
	var openSeadHeight=$('#openSeadragon').height();
	var openSeadWidth=$('#openSeadragon').width();
    if(sliceinfo.WIDTH>=sliceinfo.HEIGHT){
        maxZoom=sliceinfo.WIDTH/openSeadWidth;
    }else if(sliceinfo.WIDTH<sliceinfo.HEIGHT){
        maxZoom=sliceinfo.HEIGHT/openSeadHeight;
    }else{
        maxZoom=0;
    }
    return maxZoom
}
