function Prop(setting){
    this.obj=setting.obj;
    this.bilici=100;
}
Prop.prototype={
	
    rect:function(){
    	$('#height label').html('高度:  '+this.fixed(this.obj.height*this.bilici)+'  微米');
    	$('#width label').html('宽度:  '+this.fixed(this.obj.width*this.bilici)+'  微米');
    	$('#girth label').html('周长:  '+this.fixed((this.obj.height+this.obj.width)*2*this.bilici)+'  微米');
    	$('#area label').html('面积:  '+this.fixed(this.obj.height*this.obj.width*this.bilici*this.bilici)+'  平方微米');
    },
    line:function(){
    	$('#height label').html('高度:  '+this.fixed(this.obj.height*this.bilici)+'  微米');
    	$('#width label').html('宽度:  '+this.fixed(this.obj.width*this.bilici)+'  微米');
    	$('#girth label').html('周长:  '+this.fixed(Math.sqrt(Math.pow(this.obj.height,2)+Math.pow(this.obj.width,2))*this.bilici)+'  微米');
    },
    curv:function(){
    	console.info(this.obj.propType);
    },
    elli:function(){
    	var sr=this.obj.rx>this.obj.ry?this.obj.ry:this.obj.rx;
    	var lr=this.obj.rx<this.obj.ry?this.obj.ry:this.obj.rx;
    	var area=Math.PI*sr*lr;
    	var pmtLen=2*Math.PI*sr+4*(lr-sr);
	    $('#height label').html('高度:  '+this.fixed(this.obj.height*this.bilici)+'  微米');
    	$('#width label').html('宽度:  '+this.fixed(this.obj.width*this.bilici)+'  微米');
    	$('#girth label').html('周长:  '+this.fixed(pmtLen)+'  微米');
    	$('#area label').html('面积:  '+this.fixed(area)+'  平方微米');
    },
    roun:function(){
    	$('#width label').html('半径:  '+this.fixed(this.obj.radius*this.bilici)+'  微米');
    	$('#girth label').html('周长:  '+this.fixed((this.obj.height+this.obj.width)*2*this.bilici)+'  微米');
    	$('#area label').html('面积:  '+this.fixed(Math.PI*Math.pow(this.obj.radius*this.bilici,2))+'  平方微米');
    },
    poly:function(){
    	var l= this.borderLength(this.obj.points[0].x,this.obj.points[0].y,this.obj.points[1].x,this.obj.points[1].y);
    	var n=this.obj.points.length;
    	var area= (n*l*l*Math.sin(Math.PI*2/n))/(4*(1-Math.cos(Math.PI*2/n)));
    	$('#height label').html('高度:  '+this.fixed(this.obj.height*this.bilici)+'  微米');
    	$('#width label').html('宽度:  '+this.fixed(this.obj.width*this.bilici)+'  微米');
    	$('#girth label').html('周长:  '+this.fixed(l*n*this.bilici)+'  微米');
    	$('#area label').html('面积:  '+this.fixed(area)+'  平方微米');
    },
    loca:function(){
    },
    angp:function(){
    	var x1=this.obj._objects[1].left,x2=this.obj._objects[3].left,x3=this.obj._objects[4].left;
    	var y1=this.obj._objects[1].top,y2=this.obj._objects[3].top,y3=this.obj._objects[4].top;
    	$('#girth label').html('边长:  '+this.borderLength(x1,y1,x2,y2)+'  微米');
    	$('#area label').html('角度:  '+this.fixed(this.calAngle(x1,y1,x2,y2,x3,y3)*180/Math.PI)+'  度');
    },
    arcp1:function(){
    	var x1=this.obj._objects[0].path[0][1],x2=this.obj._objects[0].path[1][1],x3=this.obj._objects[0].path[1][3];
    	var y1=this.obj._objects[0].path[0][2],y2=this.obj._objects[0].path[1][2],y3=this.obj._objects[0].path[1][4];
    	$('#height label').html('高度:  '+this.obj.height*this.bilici+'  微米');
    	$('#width label').html('宽度:  '+this.obj.width*this.bilici+'  微米');
    	$('#girth label').html('周长:  '+this.bezierCurveLen(x1,y1,x2,y2,x3,y3)+'  微米');
    },
    arcp:function(){
    	console.info(this.obj);
    	var x1=this.obj._objects[1].left,y1=this.obj._objects[1].top,x2=this.obj._objects[2].left,y2=this.obj._objects[2].top,x3=this.obj._objects[3].left,y3=this.obj._objects[3].top
        var prop=this.getCircleProp(x1,y1,x2,y2,x3,y3);
        var ang= (this.obj._objects[0].endAngle-this.obj._objects[0].startAngle)*180/Math.PI;
        if(this.obj._objects[0].endAngle<this.obj._objects[0].startAngle){
            ang=((this.obj._objects[0].endAngle+Math.PI*2)-this.obj._objects[0].startAngle)*180/Math.PI;
        }
    	$('#width label').html('圆心角:  '+ang+'  度');
    	$('#girth label').html('弧长:  '+(ang/360)*2*Math.PI*prop.radius+'  微米');
    	
    },
    roup:function(){
	    $('#height label').html('半径:  '+this.fixed(this.obj._objects[0].radius*this.bilici)+'  微米');
    	$('#girth label').html('周长:  '+this.fixed(this.obj._objects[0].radius*2*Math.PI*this.bilici)+'  微米');
    	$('#area label').html('面积:  '+this.fixed(Math.PI*Math.pow(this.obj._objects[0].radius*this.bilici,2))+'  平方微米');
    },
    curp:function(){
    	$('#height label').html('高度:  '+this.obj.height*this.bilici+'  微米');
    	$('#width label').html('宽度:  '+this.obj.width*this.bilici+'  微米');
    	$('#girth label').html('周长:  '+(this.obj.height+this.obj.width)*2*this.bilici+'  微米');
    	$('#area label').html('面积:  '+this.obj.height*this.obj.width*this.bilici*this.bilici+'  平方微米');
    },
    fixed:function(num){
        return num.toFixed(2);
    },
    borderLength:function(x1,y1,x2,y2){
       return this.fixed(Math.sqrt(Math.pow(y2-y1,2)+Math.pow(x2-x1,2)));
    },
    calAngle:function(x1,y1,x2,y2,x3,y3){
       var borderA=this.borderLength(x1,y1,x2,y2);
       var borderB=this.borderLength(x2,y2,x3,y3);
       var borderC=this.borderLength(x1,y1,x3,y3);
       var C= Math.acos((Math.pow(borderA,2)+Math.pow(borderB,2)-Math.pow(borderC,2))/(2*borderA*borderB));
       return C;
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
    bezierCurveLen:function(x1,y1,x2,y2,x3,y3){
       var ax=x1-2*x2+x3;
       var ay=y1-2*y2+y3;
       var bx=2*(x2-x1);
       var by=2*(y2-y1);
       var A=4*(Math.pow(ax,2)+Math.pow(ay,2));
       var B=4*(ax*bx+ay*by);
       var C=Math.pow(bx,2)+Math.pow(by,2);
       //var Sabc = 2 * Math.sqrt(A + B + C);
       var A_32 = Math.pow(A,1.5);
       //var A_32 = 2 * A * A_2;
       var C_2 = 2 * Math.sqrt(C);
       var AC_2=Math.sqrt(A*C);
       var ABC_2=Math.sqrt(A+B+C);
       var l1=2*Math.sqrt(A)*(2*A*ABC_2+B*(ABC_2-Math.sqrt(C)));
       var l2=(Math.pow(B,2)-4*A*C);
       var n_1=Math.log(Math.abs(B-2*Math.sqrt(A*C)));
       var n_2=Math.log(Math.abs(B-2*A-2*Math.sqrt(A)*ABC_2));
       var l3=n_1-n_2;
       return (1/(8*A_32))*(l1+l2*(l3));
       //var BA = B / A_2;
       //return (A_32 * Sabc + A_2 * B * (Sabc - C_2) + (4 * C * A - B * B) * Math.log((2 * A_2 + BA + Sabc) / (BA + C_2))) / (4 * A_32);
       
    }
    
   
}