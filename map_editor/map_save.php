<?php
//var_dump($_POST);
// ������, ������� ����� ����������
$text = "var map = ".$_POST['json'];

// ��������� ����, ���� ���� �� ����������,
//�������� ������� ������� ���
$fp = fopen("map.json", "w");

// ���������� � ���� �����
fwrite($fp, $text);

// ���������
fclose($fp);
header("Location: ".$_SERVER['HTTP_REFERER']);