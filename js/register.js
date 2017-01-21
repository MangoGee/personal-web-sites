var oRegPwdInp = document.getElementById('register-pwd');
var oRegComfirePwdInp = document.getElementById('register-comfirepwd');
var oRegBox = document.getElementsByClassName('loginbox')[0];
var arrRegInpNodes = new Array();
for (var i = 0; i < oRegBox.childNodes.length; i++) {
	if (oRegBox.childNodes[i].nodeType!=3) {
		arrRegInpNodes.push(oRegBox.childNodes[i]);
	}
}
oRegPwdInp.onfocus = function () {
	arrRegInpNodes[0].className = 'eyes-closing';
	arrRegInpNodes[1].style.display = 'none';
	arrRegInpNodes[2].style.display = 'none';
}
oRegPwdInp.onblur = function () {
	arrRegInpNodes[0].className = 'eyes-opening';
	arrRegInpNodes[1].style.display = 'block';
	arrRegInpNodes[2].style.display = 'block';
}
oRegComfirePwdInp.onfocus = function () {
	arrRegInpNodes[0].className = 'eyes-closing';
	arrRegInpNodes[1].style.display = 'none';
	arrRegInpNodes[2].style.display = 'none';
}
oRegComfirePwdInp.onblur = function () {
	arrRegInpNodes[0].className = 'eyes-opening';
	arrRegInpNodes[1].style.display = 'block';
	arrRegInpNodes[2].style.display = 'block';
}

var oRegisterBtn = document.getElementById('register');
oRegisterBtn.onclick = function () {
	var oRegAccInp = document.getElementById('register-email');
	var oRegPwdInp = document.getElementById('register-pwd');
	var oRegComfirePwdInp = document.getElementById('register-comfirepwd');

	var account = oRegAccInp.value.trim();
	var password = oRegPwdInp.value.trim();
	var comfirePwd = oRegComfirePwdInp.value.trim();
	if (account=='' || password=='' || comfirePwd=='') {
		Tools.alert('请正确输入邮箱和密码', 'error');
		return false;
	}
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if (!reg.test(account)) {
		Tools.alert('邮箱格式错误', 'error');
		return false;
	}
	if (password.length<6) {
		Tools.alert('密码不少于6位', 'error');
		return false;
	}
	if (!(password==comfirePwd)) {
		Tools.alert('密码与确认密码不一致', 'error');
		return false;
	}

    Tools.ajax({
        url: "register.php",              //请求地址
        type: "POST",                       //请求方式
        data: { "email": account, "password": password, "comfirePwd": comfirePwd },        //请求参数
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