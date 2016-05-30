<?php

$host = 'localhost';
$name = 'fit';
$user = 'root';
$pass = '';

try {
	$pdo = new PDO("mysql:host=$host;dbname=$name;", $user, $pass);
} catch (PDOException $e) {
	echo $e->getMessage();
	die();
}