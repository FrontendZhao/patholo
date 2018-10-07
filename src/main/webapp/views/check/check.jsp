<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@include file="../init/root.jsp" %>
<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="UTF-8">
<title>在线考试</title>

<link href="css/index.css" rel="stylesheet" type="text/css">

<script type="text/javascript" src="js/Questions.js"></script>
<script>
var HH = 0;//时
var mm = 0;//分
var ss = 0;//秒
var timeState = true;//时间状态 默认为true 开启时间
var questions= QuestionJosn;
var itemList=["A","B","C","D","E","F"]
var activeQuestion=0; //当前操作的考题编号
var questioned = 0; //
var checkQues = []; //已做答的题的集合
/*实现计时器*/
var time = setInterval(function () {
    if (timeState) {
        if (HH == 24) HH = 0;
        str = "";
        if (++ss == 60) {
            if (++mm == 60) { HH++; mm = 0; }
            ss = 0;
        }
        str += HH < 10 ? "0" + HH : HH;
        str += ":";
        str += mm < 10 ? "0" + mm : mm;
        str += ":";
        str += ss < 10 ? "0" + ss : ss;
        $(".time").text(str);
    } else {
        $(".time").text(str);
    }
}, 1000);
//展示考卷信息
function showQuestion(id){
	console.info(id);
    $(".questioned").text(id+1);
    questioned = (id+1)/questions.length
    if(activeQuestion!=undefined){
    	if(n==0){
    		$("#ques"+activeQuestion).removeClass("question_id").addClass("active_question_id");
    	}
        
    }
    activeQuestion = id;
    $(".question").find(".question_info").remove();
    var question = questions[id];
    $(".question_title").html("<strong>第 "+(id+1)+" 题 、</strong>"+question.questionTitle);
    var items = question.questionItems.split(";");
    var item="";
    for(var i=0;i<items.length;i++){
        item ="<li class='question_info' onclick='clickTrim(this)' id='item"
                +i+"'><input type='radio' name='item' value='"+itemList[i]+"'>&nbsp;"+itemList[i]+"."+items[i]+"</li>";
        $(".question").append(item);
        if(n==1){
        	$(".question").find("input").attr("disabled",true);
        }
    }
    $(".question").attr("id","question"+id);
    if(n==0){
    	$("#ques"+id).removeClass("active_question_id").addClass("question_id");
    }
    
    for(var i=0;i<checkQues.length;i++){
        if(checkQues[i].id==id){
        	
            $("#"+checkQues[i].item).find("input").prop("checked","checked");
            $("#"+checkQues[i].item).addClass("clickTrim");
            if(n==0){
            	$("#ques"+activeQuestion).removeClass("question_id").addClass("clickQue");
            }
            if(n==1){
            	if(checkQues[i].bl){
            		$("#"+checkQues[i].item).removeClass("errorTrim").addClass("clickTrim");
            	}else{
            		$("#"+checkQues[i].item).removeClass("clickTrim").addClass("errorTrim");
            	}
            	
            }
        }
        
    }
    progress();
    
    doLoadOpenseadPNG(id);
    
    doLoadAnalysis(id);
}

/*答题卡*/
function answerCard(){
    $(".question_sum").text(questions.length);
    for(var i=0;i<questions.length;i++){
        var questionId ="<li id='ques"+i+"'onclick='saveQuestionState("+i+")' class='questionId'>"+(i+1)+"</li>";
        $("#answerCard ul").append(questionId);
    }
}

/*选中考题*/
var Question;
function clickTrim(source){
    var id = source.id;
    if(n==0){
    	$("#"+id).find("input").prop("checked","checked");
        
        $("#"+id).addClass("clickTrim");
        $("#ques"+activeQuestion).removeClass("question_id").addClass("clickQue");
    
    
    var ques =0;
    for(var i=0;i<checkQues.length;i++){
       if( checkQues[i].id==activeQuestion&&checkQues[i].item!=id){
           ques = checkQues[i].id;
           checkQues[i].item = id;//获取当前考题的选项ID
           checkQues[i].answer =$("#"+id).find("input[name=item]:checked").val();//获取当前考题的选项值
       }
    }
    if(checkQues.length==0||Question!=activeQuestion&&activeQuestion!=ques){
        var check ={};
        check.id=activeQuestion;//获取当前考题的编号
        check.item = id;//获取当前考题的选项ID
        check.answer =$("#"+id).find("input[name=item]:checked").val();//获取当前考题的选项值
        checkQues.push(check);
    }
    $(".question_info").each(function(){
        var otherId =$(this).attr("id");
        if(otherId!=id){
            $("#"+otherId).find("input").prop("checked",false);
            $("#"+otherId).removeClass("clickTrim");
        }
    })
    Question = activeQuestion;
    }
}

/*设置进度条*/
function progress(){
    var prog = ($(".active_question_id").length+1)/questions.length;
    var pro = $(".progress").parent().width() * prog;
    $(".progres").text((prog*100).toString().substr(0,5)+"%")
    $(".progress").animate({
        width: pro,
        opacity: 0.5
    }, 1000);
}

/*保存考题状态 已做答的状态*/
function saveQuestionState(clickId){
    showQuestion(clickId)
}

$(function(){
    $(".middle-top-left").width($(".middle-top").width()-$(".middle-top-right").width())
    $(".progress-left").width($(".middle-top-left").width()-200);
    progress();
    answerCard();
    showQuestion(0);
    /*alert(QuestionJosn.length);*/
    /*实现进度条信息加载的动画*/
    var str = '';
    /*开启或者停止时间*/
    $(".time-stop").click(function () {
        timeState = false;
        $(this).hide();
        $(".time-start").show();
    });
    $(".time-start").click(function () {
        timeState = true;
        $(this).hide();
        $(".time-stop").show();
    });

    /*收藏按钮的切换*/
    /* $("#unHeart").click(function(){
        $(this).hide();
        $("#heart").show();
    })
    $("#heart").click(function(){
        $(this).hide();
        $("#unHeart").show();
    }) */

    /*答题卡的切换*/
    $("#openCard").click(function(){
        $("#closeCard").show();
        $("#answerCard").slideDown();
        $(this).hide();
    })
    $("#closeCard").click(function(){
        $("#openCard").show();
        $("#answerCard").slideUp();
        $(this).hide();
    })

    //提交试卷
    $("#submitQuestions").click(function(){
    	n=1;
    	timeState = false;
        $(this).hide();
        $(".time-start").show();
        
        $.each(QuestionJosn,function(i,val){
        	 var id=val.questionId;
        	 var bl=false;
        	 $.each(checkQues,function(j,value){
        		 var l=value.id;
            	 if(id==(l+1)){
            		 
            		 if(val.questionAnswer==value.answer){
            			 console.info(val.questionAnswer+'lll'+value.answer);
            			 bl=true;
            			 value.bl=true;
            		 }else{
            			 bl=false;
            			 value.bl=false;
            		 }
            	 }
            })
                $("#ques"+i).removeClass("active_question_id");
            	$("#ques"+i).removeClass("question_id");
            	$("#ques"+i).removeClass("clickQue");
            if(bl){
            	
            	$("#ques"+i).removeClass("error_question_id").addClass("correct_question_id");
            }else{
            	
            	$("#ques"+i).removeClass("correct_question_id").addClass("error_question_id");
            	//$("#ques"+i).removeClass("correct_question_id").addClass("error_question_id");
            }
            
        })
        showQuestion(0);
        //alert(JSON.stringify(checkQues));
        //alert("已做答:"+($(".clickQue").length)+"道题,还有"+(questions.length-($(".clickQue").length))+"道题未完成");
    })
    //进入下一题
    $("#nextQuestion").click(function(){
        if((activeQuestion+1)!=questions.length) showQuestion(activeQuestion+1);
        showQuestion(activeQuestion)
    })
})
</script>

</head>
<body>

<div>
  <div class="col-md-1"></div>
  <div class="col-md-10">
    <div class="content">
      <!-- <div class="row">
        <div class="btn-group">
          <button class="btn btn-default" type="button" onClick="history.go(-1);">返回上一个页面</button>
          <button class="btn btn-default" type="button" onClick="location.reload()">刷新</button>
        </div>
      </div> -->
     
      <div style="width: 100%;height:70%;display: inline-block;border: 1px solid white;position: relative;margin-top:10px;">
        <div style="width: 100%;">
          <div style="width: 95%;margin: 0px auto">
            <div style="width: 100%;height:100px;border: 1px solid #CCC;border-bottom:none;background:#FFF;">
              <div class="middle-top" style="width: 100%;height: 50px;border-bottom: 1px solid #CCC;background:#2D3339; position:relative;">
                <div class="middle-top-left pull-left"
                                     style="height: 100%;padding-left: 20px;;background:#232C31;color:#FFF;">
                  <div class="text-center pull-left progress-left"
                                         style="border: 1px solid #A2C69A;background:#FFF;border-radius:10px;line-height:20px;height:20px;margin:15px 0px 15px 0px;font-size: 11px;position:relative;">
                    <div class="progress pull-left"
                                             style="background: #609E53;width: 0px;height:18px;position:absolute;left: 0px;"></div>
                    <div class="pro-text" style="left: 0px;color: #609E53;position:absolute;top:0px;width:100%;"> 已完成<span class="progres"></span></div>
                  </div>
                  <div class="pull-left" style=" width:135px;line-height:20px;height:20px;margin:15px;font-size:15px;"> 
                    <!--已做答的数量和考题总数--> 
                    当前第<span class="questioned"></span>题/共<span class="question_sum"></span>题 </div>
                </div>
                <div class="middle-top-right text-center pull-left"
                                     style="width:160px; height: 100%;border-left: 1px solid red;position: absolute;right: 0px;">
                   <div class="stop pull-left" style="width: 50px; height: 100%;padding-top : 10px;color: white;font-size: 20px;"> 
                                                             用时:
                    </div> 
                  <div class="pull-left"  style="width: 100px; height: 100%;padding: 10px 0px 10px 0px;">
                    <div class="time" style="width:100px;height: 30px;line-height:30px; border-radius:15px;font-size:20px;color:#FFF;"> </div>
                  </div>
                </div>
              </div>
              <div style="width: 100%;height: 50px;font-size:15px;color: #000;line-height: 50px;padding-left: 20px;">
                <div style="color:#FFF;background: red;width: 22px;height: 22px;border-radius:11px;line-height:22px;font-size:13px; text-align: center;"
                                     class="glyphicon glyphicon-map-marker"></div>
                [单选题] </div>
            </div>
            <div style="width: 100%;height:auto;display: inline-block;border: 1px solid #CCC;border-bottom:1px dashed #CCC;background:#FFF;">
              <div style="width: 50%;height: 90%;float: left;padding:20px 20px 0px 20px;"> 
                <!--试题区域-->
                <ul class="list-unstyled question" id="" name="">
                  <li class="question_title"></li>
                </ul>
                <!--考题的操作区域-->
                <div class="operation" style="margin-top: 20px;">
                  <div id="unHeart" class="text-left"
                                         style="margin-left:20px;font-size: 15px;float: left;line-height: 30px;">
                    
                    <!-- <div id="heart" style="color:#C40000;display: none;"> <span class="glyphicon glyphicon-heart"></span> <span>已收藏</span> </div> -->
                  </div>
                  <div class="text-right" style="margin-right: 20px;">
                    <div class="form-group" style="color: #FFF;">
                      <button class="btn btn-success" id="submitQuestions">提交试卷</button>
                      <button class="btn btn-info" id="nextQuestion">下一题</button>
                    </div>
                  </div>
                </div>
              </div>
              <div  style="float: right;width: 47%;height: 430px;margin:10px; border: 1px solid;">
                  <div id="openSeadragon" style="width: 100%;height: 100%;"></div>
              </div>
            </div>
            <div style="width: 100%;height:auto;display: inline-block;border: 1px solid #CCC;border-top:none;background:#FFF;">
              <div style="width: 100%;padding:20px;">
                <div class="panel-default">
                  <div class="panel-heading" class="panel-heading" id="closeCard" style="color: #DCE4EC;font-size: 15px;background: none;">
                  <span>收起答题卡</span> <span class="glyphicon glyphicon-chevron-up"></span> </div>
                <div class="panel-heading" id="openCard" style="font-size: 15px;background: none;display: none;"> <span>展开答题卡</span> <span class="glyphicon glyphicon-chevron-down"></span> </div>
                <div id="answerCard" >
                  <div class="panel-body form-horizontal" style="padding: 0px;">
                    <ul class="list-unstyled">
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    
    </div>
  </div>
</div>
<div class="col-md-1"></div>
</div>
<div style="width: 100%;height: auto;display: inline-block;border: 1px solid white;position: fixed;left: 1%;bottom: 1%;">
		<div class="text-center" style="width: 100%;"> <div style="text-align:center;margin:1px 0; font:normal 14px/24px 'MicroSoft YaHei';"><br>
			<p>Copyright © 2018.宏图技术小组.</p>
		</div>
    </div>
    <script src="js/check.js" ></script>
</body>
</html>