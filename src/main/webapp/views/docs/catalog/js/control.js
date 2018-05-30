/**
 * Created by 赵青山 on 2018/03/16.
 */
function Control(obj){
    var zoom= obj.viewport.getZoom(true);
    this.obj=obj;
    /*if(setting){
        var c = new fabric.Circle({
	      left: setting.left/zoom,
	      top: setting.top/zoom,
	      radius: 5/zoom,
	      fill: '#C2B7DA',
	      strokeWidth: 0
	    });
	    c.hasControls = c.hasBorders = false;
	    this=c;
	    this.line1 = setting.line1;
	    this.line2 = setting.line2;
	    this.line3 = setting.line3;
	    this.lineType=setting.type;
    }*/
}
Control.prototype={
    zoom:function(){
    	return this.obj.viewport.getZoom(true);
    },
    openSeadPoint:function(){
        return this.obj.viewport.viewportToWindowCoordinates(new OpenSeadragon.Point(0, 0));
    },
    angp:function(Postil){
	    	Postil.line1 && Postil.line1.set({ 'x2': Postil.left, 'y2': Postil.top });
	    	Postil.line2 && Postil.line2.set({ 'x1': Postil.left, 'y1': Postil.top });
	    	Postil.line3 && Postil.line3.set({ 'x1': Postil.left, 'y1': Postil.top });
    },
    arcp1:function(Postil){
			Postil.line1 && (Postil.line1.path[0][1]=Postil.left);
			Postil.line1 && (Postil.line1.path[0][2]=Postil.top);
			Postil.line2 && (Postil.line2.path[1][1]=Postil.left);
			Postil.line2 && (Postil.line2.path[1][2]=Postil.top);
			Postil.line3 && (Postil.line3.path[1][3]=Postil.left);
			Postil.line3 && (Postil.line3.path[1][4]=Postil.top);
    },
    arcp:function(Postil){
    	  var zoom= this.zoom();
	   	  var pointArr= Postil.line1.controlPoints;
	   	  pointArr[Postil.sort].x=Postil.left;
	   	  pointArr[Postil.sort].y=Postil.top;
	   	  var x1=pointArr[0].x;
	   	  var y1=pointArr[0].y;
	   	  var x2=pointArr[1].x;
	   	  var y2=pointArr[1].y;
	   	  var x3=pointArr[2].x;
	   	  var y3=pointArr[2].y;
	   	  var prop= this.calAng(x1,y1,x2,y2,x3,y3);
	   	  Postil.line1.set({'left':prop.cx,'top':prop.cy,'radius':prop.radius,'startAngle':prop.begin,'endAngle':prop.end});
    },
    roup:function(Postil){
    	  var zoom= this.zoom();
	   	  var pointArr= Postil.line1.controlPoints;
	   	  pointArr[Postil.sort].x=Postil.left;
	   	  pointArr[Postil.sort].y=Postil.top;
	   	  var x1=pointArr[0].x;
	   	  var y1=pointArr[0].y;
	   	  var x2=pointArr[1].x;
	   	  var y2=pointArr[1].y;
	   	  var x3=pointArr[2].x;
	   	  var y3=pointArr[2].y;
	   	  var circleProp= this.getCircleProp(x1,y1,x2,y2,x3,y3);
	   	  Postil.line1.set({'left':circleProp.cx,'top':circleProp.cy,'radius':circleProp.radius});
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
    }
}