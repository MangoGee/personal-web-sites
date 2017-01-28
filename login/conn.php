<?php 
/*********************
 ******数据库连接******
 *********************/

	$conn = @mysql_connect("localhost","root","******");
	if (!$conn) {
		die("连接数据库失败：".mysql_error());
	}

	//选择数据库
	mysql_select_db("库名");
	mysql_query("set names 'utf8'");		//为避免中文乱码做入库编码转换

?>