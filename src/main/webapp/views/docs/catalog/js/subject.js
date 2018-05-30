$(function(){
	var treeObj = $("#cataLogzTree");
	$.ajax({
		async:false,
		url:WEB_ROOT+'/olo/subject!doFindCatalogData.do',
		data:{'subNo':getQueryString('subNo')},
		success:function(msg){
			console.info(msg);
			$.fn.zTree.init($('#cataLogzTree'),setting,msg);
			var zTree_Menu = $.fn.zTree.getZTreeObj("cataLogzTree");
			var curMenu = zTree_Menu.getNodes()[0].children[0];
			zTree_Menu.selectNode(curMenu);
			treeObj.hover(function () {
				if (!treeObj.hasClass("showIcon")) {
					treeObj.addClass("showIcon");
				}
			}, function() {
				treeObj.removeClass("showIcon");
			});
		}
	})
})
//ztree配置
var setting={
	async:{
		enable: true,
		url:WEB_ROOT+'/olo/subject!doFindSliceData.do',
		autoParam:["ID"]
	},
	data:{
		keep:{
			leaf:true,
			parent: true
		},
		key:{
			name:'NAME'
		},
		simpleData:{
			enable:true,
			idKey:'ID',
			pIdKey:'PID',
			rootPId:'0'
		}
	},
	view:{
	    selectMulti:false,//表示禁止多选
		showLine: false,
		showIcon: false,
		dblClickExpand: false,
		addDiyDom: addDiyDom
	},
	callback:{
		onNodeCreated: zTreeOnNodeCreated,
		beforeExpand:zTreeBeforeExpand,
		beforeClick: beforeClick,
		onClick:zTreeonClick
	}
	
}
function zTreeBeforeExpand(treeId, treeNode){
	if(treeNode.level!=0){
		var treeObj = $.fn.zTree.getZTreeObj("cataLogzTree");
		treeObj.reAsyncChildNodes(treeNode, "refresh");
	}
}
function zTreeOnNodeCreated(event, treeId, treeNode){
	
	    var treeObj = $.fn.zTree.getZTreeObj("cataLogzTree");
	    treeObj.expandNode(treeNode, true,false, true, true);
	    var bl=true;
	    if(treeNode.level==2){
	    	bl=false;
	    }
	    treeNode.isParent=bl;
	    treeObj.updateNode(treeNode);
}
function getQueryString(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]);  
        return null;  
    } 

function addDiyDom(treeId, treeNode) {
	var spaceWidth = 5;
	var switchObj = $("#" + treeNode.tId + "_switch"),
	icoObj = $("#" + treeNode.tId + "_ico");
	switchObj.remove();
	icoObj.before(switchObj);

	if (treeNode.level > 1) {
		var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
		switchObj.before(spaceStr);
	}
}

function beforeClick(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("cataLogzTree");
	zTree.expandNode(treeNode,null,false,true,true);
	return true;
}
function zTreeonClick(event,treeId, treeNode) {
	if(treeNode.ID>=100000){
		console.info(treeNode);
		window.open(WEB_ROOT+'/views/docs/catalog/slice.jsp?sliceNo='+treeNode.ID);
	}
	return true;
}
