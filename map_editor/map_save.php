<?php
//var_dump($_POST);
// ������, ������� ����� ����������
$text = "var map = ".$_POST['json'];

// ��������� ����, ���� ���� �� ����������,
//�������� ������� ������� ���
$fp = fopen("map.js", "w");

// ���������� � ���� �����
fwrite($fp, $text);

// ���������
fclose($fp);
header("Location: ".$_SERVER['HTTP_REFERER']);