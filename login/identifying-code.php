<?php
	header("Content-Type:application/json;charset=UTF-8");

	$user = $_POST["email"];
	$pwd = $_POST["password"];
	$register = $_POST["register"];
	$forget = $_POST['forget'];

	if (!preg_match('/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/', $user)) {
		echo2Json(false, "请正确输入邮箱格式");
	}

	if ($register&&$forget) {
		echo2Json(false, "操作有误");
	}

	include('conn.php');
	require_once("sendmail.php");

	$check_query = mysql_query("***********");
	$num = mysql_num_rows($check_query);

	if ($register) {
		register($conn, $user, $pwd, $num);
	} else {
		forget($conn, $user, $num);
	} 

	function register($conn, $user, $pwd, $num)	{
		if (($pwd&&strlen($pwd)<6) || !$pwd) {
			echo2Json(false, "密码不能少于6位");
		}

		if (!$num) {
			$check_query = mysql_query("******");
			$num = mysql_num_rows($check_query);
			if (!$num) {
				//临时表未存储
				$ident_time = time();
				$insert_exec = "*******";
				if (mysql_query($insert_exec,$conn)) {
					//插入成功
					$theSubject = 'PPGee Zone验证码';
					$txt = "您在PPGee Zone注册的验证码是：$ident_code";
					$state = sendMail($user, $theSubject, $txt);
					if ($state=='') {
						echo2Json(false, '激活码发送失败，请稍后再试');
					}
					echo2Json(true, '发送激活码到邮箱成功，请查收');
				} else {
					//插入失败
					echo2Json(false, '抱歉！发送失败，请稍后再试'.mysql_error());
				}
			} else {
				//临时表已存储
				$row = mysql_fetch_array($check_query, MYSQL_ASSOC);
				$ident_code = $row['ident_code'];
				$theSubject = 'PPGee Zone验证码';
				$txt = "您在PPGee Zone注册的验证码是：$ident_code";
				$state = sendMail($user, $theSubject, $txt);
				if (!$state) {
					echo2Json(false, '激活码发送失败，请稍后再试');
				}
				echo2Json(true, '发送激活码到邮箱成功，请查收');
			}
		} else {
			echo2Json(false, '该邮箱已注册');
		}
	}

	function forget($conn, $user, $num) {
		if ($num) 
			$update_exec = "***********";
			if (mysql_query($update_exec,$conn)) {
				//更新成功
				$theSubject = 'PPGee Zone验证码';
				$txt = "PPGee Zone找回帐号的验证码是：$activation_key";
				$state = sendMail($user, $theSubject, $txt);
				if ($state=='') {
					echo2Json(false, '激活码发送失败，请稍后再试');
				}
				echo2Json(true, '发送激活码到邮箱成功，请查收');
			} else {
				//更新失败
				echo2Json(false, '抱歉！发送失败，请稍后再试'.mysql_error());
			}
		} else {
			echo2Json(false, '该邮箱未注册');
		}
	}

	function echo2Json($success, $detail){
		$arrData = array("success"=>$success,"detail"=>$detail);

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	}
?>