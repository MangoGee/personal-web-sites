//字符串去空格
String.prototype.trim=function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
	return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim = function () {
	return this.replace(/(\s*$)/g,"");
}


//工具方法
Tools = {};

Tools.href = "javascript:void(0);";

//弹出alert提示框
Tools.alert = function(message,type,callback){
	swal("", message, type, callback);
};


//弹出Ext提示框后执行fn函数
Tools.alertFn = function(message,fn,icon){
	Tools.alert(message, icon, fn);
};

//弹出Ext确认框
Tools.confirm = function(message,fn){
	swal({
		title: message,
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		closeOnConfirm: false
	},fn);
};

//ajax方法
Tools.ajax = function(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
            	response = JSON.parse(xhr.responseText);
                options.success && options.success(response, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}
//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}