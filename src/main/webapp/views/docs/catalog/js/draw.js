/**
 * Created by 赵青山 on 2018/03/16.
 */
function Draw(obj,setting){
    this.obj=obj;
    //this.color=setting.color||"#0000ff";
    //this.width=setting.width||"1";
    this.lineW=setting.linew;
    this.polyN=setting.n;
    this.color=setting.color;
    this.type=setting.type;
    fabric.Object.prototype.selectable=true;
    fabric.Object.prototype.lockMovementX=true;
    fabric.Object.prototype.lockMovementY=true;
    fabric.Object.prototype.objectCaching=false;
    fabric.Object.prototype.cornerColor='#C2B7DA';
    fabric.Object.prototype.cornerSize=13;
    fabric.Object.prototype.cornerStyle='circle';
    //fabric.Object.prototype.originX = 'center';
    //fabric.Object.prototype.originY = 'center';
    fabric.Object.prototype.fill=null;
    fabric.Object.prototype.overlayFill=null;
    fabric.Object.prototype.transparentCorners=false;
    fabric.Object.prototype.hasBorders= false;
    fabric.Object.prototype.padding=0;
    fabric.Object.prototype.paintFirst='stroke';
    //根据像素选择
    fabric.Object.prototype.perPixelTargetFind=true;
}
Draw.prototype={
    init:function(){
        this.obj.strokeStyle=this.color;
        this.obj.fillStyle=this.color;
        this.obj.lineWidth=this.width;
    },
    zoom:function(){
    	return this.obj.viewport.getZoom(true);
    },
    openSeadPoint:function(){
        return this.obj.viewport.viewportToWindowCoordinates(new OpenSeadragon.Point(0, 0));
    },
    initrect:function(canvas,groupPostil,Postil,i,pointArr){
    	var zoom= this.zoom();
    	var x1=pointArr[0].x;
    	var y1=pointArr[0].y;
        Postil=new fabric.Rect({
	                  left: x1,
	                  top:  y1,
	                  stroke:this.color,
	                  strokeWidth:this.lineW/zoom,
	                  borderOpacityWhenMoving:1,
	                  width: 0,
	                  height: 0
	                });
	    Postil=this.setCorners(Postil,false,true,false,true,false,true,false,true,true);
	    return this.setState(Postil,true,false);
    },
    rect:function(canvas,groupPostil,Postil,i,pointArr,x2,y2){
    	var zoom= this.zoom();
    	var l=x1=pointArr[0].x;
    	var t=y1=pointArr[0].y;
    	if(x2<x1){
    	   l=x2;
    	}
    	if(y2<y1){
    	   t=y2;
    	}
    	var w= Math.abs((x2-x1));
    	var h= Math.abs((y2-y1));
        Postil.set({'top':t,'left':l,'width':w,'height':h});
    },
    initline:function(canvas,groupPostil,Postil,i,pointArr){
        var zoom= this.zoom();
        var x1=pointArr[0].x;
    	var y1=pointArr[0].y;
        Postil=new fabric.Line([x1,y1,x1,y1],
                {
                 stroke: this.color,
                 strokeWidth: this.lineW/zoom
	            });
	    Postil=this.setCorners(Postil,true,false,false,false,true,false,false,false,true);
	    return this.setState(Postil,true,false);
    },
    line:function(canvas,groupPostil,Postil,i,pointArr,x2,y2){
    	var zoom= this.zoom();
    	Postil.set({'x2':x2,'y2':y2});
    },
    initcurv:function(canvas,groupPostil,Postil,i,pointArr){
    },
    curv:function(canvas,groupPostil,Postil,i,pointArr,x2,y2){
    },
    initelli:function(canvas,groupPostil,Postil,i,pointArr){
	    var zoom= this.zoom();
	    var x1=pointArr[0].x;
    	var y1=pointArr[0].y;
        Postil=new fabric.Ellipse({
	       left: x1,
           top:  y1,
           rx:0,
           ry:0,
           stroke:this.color,
           strokeWidth:this.lineW/zoom,
           borderOpacityWhenMoving:1
	    });
	    Postil=this.setCorners(Postil,false,true,false,true,false,true,false,true,true);
	    return this.setState(Postil,true,false);
    },
    elli:function(canvas,groupPostil,Postil,i,pointArr,x2,y2){
	    var zoom= this.zoom();
	    var l=x1=pointArr[0].x;
    	var t=y1=pointArr[0].y;
    	if(x2<x1){
    	   l=x2;
    	}
    	if(y2<y1){
    	   t=y2;
    	}
	    var x= Math.abs(x2-x1)/2;
	    var y= Math.abs(y2-y1)/2;
    	Postil.set({'top':t,'left':l,'rx':x,'ry':y});
    },
    initroun:function(canvas,groupPostil,Postil,i,pointArr){
	    var zoom= this.zoom();
	    var x1=pointArr[0].x;
    	var y1=pointArr[0].y;
        Postil=new fabric.Circle({
	       left: x1,
           top:  y1,
           stroke:this.color,
           strokeWidth:this.lineW/zoom,
           borderOpacityWhenMoving:1,
           lockUniScaling:true,
           radius: 0
	    });
	    Postil=this.setCorners(Postil,false,true,false,true,false,true,false,true,true);
	    return this.setState(Postil,true,false);
    },
    roun:function(canvas,groupPostil,Postil,i,pointArr,x2,y2){
	    var zoom= this.zoom();
	    var l=x1=pointArr[0].x;
    	var t=y1=pointArr[0].y;
    	var prop=this.getCircleCentre(x1,y1,x2,y2);
    	var r=this.getCircleRadii(x1,y1,x2,y2);
    	l=prop.x-r;
    	t=prop.y-r;
	    //var radius= Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))/2;
    	Postil.set({'left':l,'top':t,'radius':r});
    },
    initpoly:function(canvas,groupPostil,Postil,i,pointArr){
    	var zoom= this.zoom();
    	var x1=pointArr[0].x;
    	var y1=pointArr[0].y;
    	var points=new Array();
    	for (var i = 0; i < this.polyN; i++) {
    		points.push({x:x1+i*0.01,y:y1+i*0.01});
    	}
    	Postil = new fabric.Polygon(points, {
		    stroke:this.color,
            strokeWidth:this.lineW/zoom,
            borderOpacityWhenMoving:1
		});
		Postil=this.setCorners(Postil,false,true,false,true,false,true,false,true,true);
		return this.setState(Postil,true,false);
    },
    poly:function(canvas,groupPostil,Postil,i,pointArr,x2,y2){
    	var zoom= this.zoom();
    	var x1=pointArr[0].x;
    	var y1=pointArr[0].y;
        var r=this.getCircleRadii(x1,y1,x2,y2);
        var points=new Array();
        for (var i = 0; i <this.polyN; i++) {
        	points.push({x:x1+(r*Math.cos(Math.PI/2+(i*2*Math.PI/this.polyN))),y:y1+(r*Math.sin(Math.PI/2+(i*2*Math.PI/this.polyN)))});
        }
        Postil.set({'points':points,'width':r*2,'height':r*2});
    },
    initloca:function(canvas,groupPostil,Postil,i,pointArr){
    	var zoom= this.zoom();
    	var x1=pointArr[0].x;
    	var y1=pointArr[0].y;
    	var maxZoom=gitMaxZoom();
    	var prop={};
		fabric.Image.fromURL('../catalog/images/make_loca1.png', function(img){
			
			
	    	prop.linewState=false;
	    	prop.sizeState=true; 
	    	prop.propType='loca';
	    	//prop.x=x1;
	    	//prop.y=(y1-15/zoom);
	    	img.prop=prop;
	    	img.originX = 'center';
	    	img.originY = 'bottom';
	    	img.setControlVisible('tl',false);
		    img.setControlVisible('ml',false);
		    img.setControlVisible('bl',false);
		    img.setControlVisible('mb',false);
		    img.setControlVisible('br',false);
		    img.setControlVisible('mr',false);
		    img.setControlVisible('tr',false);
		    img.setControlVisible('mt',false);
		    img.setControlVisible('mtr',false);
			canvas.add(img.set({ left: x1, top: y1-1/zoom,width:30/zoom,height:30/zoom}));
		    //Postil=img;
		});
		this.reset(canvas);
		
	    return null;
    },
    loca:function(canvas,groupPostil,Postil,i,pointArr,x2,y2){
    },
    initangp:function(canvas,groupPostil,Postil,i,pointArr){
    	var zoom= this.zoom();
    	var lineType='angp';
    	var line1=null;
    	var line2=null;
    	var line3=null;
    	var x1=pointArr[i].x;
    	var y1=pointArr[i].y;
    	switch (i){
    	   case 0:{
    	   	  groupPostil = this.makeGroup(x1,y1,'left','top');
    	      canvas.add(this.setState(groupPostil,true,false));
    	      line2=this.setState(this.makeLine(canvas,Postil,i,x1,y1),true,false);
    	      Postil=this.setState(this.makeCircle(x1,y1,line1,line2,line3,lineType),false,true);
    	      break;
    	   };
    	   case 1:{
    	   	  line1=groupPostil.item(0);
    	      line2= this.setState(this.makeLine(canvas,Postil,i,x1,y1),true,false);
    	      //canvas.add(this.setState(line2,true,false));
    	      Postil= this.setState(this.makeCircle(x1,y1,line1,line2,line3,lineType),false,true);
    	      break;
    	   };
    	   case 2:{
    	      line1=groupPostil.item(2);
    	      Postil= this.setState(this.makeCircle(x1,y1,line1,line2,line3,lineType),false,true);
    	      this.reset(canvas);
    	      break;
    	   };
    	   default:{
    	   	  Postil=null;
    	      break;
    	   }
    	}
    	this.addGroupItem(groupPostil,line2,x1,y1);
    	//groupPostil.addWithUpdate(line2);
    	this.addGroupItem(groupPostil,Postil,x1,y1);
    	//groupPostil.addWithUpdate(Postil);
    	
	    return groupPostil;
	    //return this.setState(Postil,false,true);
    },
    angp:function(canvas,groupPostil,Postil,i,pointArr,x2,y2){
    	var x=pointArr[i-1].x;//groupPostil.item(2*i-1).xp;
    	var y=pointArr[i-1].y;
    	switch (i){
    	   case 1:{
    	   	  groupPostil.item(0).set({'x1':x-groupPostil.left,'y1':y-groupPostil.top,'x2':x2-groupPostil.left,'y2':y2-groupPostil.top});
    	      break;
    	   };
    	   case 2:{
    	      groupPostil.item(2).set({'x1':x-groupPostil.left,'y1':y-groupPostil.top,'x2':x2-groupPostil.left,'y2':y2-groupPostil.top});
    	      break;
    	   };
    	   default:{
    	      break;
    	   }
    	}
    },
    initarcp1:function(canvas,groupPostil,Postil,i,pointArr){
    	var zoom= this.zoom();
    	var lineType='arcp1';
    	var line1=null;
    	var line2=null;
    	var line3=null;
    	var x1=pointArr[i].x;
    	var y1=pointArr[i].y;
    	switch (i){
    	   case 0:{
    	   	  groupPostil = this.makeGroup(x1,y1,'left','top');
    	   	  this.setState(groupPostil,true,false);
    	      canvas.add(groupPostil.set({'originX':'left','originY':'top'}));
    	   	  line1= new fabric.Path('M 0 0 Q 1, 1, 2, 2',{stroke: this.color,strokeWidth: this.lineW/zoom,selectable: false});
    	   	  line1.path[0][1]=x1-groupPostil.left;
    	   	  line1.path[0][2]=y1-groupPostil.top;
    	   	  line1.path[1][1]=x1-groupPostil.left;
    	   	  line1.path[1][2]=y1-groupPostil.top;
    	   	  line1.path[1][3]=x1-groupPostil.left;
    	   	  line1.path[1][4]=y1-groupPostil.top;
    	   	  this.addGroupItem(groupPostil,this.setState(line1,true,false),null,null);
    	      Postil= this.makeCircle(x1,y1,line1,line2,line3,lineType);
    	      break;
    	   };
    	   case 1:{
    	   	  line2=groupPostil.item(0);
    	      Postil= this.makeCircle(x1,y1,line1,line2,line3,lineType);
    	      break;
    	   };
    	   case 2:{
    	      line3=groupPostil.item(0);
    	      Postil= this.makeCircle(x1,y1,line1,line2,line3,lineType);
    	      this.reset(canvas);
    	      break;
    	   };
    	   default:{
    	   	  Postil=null;
    	      break;
    	   }
    	}
    	if(Postil){
    	   this.addGroupItem(groupPostil,this.setState(Postil,false,true),null,null);
    	}
	    return groupPostil;
    },
    arcp1:function(canvas,groupPostil,Postil,i,pointArr,x2,y2){
    	var zoom= this.zoom();
    	switch (i){
    	   case 1:{
    	   	    groupPostil.item(0).path[0][1]=pointArr[0].x;
		    	groupPostil.item(0).path[0][2]=pointArr[0].y;
    	   	    groupPostil.item(0).path[1][1]=x2;
		    	groupPostil.item(0).path[1][2]=y2;
		    	groupPostil.item(0).path[1][3]=x2;
		    	groupPostil.item(0).path[1][4]=y2;
    	      break;
    	   };
    	   case 2:{
    	   	    groupPostil.item(0).path[1][3]=x2;
	    	    groupPostil.item(0).path[1][4]=y2;
    	      break;
    	   };
    	   default:{
    	   	  Postil=null;
    	      break;
    	   }
    	}
    	//console.info(groupPostil.left);
	    	    //console.info(groupPostil.top);
    },
    initarcp:function(canvas,groupPostil,Postil,i,pointArr){
    	var zoom= this.zoom();
    	var lineType='arcp';
    	var line1=null;
    	var line2=null;
    	var line3=null;
    	switch (i){
    	   case 0:{
    	   	  groupPostil = this.makeGroup(x1,y1,'center','center');
    	      canvas.add(this.setState(groupPostil,true,false));
    	   	  var x1=pointArr[0].x;
    	   	  var y1=pointArr[0].y;
    	   	  line1=new fabric.Circle({
			       left: x1,
		           top:  y1,
		           stroke:this.color,
		           strokeWidth:this.lineW/zoom,
		           borderOpacityWhenMoving:1,
		           lockUniScaling:true,
		           selectable: false,
		           originX:'center',
		           originY:'center',
		           radius: 0,
				   startAngle:0,
				   endAngle: 0
			  });
			  this.addGroupItem(groupPostil,this.setState(line1,true,false),x1,y1);
    	   	  //canvas.add(this.setState(line1,true,false));
    	      Postil= this.makeCircle(x1,y1,line1,line2,line3,lineType);
    	      Postil.sort=0;
    	      break;
    	   };
    	   case 1:{
    	   	  line1=groupPostil.item(0);
    	   	  var x1=pointArr[0].x;
    	   	  var y1=pointArr[0].y;
    	   	  var x2=pointArr[1].x;
    	   	  var y2=pointArr[1].y;
    	   	  var prop= this.calAng(x1,y1,x1,y1,x2,y2);
    	   	  //line1.set({'left':prop.cx,'top':prop.cy,'radius':prop.radius,'startAngle':prop.begin,'endAngle':prop.end});
    	      Postil= this.makeCircle(x2,y2,line1,line2,line3,lineType);
    	      Postil.sort=1;
    	      break;
    	   };
    	   case 2:{
    	      line1=groupPostil.item(0);
    	      var x1=pointArr[0].x;
    	   	  var y1=pointArr[0].y;
    	   	  var x2=pointArr[1].x;
    	   	  var y2=pointArr[1].y;
    	   	  var x3=pointArr[2].x;
    	   	  var y3=pointArr[2].y;
    	   	  var prop= this.calAng(x1,y1,x2,y2,x3,y3);
    	   	  //line1.set({'left':prop.cx,'top':prop.cy,'radius':prop.radius,'startAngle':prop.begin,'endAngle':prop.end});
    	      line1.controlPoints=pointArr;
    	      Postil= this.makeCircle(x3,y3,line1,line2,line3,lineType);
    	      Postil.sort=2;
    	      this.reset(canvas);
    	      break;
    	   };
    	   default:{
    	   	  Postil=null;
    	      break;
    	   }
    	}
    	if(Postil){
    	   this.addGroupItem(groupPostil,this.setState(Postil,false,true),pointArr[i].x,pointArr[i].y);
    	}
	    return groupPostil;
    },
    arcp:function(canvas,groupPostil,Postil,i,pointArr,x2,y2,ex,ey){
    	var zoom= this.zoom();
	    var prop=null;
	    switch (i){
    	   case 1:{
    	   	  prop= this.calAng(pointArr[0].x,pointArr[0].y,pointArr[0].x+1,pointArr[0].y-1,x2,y2);
    	      break;
    	   };
    	   case 2:{
    	   	  prop= this.calAng(pointArr[0].x,pointArr[0].y,pointArr[1].x,pointArr[1].y,x2,y2);
    	      break;
    	   };
    	   default:{
    	   	  Postil=null;
    	      break;
    	   }
    	}
    	if(prop){
    		  groupPostil.item(0).set({'left':prop.cx-groupPostil.left,'top':prop.cy-groupPostil.top,'radius':prop.radius,'startAngle':prop.begin,'endAngle':prop.end});
    	}
    	
    },
    initroup:function(canvas,groupPostil,Postil,i,pointArr){
    	var zoom= this.zoom();
    	var lineType='roup';
    	var line1=null;
    	var line2=null;
    	var line3=null;
    	switch (i){
    	   case 0:{
    	   	  groupPostil = this.makeGroup(x1,y1,'center','center');
    	      canvas.add(this.setState(groupPostil,true,false));
    	   	  var x1=pointArr[0].x;
    	   	  var y1=pointArr[0].y;
    	   	  line1=new fabric.Circle({
			       left: x1,
		           top:  y1,
		           stroke:this.color,
		           strokeWidth:this.lineW/zoom,
		           borderOpacityWhenMoving:1,
		           originX:'center',
		           originY:'center',
		           lockUniScaling:true,
		           selectable: false,
		           radius: 0
			  });
			  this.addGroupItem(groupPostil,this.setState(line1,true,false),x1,y1);
    	   	  //canvas.add(this.setState(line1,true,false));
    	      Postil= this.makeCircle(x1,y1,line1,line2,line3,lineType);
    	      Postil.sort=0;
    	      break;
    	   };
    	   case 1:{
    	   	  line1=groupPostil.item(0);
    	   	  var x1=pointArr[0].x;
    	   	  var y1=pointArr[0].y;
    	   	  var x2=pointArr[1].x;
    	   	  var y2=pointArr[1].y;
    	   	  var circleProp= this.getCircleProp(x1,y1,x2,y2,x1,y1);
    	   	  //line1.set({'left':circleProp.cx,'top':circleProp.cy,'radius':circleProp.radius});
    	      Postil= this.makeCircle(x2,y2,line1,line2,line3,lineType);
    	      Postil.sort=1;
    	      break;
    	   };
    	   case 2:{
    	      line1=groupPostil.item(0);
    	      var x1=pointArr[0].x;
    	   	  var y1=pointArr[0].y;
    	   	  var x2=pointArr[1].x;
    	   	  var y2=pointArr[1].y;
    	   	  var x3=pointArr[2].x;
    	   	  var y3=pointArr[2].y;
    	   	  var circleProp= this.getCircleProp(x1,y1,x2,y2,x3,y3);
    	   	  //line1.set({'left':circleProp.cx,'top':circleProp.cy,'radius':circleProp.radius});
    	      line1.controlPoints=pointArr;
    	      Postil= this.makeCircle(x3,y3,line1,line2,line3,lineType);
    	      Postil.sort=2;
    	      this.reset(canvas);
    	      break;
    	   };
    	   default:{
    	   	  Postil=null;
    	      break;
    	   }
    	}
    	if(Postil){
    	   this.addGroupItem(groupPostil,this.setState(Postil,false,true),pointArr[i].x,pointArr[i].y);
    	}
	    return groupPostil;
    },
    roup:function(canvas,groupPostil,Postil,i,pointArr,x2,y2){
	    var zoom= this.zoom();
	    var circleProp=null;
	    switch (i){
    	   case 1:{
    	   	  circleProp= this.getCircleProp(pointArr[0].x,pointArr[0].y,x2,y2,pointArr[0].x,pointArr[0].y);
    	      break;
    	   };
    	   case 2:{
    	   	  circleProp= this.getCircleProp(pointArr[0].x,pointArr[0].y,pointArr[1].x,pointArr[1].y,x2,y2);
    	      break;
    	   };
    	   default:{
    	   	  Postil=null;
    	      break;
    	   }
    	}
    	if(circleProp){
    		  groupPostil.item(0).set({'left':circleProp.cx-groupPostil.left,'top':circleProp.cy-groupPostil.top,'radius':circleProp.radius});
    	}
    },
    initcurp:function(canvas,groupPostil,Postil,i,pointArr){
    	var zoom= this.zoom();
    	var x1=pointArr[i].x;
    	var y1=pointArr[i].y;
    	var lineType='curp';
    	var line1=null;
    	var line2=null;
    	var line3=null;
    	if(i>0){
    		var j= groupPostil.size()-2;
    	    line1=groupPostil.item(j).line2;
    	}else{
    		groupPostil = this.makeGroup(x1,y1,'center','center');
    	    canvas.add(this.setState(groupPostil,true,false));
    	}
    	line2=this.setState(this.makeLine(canvas,Postil,i,x1,y1),true,false);
    	Postil= this.setState(this.makeCircle(x1,y1,line1,line2,line3,lineType),false,true);
    	if(i>2){
    	    var x= Math.abs(x1-pointArr[0].x)*zoom;
    	    var y= Math.abs(y1-pointArr[0].y)*zoom;
    	    if(x<10 && y<10){
    	    	var j= groupPostil.size()-1;
    	    	groupPostil.item(j).line2.set({'x2':pointArr[0].x-groupPostil.left,'y2':pointArr[0].y-groupPostil.top});
    	        groupPostil.item(2).line1=groupPostil.item(j).line2;
    	        groupPostil.item(1).bringToFront();
    	        canvas.renderAll();
    	        return null;
    	    }
    	}
    	groupPostil.addWithUpdate(line2);
    	groupPostil.addWithUpdate(Postil);
    	
	    return groupPostil;
    },
    curp:function(canvas,groupPostil,Postil,i,pointArr,x2,y2){
    	var x=pointArr[i-1].x;//groupPostil.item(2*i-1).xp;
    	var y=pointArr[i-1].y;//groupPostil.item(2*i-1).yp;
    	groupPostil.item(2*i-1).set({'left':x-groupPostil.left,'top':y-groupPostil.top});
    	groupPostil.item(2*i-1).line2.set({'x1':x-groupPostil.left,'y1':y-groupPostil.top,'x2':x2-groupPostil.left,'y2':y2-groupPostil.top});
    },
    calAng:function(x1,y1,x2,y2,x3,y3){
        var prop= this.getCircleProp(x1,y1,x2,y2,x3,y3);
        var A= this.cal(x1-prop.cx,y1-prop.cy);
        var B= this.cal(x2-prop.cx,y2-prop.cy);
        var C= this.cal(x3-prop.cx,y3-prop.cy);
        var D=0;
        A<B && D++;
        A<C && D++;
        B<C && D++;
        if(D%2==0){
           prop['begin']=C;
           prop['end']=A;
        }else{
           prop['begin']=A;
	       prop['end']=C;
        }
	    return prop;
    },
    cal:function(x,y){
    	var a;
    	if(x>0 && y>=0){
    	    a=Math.atan(y/x);
    	}
    	else if(x>0 && y<=0){
    	    a=2*Math.PI+Math.atan(y/x);
    	}
    	else if(x<0){
    		a=Math.PI+Math.atan(y/x);
    	}
    	else if(x==0 && y>=0){
    	    a=Math.PI/2;
    	}
    	else if(x==0 && y<0){
    	    a=3*Math.PI/2;
    	}
         return a;
    },
    addGroupItem:function(g,i,x,y) {
	    g.addWithUpdate(i);
	    x && g.item(g.size()-1).set({'left':x-g.left,'top':y-g.top});
    },
    setCorners:function(p,tl,ml,bl,mb,br,mr,tr,mt,mtr) {
	    p.setControlVisible('tl',tl);
	    p.setControlVisible('ml',ml);
	    p.setControlVisible('bl',bl);
	    p.setControlVisible('mb',mb);
	    p.setControlVisible('br',br);
	    p.setControlVisible('mr',mr);
	    p.setControlVisible('tr',tr);
	    p.setControlVisible('mt',mt);
	    p.setControlVisible('mtr',mtr);
	    return p;
    },
    makeGroup:function(left, top,originx,originy) {
	    var g = new fabric.Group([],{
		      left: left,
		      top: top,
		      radius: 1,
		      lockMovementX:true,
		      lockMovementY:true,
		      originX:originx,
		      originY:originy
	    });
	    this.setCorners(g,false,false,false,false,false,false,false,false,false);
	    g.typeProp='group';
	    return g;
    },
    makeCircle:function(left, top, line1,line2,line3,type) {
    	/**
    	 *  myObject.sendBackwards()
			myObject.sendToBack()
			myObject.bringForward()
			myObject.bringToFront()
    	 */
    	var zoom= this.zoom();
	    var c = new fabric.Circle({
		      left: left,
		      top: top,
		      radius: 6/zoom,
		      fill: '#C2B7DA',
		      strokeWidth: 0,
		      originX:'center',
		      originY:'center'
	    });
		var prop={};
		prop.linewState=true;
		prop.sizeState=true; 
		prop.lineW=this.lineW;
		prop.propType=type;
		c.prop=prop;
	    //c.originX = 'center';
	    //c.originY = 'left';
	    c.hasControls = c.hasBorders = false;
	    c.line1 = line1;
	    c.line2 = line2;
	    c.line3 = line3;
	    c.lineType=type;
	    return c;
    },
    //根据过直径两点计算圆心
    getCircleCentre:function(x1,y1,x2,y2){
        var prop={};
        prop.x=(x1+x2)*0.5;
        prop.y=(y1+y2)*0.5;
        return prop;
    },
    //根据过直径两点计算半径
    getCircleRadii:function(x1,y1,x2,y2){
        var r= 0.5*Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
        return r;
    },
    getCircleProp:function(x1,y1,x2,y2,x3,y3) {
    	var A1, A2, B1, B2, C1, C2, temp,cx,cy,radius;  
    	var prop={};
	    A1 = x1 - x2;  
	    B1 = y1 - y2;  
	    C1 = (Math.pow(x1, 2) - Math.pow(x2, 2) + Math.pow(y1, 2) - Math.pow(y2, 2))/2;  
	    A2 = x3 - x2;  
	    B2 = y3 - y2;  
	    C2 = (Math.pow(x3, 2) - Math.pow(x2, 2) + Math.pow(y3, 2) - Math.pow(y2, 2))/2;  
	    
	    temp = A1*B2 - A2*B1;  
	    //判断三点是否共线  
	    if (temp == 0){  
	        cx = x1+(x2-x1)/2;  
	        cy = y1+(y2-y1)/2; 
	    }else{  
	        //不共线则求出圆心：  
	        cx = (C1*B2 - C2*B1) / temp;  
	        cy = (A1*C2 - A2*C1) / temp;  
	    }  
	      //求出半径  
	    radius = Math.sqrt(Math.pow((cx - x1),2) + Math.pow((cy - y1),2));  
	    prop['cx']=cx;
	    prop['cy']=cy;
	    prop['radius']=radius;
	    return prop;
    },
    makeLine:function(canvas,Postil,i,x1,y1) {
	    var zoom= this.zoom();
        Postil=new fabric.Line([x1,y1,x1,y1],
                {
                 stroke: this.color,
                 strokeWidth: this.lineW/zoom,
                 selectable: true
	            });
	    return Postil;
    },
    setXY:function(p,x,y){
    	if(p!=null){
    	  p.xp=x;
    	  p.yp=y; 
    	}
    	return p;
    },
    setState:function(p,w,s){
    	if(p!=null){
    	  var prop={};
    	  p.linewState=w;
    	  p.sizeState=s; 
    	  p.lineW=this.lineW;
    	  prop.linewState=w;
    	  prop.sizeState=s; 
    	  prop.lineW=this.lineW;
    	  prop.propType=this.type;
    	  prop.serialization=false;
    	  p.prop=prop;
    	}
    	return p;
    },
    reset:function(canvas){
    	this.obj.outerTracker.setTracking(false);
        canvas.isDrawingMode=false;
        this.obj.setMouseNavEnabled(true);
    },
    pen:function(x,y,x1,y1){
        this.init();
        this.obj.save();
        this.obj.lineCap="round";
        this.obj.lineTo(x1,y1);
        this.obj.stroke();
        this.obj.restore();
    },
    eraser:function(x,y,x1,y1){
        this.obj.lineCap="round";
        this.obj.clearRect(x1-5,y1-5,10,10);
    },
    cut:function(x,y,x1,y1){
        this.init();
        this.obj.save();
        this.obj.setLineDash([4,2]);
        this.obj.beginPath();
        this.obj.lineWidth=1;
        this.obj.rect(x,y,x1-x,y1-y);
        this.obj.stroke();
        this.obj.restore();
    }
}