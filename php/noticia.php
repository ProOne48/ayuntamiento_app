<?php


$template = $twig->load('noticia.html');
$new_data = getNoticiaWithImages($id);

echo $template->render($new_data);