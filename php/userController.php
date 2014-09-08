<?php

require 'Slim/Slim.php';
require 'connection.php';

$app = new Slim();

$app->get('/usuario', 'getusuarios');
$app->get('/usuario/:user',	'getusuario');
//$app->get('/wines/search/:query', 'findByName');
$app->post('/usuario', 'addusuario');
$app->put('/usuario/:user', 'updateusuario');
$app->delete('/usuario/:user',	'deleteusuario');

$app->run();

function getusuarios() {
	$sql = "select * FROM usuarios";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo  json_encode($usuarios);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getusuario($id) {
	$sql = "SELECT * FROM usuarios WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("user", $user);
		$stmt->execute();
		$usuario = $stmt->fetchObject();  
		$db = null;
		echo json_encode($usuario); 
		return $usuario;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addusuario() {
	//('addWine\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$usuario = json_decode($request->getBody());
	$sql = "INSERT INTO usuarios (user, pass, name, mail,tel,admin) VALUES (:user, :pass, :name, :mail, :tel, 0)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("user", $usuario->user);
		$stmt->bindParam("pass", $usuario->pass);
		$stmt->bindParam("name", $usuario->name);
		$stmt->bindParam("mail", $usuario->mail);
		$stmt->bindParam("tel", $usuario->tel);

		
		$stmt->execute();
		$usuario->id = $db->lastInsertId();
		$db = null;
		echo json_encode($usuario); 
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateusuario($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$usuario = json_decode($body);
	$sql = "UPDATE usuarios SET name=:name, pass=:pass, mail =:mail, tel =:tel, user =:user WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $usuario->name);
		$stmt->bindParam("pass", $usuario->pass);
		$stmt->bindParam("mail", $usuario->mail);
		$stmt->bindParam("tel", $usuario->tel);
		$stmt->bindParam("user", $usuario->user);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($usuario); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteusuario ($id) {
	$sql = "DELETE FROM usuarios WHERE id=:id";
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