<?php
echo header('Access-Control-Allow-Origin: *');
echo header('Content-type: application/json');

$db = new PDO('mysql:host=localhost;port=8889;dbname=todo;charset=utf8','root','root');
$sql = "select * from task";
$query = $db->query($sql);
$results = $query->fetchAll(PDO::FETCH_ASSOC);
echo header('HTTP/1.1 200 OK');
echo json_encode($results);