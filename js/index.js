(function () {
    var oUsername = document.getElementById('username');
    var oLogOut = document.getElementById('logout');
    var isLogin = false;
    Tools.ajax({
        url: 'login/logininfo.php',              //请求地址
        type: 'get',                       //请求方式
        data: {},        //请求参数
        dataType: 'json',
        success: function (response, xml) {
            // 此处放成功后执行的代码
            var success = response.success;
            var oMenu = document.getElementsByClassName('dropdown-menu')[0];
            var arrLiNodes = new Array();
            for (var i = 0; i < oMenu.childNodes.length; i++) {
                if (oMenu.childNodes[i].nodeType!=3) {
                    arrLiNodes.push(oMenu.childNodes[i]);
                }
            }
            if (!success) {
                arrLiNodes[0].style.display = 'block';
                var detail = response.detail;
            	Tools.confirm(detail, function () {
            		window.location.href = 'login/login.html';
            	});
            	return false;
            } else {
                for (var i = 0; i < arrLiNodes.length; i++) {
                    arrLiNodes[i].style.display = 'block';
                }
                var username = response.user;
                oUsername.innerHTML = username;
                oLogOut.style.display = 'block';
                isLogin = true;

            }

        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
    });

    oUsername.onclick = function () {
        if (!isLogin) {
            window.location.href = 'login/login.html';
        } else {

        }
    }

    oLogOut.onclick = function () {
        var detail = '确定注销登录吗'
        Tools.confirm(detail, function () {
            if (!isLogin) {
                return false;
            }
            Tools.ajax({
                url: 'login/login.php',
                type: 'get',
                data: {'isLogOut': true},
                dataType: 'json',
                success: function (response, xml) {
                    var success = response.success;
                    if (success) {
                        var detail = response.detail;
                        Tools.alert(detail, 'success', function () {
                            location.reload();
                        });
                    }
                }
            });
        });
    }

})()