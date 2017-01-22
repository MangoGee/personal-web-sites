<?php 

	session_start();

	if ($_GET['isLogOut']) {
		unset($_SESSION['user']);
		unset($_SESSION['userid']);

		echo2Json(true, "注销登录成功");

	}

	header("Content-Type:application/json;charset=UTF-8");

	$user = $_POST["email"];
	$pwd = $_POST["password"];

	if ($user == "" || $pwd == "") {

		echo2Json(false, "请正确输入邮箱和密码");

	} else {

		include('conn.php');

		//查询
		$pwd = strrev(md5("ppgee".$pwd."PANGPUIKEI"));
		$queryAcc = "select id, nickname, email, status from users where email='$user' and password='$pwd'";
		$result = mysql_query($queryAcc);
		$num = mysql_num_rows($result);
		if ($num) {

			$_SESSION['user'] = $user;
			$_SESSION['userid'] = $result['id'];

			echo2Json(true, "登录成功", $result);

		} else {
			$queryExist = "select email from users where email='$user'";
			$isExist = mysql_num_rows(mysql_query($queryExist));
			if ($isExist) {

				echo2Json(false, "密码错误");

			} else {

				echo2Json(false, "邮箱未注册");

			}

		}

	}

	function echo2Json($success, $detail, $queryResult=null){
		$arrData = array("success"=>$success,"detail"=>$detail);

		if (!is_null($queryResult)) {
			$arrResult = array();
			while($row = mysql_fetch_array($queryResult)) {
				$count = count($row);
				for ($i=0; $i < $count; $i++) { 
					unset($row[$i]);
				}

				array_push($arrResult, $row);

			}

			$arrData['result']=$arrResult;
		}

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	}
?>