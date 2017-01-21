var oLogPwdInp = document.getElementById('login-pwd');
var oLoginBox = document.getElementsByClassName('loginbox')[0];
var arrLogInpNodes = new Array();
for (var i = 0; i < oLoginBox.childNodes.length; i++) {
	if (oLoginBox.childNodes[i].nodeType!=3) {
		arrLogInpNodes.push(oLoginBox.childNodes[i]);
	}
}
oLogPwdInp.onfocus = function () {
	arrLogInpNodes[0].className = 'eyes-closing';
	arrLogInpNodes[1].style.display = 'none';
	arrLogInpNodes[2].style.display = 'none';
}
oLogPwdInp.onblur = function () {
	arrLogInpNodes[0].className = 'eyes-opening';
	arrLogInpNodes[1].style.display = 'block';
	arrLogInpNodes[2].style.display = 'block';
}

var oSignInBtn = document.getElementById('signin');
oSignInBtn.onclick = function () {
	var oLogAccInp = document.getElementById('login-email');
	var oLogPwdInp = document.getElementById('login-pwd');
	var oLogRemCheckbox = document.getElementById('remember');

	var account = oLogAccInp.value.trim();
	var password = oLogPwdInp.value.trim();
	if (account=='' || password=='') {
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

    Tools.ajax({
        url: "login.php",              //请求地址
        type: "POST",                       //请求方式
        data: { "email": account, "password": password },        //请求参数
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
            		window.location.href = "../home.html";
            	});
            	// var result = response.result[0];
            }

        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
    });

}
