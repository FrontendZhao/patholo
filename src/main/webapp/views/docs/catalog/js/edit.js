var myeditor;

var n=0;
$(function(){
    myeditor= CKEDITOR.replace('editor1');
})
function initModal(){
	
	findUser();
	console.info(selObject);
	
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
	  	    	 console.info(msg);
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
                console.log(data);
             }
        })
		console.log($("#inputfileImg").get(0).files[0]);
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
    	   
    	   window.open(WEB_ROOT+"/views/users/login.jsp","_blank");
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
	
	var zoom= viewer.viewport.getZoom(true);
	
	var postil=selObject.toObject(); //JSON.stringify(canvas);
	
	console.info(JSON.stringify(postil));
	
	var noteBL= $('#switchID').prop("checked");
	
	console.info(noteBL);
	
    if(postil!='undefined' && postil!=''){
    
    	 /* $.ajax({
    	     url:WEB_ROOT+'/olo/subject!doSavePostil.do',
    	     data:{'postil':JSON.stringify(postil),'sliceNo':sliceinfo.ID,'noteBL':noteBL},
    	     contentType: 'application/json',
    	     dataType:'json',
    	     success:function(success){
    	        console.info(success);
    	     }
    	     
    	 }) */
    	OnSave();
    	 
    }
	canvas.renderAll();
}
function OnSave(){
	if(CKEDITOR.instances.editor1.getData()==""){
	    alert("内容不能为空！");
	    return false;
	}else {
		var data=CKEDITOR.instances.editor1.getData();
		$.ajax({
			 type:'post',
	   	     url:WEB_ROOT+'/olo/subject!doSaveCkeditop.do',
	   	     data:{'postil':data}
	   	 })
	    console.info(CKEDITOR.instances.editor1.getData());
	}
}
