<?php

header('Access-Control-Allow-Origin: *');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
	case 'GET':
		$data = $_GET;

		break;
	case 'POST':
		$data = json_decode(file_get_contents('php://input'), true);

		break;
	case 'PUT':
		$data = json_decode(file_get_contents('php://input'), true);

		break;
	case 'DELETE':
		$data = json_decode(file_get_contents('php://input'), true);

		break;
}