<?php

$template = $twig->load('portada.html');
$noticias = getAllNoticias();

echo $template->render(['noticias' => $noticias]);