<?php

$mysqli = new mysqli("db", "usuario", getenv('MYSQL_PASSWORD'), "ayuntamiento");
if($mysqli->connect_errno) {
    die("Error connecting to database: " . $mysqli->connect_errno);
}

if($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}


function getAllNoticias() {
    global $mysqli;
    
    $stmt = $mysqli->prepare("SELECT * FROM news");
    $stmt->execute();
    $result = $stmt->get_result();
    $news = [];
    while($new = $result->fetch_assoc()) {
        $news[] = $new;
    }
    $stmt->close();
    return $news;
}

function getNoticiaWithImages($id) {
    global $mysqli;
    $stmt = $mysqli->prepare("SELECT news.*, news_images.image_url FROM news LEFT JOIN news_images ON news.id = news_images.news_id WHERE news.id = ?");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    
    while($row = $result->fetch_assoc()) {
        if (!isset($new['id'])) {
            $new = $row;
            $new['images'] = [];
            unset($new['image_url']);
        }
        $new['images'][] = $row['image_url'];
    }

    $stmt->close();

    
    return $new;
}

function getAllComentarios() {
    global $mysqli;
    $stmt = $mysqli->prepare("SELECT * FROM comments");
    $stmt->execute();
    $result = $stmt->get_result();
    $comentarios = [];
    while($comentario = $result->fetch_assoc()) {
        $comentarios[] = $comentario;
    }
    $stmt->close();
    return $comentarios;
}

function getNoticia($id) {
    global $mysqli;
    $stmt = $mysqli->prepare("SELECT * FROM news WHERE id = ?");
    $stmt->bind_param("s", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    $new = $result->fetch_assoc();

    $stmt->close();
    return $new;
}

function getComentariosByNewsId($id) {
    global $mysqli;
    $stmt = $mysqli->prepare("SELECT * FROM comments WHERE news_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $comentarios = [];
    while($comentario = $result->fetch_assoc()) {
        $comentarios[] = $comentario;
    }
    $stmt->close();
    return $comentarios;
}

function getMunicipios() {
    global $mysqli;
    $stmt = $mysqli->prepare("SELECT * FROM municipios");
    $stmt->execute();
    $result = $stmt->get_result();
    $municipios = [];
    while($municipio = $result->fetch_assoc()) {
        $municipios[] = $municipio;
    }
    $stmt->close();
    return $municipios;
}