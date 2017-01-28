(function () {
    var user;
    Tools.ajax({
        url: "../login/logininfo.php",              //请求地址
        type: "GET",                       //请求方式
        data: {  },        //请求参数
        dataType: "json",
        success: function (response, xml) {
            // 此处放成功后执行的代码
            var success = response.success;
            var detail = response.detail;
            var row = response.result[0];
            user = row;
            if (!success) {
            	Tools.alert(detail, 'error' , function () {
                    window.location.href = "../login/login.html";
                });
            	return false;
            } 

            dealFormData(row);

        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
    });
	var oUserDiv = document.getElementsByClassName('user')[0];
	var arrIconSpan = oUserDiv.getElementsByClassName('glyphicon');
	for (var i = 0; i < arrIconSpan.length; i++) {
		arrIconSpan[i].index = i;
		arrIconSpan[i].onclick = function () {
			var oUserDiv = document.getElementsByClassName('user')[0];
			var arrIconSpan = oUserDiv.getElementsByClassName('glyphicon');
			var arrContentDiv = oUserDiv.getElementsByClassName('user-content-tab');
			for (var j = 0; j < arrIconSpan.length; j++) {
				DealDom.removeClass(arrIconSpan[j],'active');
				DealDom.removeClass(arrContentDiv[j], 'active');
			}
			DealDom.addClass(arrIconSpan[this.index], 'active');
			DealDom.addClass(arrContentDiv[this.index], 'active');
		}
	}

    var oSaveBtn = document.getElementById('savebtn');
    oSaveBtn.onclick = function() {
        var nickname = document.getElementById('nickname').value.trim();
        var birthday = document.getElementById('birthday').value;
        var telphone = document.getElementById('phone').value.trim();
        var website = document.getElementById('website').value;
        var summary = document.getElementById('summary').value.trim();
        if(telphone&&!(/^1[34578]\d{9}$/.test(telphone))){ 
            Tools.alert("手机号码有误，请重填", 'error');
            return false; 
        } 
        if (birthday&&birthday!='') {
            birthday = Date.parse(new Date(birthday)) / 1000;
        }

        Tools.ajax({
            url: "../mine/mine.php",              //请求地址
            type: "POST",                       //请求方式
            data: { 
                'nickname': nickname,
                'birthday': birthday,
                'telphone': telphone,
                'website': website,
                'summary': summary,
                'birthday': birthday
            },        //请求参数
            dataType: "json",
            success: function (response, xml) {
                // 此处放成功后执行的代码
                var success = response.success;
                var detail = response.detail;
                if (!success) {
                    Tools.alert(detail, 'error');
                    return false;
                } 
                Tools.alert(detail, 'success', function () {
                    location.reload();
                });
            },
            fail: function (status) {
                // 此处放失败后执行的代码
            }
        });

    }

    var oContactBtn = document.getElementById('sendmail');
    oContactBtn.onclick = function () {
        var sender = document.getElementById('sender').value.trim();
        var senderEmail = document.getElementById('sender-mail').value.trim();
        var subject = document.getElementById('subject').value.trim();
        var message = document.getElementById('message').value.trim();
        if (!sender || !senderEmail || !subject || !message) {
            Tools.alert('请填写完整相关信息', 'error');
            return false;
        }
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (!reg.test(senderEmail)) {
            Tools.alert('邮箱格式错误', 'error');
            return false;
        }
        Tools.ajax({
            url: "../mine/mine.php",              //请求地址
            type: "POST",                       //请求方式
            data: { 
                'sendMail': true,
                'sender': sender,
                'senderEmail': senderEmail,
                'subject': subject,
                'message': message
            },        //请求参数
            dataType: "json",
            success: function (response, xml) {
                // 此处放成功后执行的代码
                var success = response.success;
                var detail = response.detail;
                if (!success) {
                    Tools.alert(detail, 'error');
                    return false;
                } 
                Tools.alert(detail, 'success');
            },
            fail: function (status) {
                // 此处放失败后执行的代码
            }
        });
    }

    var oChangeDPBtn = document.getElementById('change_dp');
    oChangeDPBtn.onclick = function () {
        var oDPModal = document.getElementsByClassName('display_photo_upload')[0];
        DealDom.addClass(oDPModal, 'active');
    }

    var oFile = document.getElementById('display_photo_upload');
    oFile.accept = '.gif,.jpeg,.jpg,.png';
    var oUploadBtn = document.getElementById('upload');
    oUploadBtn.onclick = function () {
        var oFile = document.getElementById('display_photo_upload');
        if (!oFile.value) {
            Tools.alert("请选择有效文件", 'error');
            return false;
        }
        if (!Tools.checkFileImgFormat(oFile)) {
            Tools.alert("请选择jpg, png, jpeg, gif的图片格式", 'error');
            return false;
        }
        if (!Tools.checkFileSize(oFile, 1000)) {
            Tools.alert("请选择1MB以内的图片", 'error');
            return false;
        }
        var formdata = new FormData(document.getElementById('dp_form'));
        Tools.uploadAjax({
            url: "../mine/image-upload.php",              //请求地址
            data: formdata,        //请求参数
            dataType: "json",
            // contentType: "application/x-www-form-urlencoded",
            success: function (response, xml) {
                // 此处放成功后执行的代码
                var success = response.success;
                var detail = response.detail;
                if (!success) {
                    Tools.alert(detail, 'error');
                    return false;
                } 
                Tools.alert(detail, 'success');
            },
            fail: function (status) {
                // 此处放失败后执行的代码
            }
        });


    }

    var oCancelBtn = document.getElementById('cancel');
    oCancelBtn.onclick = function () {
        var oDPModal = document.getElementsByClassName('display_photo_upload')[0];
        DealDom.removeClass(oDPModal, 'active');
    }

})();

function dealFormData(row) {
    var id = row.id;
    var nickname = row.nickname;
    var email = row.email;
    var telphone = row.telphone;
    var display_photo_url = row.display_photo_url;
    var website = row.website;
    var birthday = row.birthday;
    var summary = row.summary;

    document.getElementById('card-email').innerHTML = email;
    document.getElementById('email').value = email;

    if(display_photo_url) {
        document.getElementById('display_photo').src = '../img/display_photo/' + display_photo_url;
    } 

    if (nickname) {
        document.getElementById('card-username').innerHTML = nickname;
        document.getElementById('nickname').value = nickname;
    } else {
        document.getElementById('card-username').innerHTML = 'ppuser_' + id;
    }

    if (telphone) {
        document.getElementById('phone').value = telphone;
    }

    if (website) {
        document.getElementById('website').value = website;
    }

    if (birthday&&birthday!=0) {
        birthday = Tools.timestamp2Date('Y-m-d',birthday);
        document.getElementById('birthday').value = birthday;
    }

    if (summary) {
        document.getElementById('summary').value = summary;
    }
}