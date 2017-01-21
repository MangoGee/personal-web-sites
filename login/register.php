<?php
	header("Content-Type:application/json;charset=UTF-8");

	$user = $_POST["email"];
	$pwd = $_POST["password"];
	$comfirmPwd = $_POST["comfirePwd"];

	if (!preg_match('/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/', $user)) {
		$arrData = array("success"=>false,"detail"=>"请正确输入邮箱格式");

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	}

	if ($user == "" || $pwd == "" || $comfirmPwd == "") {
		$arrData = array("success"=>false,"detail"=>"请正确输入信息");

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	}

	if (strlen($pwd)<6) {
		$arrData = array("success"=>false,"detail"=>"密码不能少于6位");

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	}

	if (!$pwd==$comfirmPwd) {
		$arrData = array("success"=>false,"detail"=>"密码与确认密码不一致");

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	}

	include('conn.php');

	$check_query = mysql_query("select id from users where email='$user'");
	if (mysql_fetch_array($check_query)) {
		$arrData = array("success"=>false,"detail"=>"邮箱已存在");

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	}

	$register = time();
	$insert_exec = "INSERT INTO users(email,password,register,status)VALUES('$user','$pwd','$register', 0)";
	if(mysql_query($insert_exec,$conn)){
		$arrData = array("success"=>true,"detail"=>"注册成功");

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

	    exit;
	} else {
		$arrData = array("success"=>false,"detail"=>'抱歉！注册失败：'.mysql_error());

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

	    exit;
	}
?>