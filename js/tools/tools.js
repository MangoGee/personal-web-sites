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


//DOM操作
DealDom = {};

DealDom.getElementsByClassName = function (node, classname) {
    if (node.getElementsByClassName) {
        return node.getElementsByClassName(classname)
    } else {
        var results = new Array();
        var eles = node.getElementsByTagName('*');
        for (var i = 0; i < eles.length; i++) {
            if (eles[i].className.indexOf(classname)!=-1) {
                results[results.length]=eles[i];
            }
        }
        return results;
    }
}

//查看是否存在类
DealDom.hasClass = function (obj, testClass) {
    return !!obj.className.match( new RegExp( "(\\s|^)" + testClass + "(\\s|$)") ); // ( \\s|^ ) 
}

//添加类
DealDom.addClass = function (obj, newClass) {
    if (obj.className) {
        if (!DealDom.hasClass(obj, newClass)) {
            obj.className += ' '+newClass;
        } else {
            obj.className = newClass;
        }
    }
}

//删除类
DealDom.removeClass = function (obj, delClass) {
    var reg = new RegExp('b'+delClass+'b','g');
    if (DealDom.hasClass(obj, delClass)) {
        obj.className = obj.className.replace(new RegExp( "(\\s|^)" + delClass + "(\\s|$)" )," ");
    }
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
    options.contentType = options.contentType || "application/x-www-form-urlencoded";
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
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
        xhr.setRequestHeader("Content-Type", options.contentType);
        xhr.send(params);
    }
}
//uploadAjax方法
Tools.uploadAjax = function(options) {
    options = options || {};
    options.dataType = options.dataType || "json";
    options.contentType = options.contentType || "multipart/form-data";
    var params = options.data;

    //创建 - 非IE6 - 第一步
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
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
    xhr.open("POST", options.url, true);
    //设置表单提交时的内容类型
    xhr.setRequestHeader("Content-Type", options.contentType);
    xhr.send(params);
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

//时间戳转日期
/** 
 * 和PHP一样的时间戳格式化函数 
 * @param {string} format 格式 
 * @param {int} timestamp 要格式化的时间 默认为当前时间 
 * @return {string}   格式化的时间字符串 
 */
Tools.timestamp2Date = function(format, timestamp){ 
    var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date()); 
    var pad = function(n, c){ 
    if((n = n + "").length < c){ 
    return new Array(++c - n.length).join("0") + n; 
    } else { 
    return n; 
    } 
    }; 
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"}; 
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
    var f = { 
    // Day 
    d: function(){return pad(f.j(), 2)}, 
    D: function(){return f.l().substr(0,3)}, 
    j: function(){return jsdate.getDate()}, 
    l: function(){return txt_weekdays[f.w()]}, 
    N: function(){return f.w() + 1}, 
    S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'}, 
    w: function(){return jsdate.getDay()}, 
    z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0}, 

    // Week 
    W: function(){ 
    var a = f.z(), b = 364 + f.L() - a; 
    var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1; 
    if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){ 
    return 1; 
    } else{ 
    if(a <= 2 && nd >= 4 && a >= (6 - nd)){ 
     nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31"); 
     return date("W", Math.round(nd2.getTime()/1000)); 
    } else{ 
     return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0); 
    } 
    } 
    }, 

    // Month 
    F: function(){return txt_months[f.n()]}, 
    m: function(){return pad(f.n(), 2)}, 
    M: function(){return f.F().substr(0,3)}, 
    n: function(){return jsdate.getMonth() + 1}, 
    t: function(){ 
    var n; 
    if( (n = jsdate.getMonth() + 1) == 2 ){ 
    return 28 + f.L(); 
    } else{ 
    if( n & 1 && n < 8 || !(n & 1) && n > 7 ){ 
     return 31; 
    } else{ 
     return 30; 
    } 
    } 
    }, 

    // Year 
    L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0}, 
    //o not supported yet 
    Y: function(){return jsdate.getFullYear()}, 
    y: function(){return (jsdate.getFullYear() + "").slice(2)}, 

    // Time 
    a: function(){return jsdate.getHours() > 11 ? "pm" : "am"}, 
    A: function(){return f.a().toUpperCase()}, 
    B: function(){ 
    // peter paul koch: 
    var off = (jsdate.getTimezoneOffset() + 60)*60; 
    var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off; 
    var beat = Math.floor(theSeconds/86.4); 
    if (beat > 1000) beat -= 1000; 
    if (beat < 0) beat += 1000; 
    if ((String(beat)).length == 1) beat = "00"+beat; 
    if ((String(beat)).length == 2) beat = "0"+beat; 
    return beat; 
    }, 
    g: function(){return jsdate.getHours() % 12 || 12}, 
    G: function(){return jsdate.getHours()}, 
    h: function(){return pad(f.g(), 2)}, 
    H: function(){return pad(jsdate.getHours(), 2)}, 
    i: function(){return pad(jsdate.getMinutes(), 2)}, 
    s: function(){return pad(jsdate.getSeconds(), 2)}, 
    //u not supported yet 

    // Timezone 
    //e not supported yet 
    //I not supported yet 
    O: function(){ 
    var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4); 
    if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t; 
    return t; 
    }, 
    P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))}, 
    //T not supported yet 
    //Z not supported yet 

    // Full Date/Time 
    c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()}, 
    //r not supported yet 
    U: function(){return Math.round(jsdate.getTime()/1000)} 
    }; 

    return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){ 
    if( t!=s ){ 
    // escaped 
    ret = s; 
    } else if( f[s] ){ 
    // a date function exists 
    ret = f[s](); 
    } else{ 
    // nothing special 
    ret = s; 
    } 
    return ret; 
    }); 
}


//区别IE浏览器
Tools.isIE = function () {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
}

//input file 文件上传,控制上传文件大小和格式
Tools.getSubmitFile = function (target) {
    var file = null;
    if (Tools.isIE() && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        file = fileSystem.GetFile(filePath);
    } else {
        file = target.files[0];
    }
    return file;
}
Tools.checkFileSize = function (target, size) {
    var fileSize = 0;
    if (Tools.isIE() && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }
    var currentSize = fileSize / 1024;
    if (currentSize>size) {
        return false;
    } else {
        return true;
    }
}

Tools.checkFileImgFormat = function (target) {
    var fileName = target.value;
    var fileFormat = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
    if (fileFormat !="jpg" && fileFormat !="jpeg" && fileFormat !="png" && fileFormat !="gif") {
        return false;
    } else {
        return true;
    }
}
