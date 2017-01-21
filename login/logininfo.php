<?php
	session_start();

	//检测是否登录，若没登录则转向登录界面
	if(!isset($_SESSION['user'])){
		$arrData = array("success"=>false,"detail"=>"请先登录");

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

	    exit;
	}

	include('conn.php');
	$user = $_SESSION['user'];

	$arrData = array("success"=>true,"user"=>$user);

	echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

?>