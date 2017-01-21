<?php 

	session_start();

	if ($_GET['isLogOut']) {
		unset($_SESSION['user']);
		unset($_SESSION['userid']);

		$arrData = array("success"=>true,"detail"=>"注销登录成功");
		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
		exit;
	}

	header("Content-Type:application/json;charset=UTF-8");

	$user = $_POST["email"];
	$pwd = $_POST["password"];

	if ($user == "" || $pwd == "") {

		$arrData = array("success"=>false,"detail"=>"请正确输入邮箱和密码");

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	} else {

		include('conn.php');

		//查询
		$queryAcc = "select id, nickname, email, status from users where email='$user' and password='$pwd'";
		$result = mysql_query($queryAcc);
		$num = mysql_num_rows($result);
		if ($num) {

			$arrData = array("success"=>true,"detail"=>"登录成功");

			$arrResult = array();

			while($row = mysql_fetch_array($result)) {
				$count = count($row);
				for ($i=0; $i < $count; $i++) { 
					unset($row[$i]);
				}

				array_push($arrResult, $row);

			}

			$arrData['result']=$arrResult;

			$_SESSION['user'] = $user;
			$_SESSION['userid'] = $result['id'];

			echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

			exit;

		} else {
			$queryExist = "select email from users where email='$user'";
			$isExist = mysql_num_rows(mysql_query($queryExist));
			if ($isExist) {
				$arrData = array("success"=>false,"detail"=>"密码错误");

				echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

				exit;
			} else {
				$arrData = array("success"=>false,"detail"=>"邮箱未注册");

				echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

				exit;
			}

		}

	}
?>