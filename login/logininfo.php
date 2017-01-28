<?php
	session_start();

	//检测是否登录，若没登录则转向登录界面
	if(!isset($_SESSION['user'])){
	    echo2Json(false, "请先登录");
	}

	include('conn.php');
	$user = $_SESSION['user'];
	$id = intval($_SESSION['userid']);

	$check_query = "**************";
	$result = mysql_query($check_query);

	$num = mysql_num_rows($result);

	if (!$num) {
		echo2Json(false, "帐号有误！");
	}

	echo2Json(true, "返回成功", $user, $result);

	function echo2Json($success, $detail, $user=null, $queryResult=null){
		$arrData = array("success"=>$success,"detail"=>$detail);

		if (!is_null($user)) {
			$arrData['user']=$user;
		}

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