var oFgPwdInp = document.getElementById('forget-pwd');
var oFgComfirePwdInp = document.getElementById('forget-comfirepwd');
var oFgBox = document.getElementsByClassName('loginbox')[0];
var oActInp = document.getElementById('input-activation');
var oActBtn = document.getElementById('btn-activation');
var oForgetBtn = document.getElementById('forget');
var arrFgInpNodes = new Array();
for (var i = 0; i < oFgBox.childNodes.length; i++) {
	if (oFgBox.childNodes[i].nodeType!=3) {
		arrFgInpNodes.push(oFgBox.childNodes[i]);
	}
}
oFgPwdInp.onfocus = function () {
	arrFgInpNodes[0].className = 'eyes-closing';
	arrFgInpNodes[1].style.display = 'none';
	arrFgInpNodes[2].style.display = 'none';
}
oFgPwdInp.onblur = function () {
	arrFgInpNodes[0].className = 'eyes-opening';
	arrFgInpNodes[1].style.display = 'block';
	arrFgInpNodes[2].style.display = 'block';
}
oFgComfirePwdInp.onfocus = function () {
	arrFgInpNodes[0].className = 'eyes-closing';
	arrFgInpNodes[1].style.display = 'none';
	arrFgInpNodes[2].style.display = 'none';
}
oFgComfirePwdInp.onblur = function () {
	arrFgInpNodes[0].className = 'eyes-opening';
	arrFgInpNodes[1].style.display = 'block';
	arrFgInpNodes[2].style.display = 'block';
}

oForgetBtn.onclick = function () {
	var oFgAccInp = document.getElementById('forget-email');
	var oFgPwdInp = document.getElementById('forget-pwd');
	var oFgComfirePwdInp = document.getElementById('forget-comfirepwd');
	var oActInp = document.getElementById('input-activation');

	var account = oFgAccInp.value.trim();
	var password = oFgPwdInp.value.trim();
	var comfirePwd = oFgComfirePwdInp.value.trim();
	var activation = oActInp.value.trim();
	if (account=='' || password=='' || comfirePwd=='' || activation=='') {
		Tools.alert('请正确输入信息', 'error');
		return false;
	}
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if (!reg.test(account)) {
		Tools.alert('邮箱格式错误', 'error');
		return false;
	}
	if (password.length<6) {
		Tools.alert('新密码应不少于6位', 'error');
		return false;
	}
	if (!(password==comfirePwd)) {
		Tools.alert('新密码与其确认密码不一致', 'error');
		return false;
	}
    Tools.ajax({
        url: "forget.php",              //请求地址
        type: "POST",                       //请求方式
        data: { "email": account, "password": password, "comfirePwd": comfirePwd, "actCode": activation},        //请求参数
        dataType: "json",
        success: function (response, xml) {
            // 此处放成功后执行的代码
            var success = response.success;
            var detail = response.detail;
            if (!success) {
            	Tools.alert(detail, 'error');
            	return false;
            } else {
            	Tools.alert(detail, 'success', function () {
            		window.location.href = "login.html";
            	});
            	// var result = response.result[0];
            }

        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
    });
}

oActBtn.onclick = function () {
	var oFgAccInp = document.getElementById('forget-email');

	var account = oFgAccInp.value.trim();
	if (account=='') {
		Tools.alert('请正确输入邮箱', 'error');
		return false;
	}
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if (!reg.test(account)) {
		Tools.alert('邮箱格式错误', 'error');
		return false;
	}

	that = this;
	that.disabled = true;

	Tools.ajax({
        url: "identifying-code.php",              //请求地址
        type: "POST",                       //请求方式
        data: { "email": account, "forget": true},        //请求参数
        dataType: "json",
        success: function (response, xml) {
            // 此处放成功后执行的代码
            var success = response.success;
            var detail = response.detail;
            if (!success) {
            	Tools.alert(detail, 'error');
            	return false;
            } else {
            	Tools.alert(detail, 'success');
            }

        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
	});

	setTimeout(function () {
		that.disabled = false;
	},30000);
}