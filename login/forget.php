<?php 
	header("Content-Type:application/json;charset=UTF-8");

	$user = $_POST["email"];
	$pwd = $_POST["password"];
	$comfirmPwd = $_POST["comfirePwd"];
	$actCode = $_POST["actCode"];

	if ($user == "" || $pwd == "" || $comfirmPwd == "" || $actCode == "") {
		echo2Json(false, "请正确输入信息");
	}

	if (!preg_match('/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/', $user)) {
		echo2Json(false, "请正确输入邮箱格式");
	}

	if (strlen($pwd)<6) {
		echo2Json(false, "密码不能少于6位");
	}

	if (!($pwd==$comfirmPwd)) {
		echo2Json(false, "密码与确认密码不一致");
	}

	include('conn.php');

	$check_query = mysql_query("**************");
	$num = mysql_num_rows($check_query);

	if (!$num) {
		echo2Json(false, '输入邮箱有误');
	}

	$row = mysql_fetch_array($check_query, MYSQL_ASSOC);
	$email = $row['email'];
	$activation_key = $row['activation_key'];

	if (!(($user==$email) && ($actCode==$activation_key))) {
		echo2Json(false, '输入有误，请确认邮箱和找回码是否正确');
	}

	$update_exec = "**************";
	if (mysql_query($update_exec,$conn)) {
		//更新成功
		$theSubject = 'PPGee Zone找回帐号结果';
		$txt = "PPGee Zone找回帐号成功！若不是本人操作请及时找回帐号！";
		mail($user, $theSubject, $txt);
		echo2Json(true, '找回帐号成功');
	} else {
		//更新失败
		echo2Json(false, '抱歉！找回失败，请稍后再试');
	}

	function echo2Json($success, $detail){
		$arrData = array("success"=>$success,"detail"=>$detail);

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	}

 ?>