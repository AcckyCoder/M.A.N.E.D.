<?php
$content_to_insert = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>True CSS3 convex polygons</title>
    <link rel="stylesheet" type="text/css" href="main.css" />
</head>
<body>
';
if (isset($_POST['submit'])) $submit = $_POST['submit'];
if (isset($_POST['name'])) $name = $_POST['name'];
else{$name="";}
if (isset($_POST['type'])) $type = $_POST['type'];
else{$type="";}
if (isset($_POST['is_send'])) {$is_send = $_POST['is_send'];}
else{$is_send="0";}
$foto_light_name="";
//Проверки--->
if(isset($submit))
{
//Проверка на пустое поле
    if (empty($name)){
        $content_to_insert .= '<div class="header2">Введите название.<br>
  </div><br>';
        unset($submit);
    }
    elseif (empty($type)){
        $content_to_insert .= '<div class="header2">Введите название.<br>
  </div><br>';
        unset($submit);
    }
}
//--->Проверки
if(isset($submit))
{
    $types = json_decode(file_get_contents('types.json'), true);
    $types[]=array("type"=>$type, "name"=>$name);
    $text = json_encode($types);

    $fp = fopen("types.json", "w");

// записываем в файл текст
    fwrite($fp, $text);
    fclose($fp);
    header("Location: http://".$_SERVER['HTTP_HOST']."/M.A.N.E.D/dev/types.php");
}
$content_to_insert .= '
<form method="post" enctype="multipart/form-data" action="add_type.php" name="sendform" class="sendform">
<table width="100%" cellspacing="5" cellpadding="0" border="0">
<tr>
    <td class="text_g">Тип:</td>
    <td class="text"><input type="text" name="type" vaue="'.$type.'"></td>
</tr>
<tr>
    <td class="text_g">Название:</td>
    <td class="text"><textarea id="s_name" class="normal" name="name" style="height: 50px;">'.htmlspecialchars($name).'</textarea></td>
</tr>
<tr>
	<td class="text"><input type="submit" name="submit" value="Добавить" class="button"></td>
	<td class="text"></td>
</tr>
</table>
<input type="hidden" name="is_send" value="1">
</form>
</body>
</html>
';
echo $content_to_insert;
?>
