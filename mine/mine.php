<?php 

	session_start();

	$sendMail = $_POST['sendMail'];

	if ($sendMail) {
		sendEmail();
	} else {
		updateData();
	}

	function sendEmail() {
		$sender = $_POST['sender'];
		$sender_email = $_POST['senderEmail'];
		$theSubject = $_POST['subject'];
		$message = '发送人：'. $sender . ', 发送人邮箱：' . $sender_email . '，内容：' . $_POST['message'];

		require_once("../login/sendmail.php");
		$state = mail('pengppj1314@gmail.com', $theSubject, $message);
		if ($state=='') {
			echo2Json(false, '发送失败，请稍后再试');
		}
		echo2Json(true, '联系成功，感谢您的建议！');
	}

	function updateData() {
		$user = $_SESSION['user'];
		$userid = intval($_SESSION['userid']);
		$nickname = $_POST['nickname'];
	    $birthday = intval($_POST['birthday']);
	    $telphone = $_POST['telphone'];
	    $website = $_POST['website'];
	    $summary = $_POST['summary'];

		include('../login/conn.php');

		$update_exec = "**************";

		if (mysql_query($update_exec, $conn)) {
			echo2Json(true, "保存成功");
		} else {
			echo2Json(false, '抱歉！保存失败');
		}
	}

	function echo2Json($success, $detail){
		$arrData = array("success"=>$success,"detail"=>$detail);

		echo json_encode($arrData, JSON_UNESCAPED_UNICODE);

		exit;
	}

 ?>