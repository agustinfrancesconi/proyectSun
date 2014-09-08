<?php

require 'Slim/Slim.php';
require 'connection.php';

$app = new Slim();

$app->get('/categoria', 'getCategorias');
$app->get('/categoria/:cod',	'getCategoria');
//$app->get('/wines/search/:query', 'findByName');
$app->post('/categoria', 'addCategoria');
$app->put('/categoria/:cod', 'updateCategoria');
$app->delete('/categoria/:cod',	'deleteCategoria');

$app->run();


function getCategorias() {
	$sql = "select * FROM categorias";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$categorias = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo  json_encode($categorias);
	} catch(PDOException $e) {
		echo '{"error get todos":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getCategoria($id) {
	$sql = "SELECT * FROM categorias WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$categoria = $stmt->fetchObject();  
		$db = null;
		echo json_encode($categoria); 
		return $categoria;
	} catch(PDOException $e) {
		echo '{"error get":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addCategoria() {
	//('addWine\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$categoria = json_decode($request->getBody());
	$sql = "INSERT INTO categorias (cod, name, descripcion) VALUES (:cod, :name, :descripcion)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("cod", $categoria->cod);
		$stmt->bindParam("name", $categoria->name);
		$stmt->bindParam("descripcion", $categoria->descripcion);
		$stmt->execute();
		$categoria->id = $db->lastInsertId();
		$db = null;
		echo json_encode($categoria); 
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error add":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateCategoria($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$categoria = json_decode($body);
	$sql = "UPDATE categorias SET name=:name, descripcion=:descripcion, cod =:cod WHERE id=:id;";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $categoria->name);
		$stmt->bindParam("descripcion", $categoria->descripcion);
		$stmt->bindParam("cod", $categoria->cod);
		$stmt->bindParam("id", $id);
		$result = $stmt->execute();
		$db = null;
		echo $result;
	} catch(PDOException $e) {
		echo '{"error update":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteCategoria ($id) {
	$sql = "DELETE FROM categorias WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

?>