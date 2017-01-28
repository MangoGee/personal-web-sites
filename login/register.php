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
	if (mysql_fetch_array($check_query)) {
		echo2Json(false, "邮箱已存在");
	}

	$check_query = mysql_query("**************");
	
	$num = mysql_num_rows($check_query);
	if (!$num) {
		echo2Json(false, '系统错误，请重试');
	}

	$row = mysql_fetch_array($check_query, MYSQL_ASSOC);
	$ident_code = $row['ident_code'];

	if ($actCode != $ident_code) {
		echo2Json(false, '邮箱对应的激活码有误，请确认邮箱和激活码是否正确');
	}
	
	$register = time();
	$insert_exec = "**************";
	if(mysql_query($insert_exec,$conn)){
		//删除临时表对应数据
		$delete_exec = "**************";
		mysql_query($delete_exec);

	    echo2Json(true, "注册成功");
	} else {
	    echo2Json(false, '抱歉！注册失败：'.mysql_error());
	}

	function echo2Json($success, $detail){
		$arrData = array("success"=>$success,"detail"=>$detail);

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	}
?>