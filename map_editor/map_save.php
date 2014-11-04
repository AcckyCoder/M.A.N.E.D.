<?php
//var_dump($_POST);
// строка, которую будем записывать
$text = "var map = ".$_POST['json'];

// открываем файл, если файл не существует,
//делается попытка создать его
$fp = fopen("map.json", "w");

// записываем в файл текст
fwrite($fp, $text);

// закрываем
fclose($fp);
header("Location: ".$_SERVER['HTTP_REFERER']);