<?php

function get($table, $id, $limit = -1, $offset = -1) {
	if (!isset($table))
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400) and die();

	global $pdo;

	$query = "SELECT * FROM `$table`";

	if (isset($id))
		$query .= ' WHERE `id` = :id';

	if ($limit > 0)
		$query .= ' LIMIT :limit';

	if ($offset > 0)
		$query .= ' OFFSET :offset';

	$stmt = $pdo->prepare($query);

	if (isset($id))
		$stmt->bindValue(':id', (int) $id, PDO::PARAM_INT);

	if ($limit > 0)
		$stmt->bindValue(':limit', (int) $limit, PDO::PARAM_INT);

	if ($offset > 0)
		$stmt->bindValue(':offset', (int) $offset, PDO::PARAM_INT);

	if ($stmt->execute())
		return $stmt->fetchAll(PDO::FETCH_ASSOC);

	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	return false and die();
}

function post($table, $array) {
	if (!isset($table, $array) && !is_array($array))
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400) and die();

	global $pdo;

	$keys = '';
	$values = '';

	foreach ($array as $key => $value) {
		$keys .= "`$key`, ";
		$values .= ":$key, ";
	}

	$keys = substr($keys, 0, count($keys) - 3);
	$values = substr($values, 0, count($values) - 3);

	$query = "INSERT INTO `$table` ($keys) VALUES($values)";
	$stmt = $pdo->prepare($query);

	foreach ($array as $key => $value) {
		$stmt->bindValue(":$key", $value);
	}

	if ($stmt->execute())
		return $pdo->lastInsertId();

	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	return false and die();
}

function put($table, $id, $array) {
	if (!isset($table, $id, $array))
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400) and die();

	global $pdo;
}

function delete($table, $id) {
	if (!isset($table, $id))
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400) and die();

	global $pdo;
}