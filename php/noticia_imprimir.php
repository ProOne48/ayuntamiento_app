<?php


$template = $twig->load('noticia_imprimir.html');
$new_data = getNoticiaWithImages($id);

echo $template->render($new_data);