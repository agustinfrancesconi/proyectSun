<?php
require 'Slim/Slim.php';
require 'connection.php';

$app = new Slim();

$app->get('/producto', 'getproductos');
$app->get('/producto/:id',	'getproducto($id)');
$app->post('/producto', 'addproducto');
$app->put('/producto/:id', 'updateproducto');
$app->delete('/producto/:id','deleteproducto');

$app->run();

function validate ($cod){
	if(getproducto($cod)){
		updateproducto($cod);
	}else{
		addproducto();
	}
}

function getproductos() {
	$sql = "select * FROM productos";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$productos = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo  json_encode($productos);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getproducto($cod) {
	$sql = "SELECT * FROM productos WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$producto = $stmt->fetchObject();  
		$db = null;
		echo json_encode($producto); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addproducto() {
	$request = Slim::getInstance()->request();
	$producto = json_decode($request->getBody());
	$sql = "INSERT INTO productos (name, descripcion, descripcion2, color, tamano, medidas, categoria, marca, imagen1, imagen2, imagen3, imagen4, imagen5, imagen6) VALUES
	 ( :name, :descripcion, :descripcion2, :color, :tamano, :medidas, :categoria, :marca, :imagen1, :imagen2, :imagen3,:imagen4,:imagen5,:imagen6)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $producto->name);
		$stmt->bindParam("descripcion", $producto->descripcion);
		$stmt->bindParam("descripcion2", $producto->descripcion2);
		$stmt->bindParam("color", $producto->color);
		$stmt->bindParam("tamano", $producto->tamano);
		$stmt->bindParam("medidas", $producto->medidas);
		$stmt->bindParam("categoria", $producto->categoria);
		$stmt->bindParam("marca", $producto->marca);
		$stmt->bindParam("imagen1", $producto->imagen1);
		$stmt->bindParam("imagen2", $producto->imagen2);
		$stmt->bindParam("imagen3", $producto->imagen3);
		$stmt->bindParam("imagen4", $producto->imagen4);
		$stmt->bindParam("imagen5", $producto->imagen5);
		$stmt->bindParam("imagen6", $producto->imagen6);
		$stmt->execute();
		$producto->id = $db->lastInsertId();
		$db = null;
		echo json_encode($producto); 
	} catch(PDOException $e) {
		echo '{"error add":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateproducto($ID) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$producto = json_decode($body);
	$sql = "UPDATE productos SET name=:name, descripcion=:descripcion,
	descripcion2=:descripcion2, color=:color, tamano=:tamano, 
	medidas=:medidas, categoria =:categoria, marca=:marca, imagen1=:imagen1,
	imagen2=:imagen2, imagen3=:imagen3, imagen4=:imagen4, imagen5=:imagen5, 
	imagen6=:imagen6 WHERE ID=:ID";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $producto->name);
		$stmt->bindParam("descripcion", $producto->descripcion);
		$stmt->bindParam("descripcion2", $producto->descripcion2);
		$stmt->bindParam("color", $producto->color);
		$stmt->bindParam("tamano", $producto->tamano);
		$stmt->bindParam("medidas", $producto->medidas);
		$stmt->bindParam("categoria", $producto->categoria);
		$stmt->bindParam("marca", $producto->marca);
		$stmt->bindParam("imagen1", $producto->imagen1);
		$stmt->bindParam("imagen2", $producto->imagen2);
		$stmt->bindParam("imagen3", $producto->imagen3);
		$stmt->bindParam("imagen4", $producto->imagen4);
		$stmt->bindParam("imagen5", $producto->imagen5);
		$stmt->bindParam("imagen6", $producto->imagen6);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($producto); 
	} catch(PDOException $e) {
		echo '{"error update":{"text":'. $e->getMessage() .  '}}'; 
	}
}

function deleteproducto ($cod) {
	$sql = "DELETE FROM productos WHERE cod=:cod";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("cod", $cod);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

?>