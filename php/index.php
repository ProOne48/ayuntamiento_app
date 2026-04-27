<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$baseUrl = '/php/index.php';
require_once __DIR__.'/../vendor/autoload.php';
require_once __DIR__.'/db.php';

$loader = new \Twig\Loader\FilesystemLoader('../views');
$twig = new \Twig\Environment($loader);

$routes = [
    // Web pages
    $baseUrl.'/home' => function () {
        global $twig;
        require("portada.php");
    },
    $baseUrl.'/noticia/(?P<id>\d+)' => function ($matches) {
        $id = $matches['id'];
        global $twig;
        require("noticia.php");
    },
    $baseUrl.'/noticia_imprimir/(?P<id>\d+)' => function ($matches) {
        $id = $matches['id'];
        global $twig;
        require("noticia_imprimir.php");
    },

    // API endpoints
    $baseUrl.'/get_comentarios/(?P<id>\d+)' => function ($matches) {
        $id = $matches['id'];
        header('Content-Type: application/json');
        echo json_encode(getComentariosByNewsId($id));
    },
    $baseUrl.'/get_municipios' => function () {
        header('Content-Type: application/json');
        echo json_encode(getMunicipios());
    },
];

$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);


// Verifica cada ruta contra la ruta de la solicitud
foreach ($routes as $pattern => $callback) {
    if (preg_match('~^' . $pattern . '$~', $requestPath, $matches)) {
        call_user_func($callback, $matches);
        break;
    }
}