<?php
header('Access-Control-Allow-Origin: *');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
	case 'GET':
		echo 'GET';
		break;
	case 'POST':
		echo 'POST';
		break;
	case 'PUT':
		echo 'PUT';
		break;
	case 'DELETE':
		echo 'DELETE';
		break;
	default:
		header($_SERVER['SERVER_PROTOCOL'] . ' 405: Method Not Allowed', true, 405);
		echo $_SERVER['SERVER_PROTOCOL'] . ' 405: Method Not Allowed';
		die();
		break;
}

//$p = json_decode(file_get_contents('php://input'), true) or die();
//header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);