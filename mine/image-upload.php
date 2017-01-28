<?php 

	$file = $_FILES;
	// $file = $_POST;
	print_r($file);

	function echo2Json($success, $detail){
		$arrData = array("success"=>$success,"detail"=>$detail);

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	}
?>