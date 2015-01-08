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
    }
//--->Проверки
    if(isset($submit))
    {
        //print_r($_FILES["myfile"]);
        if(isset($_FILES["myfile"]) &&!empty($_FILES["myfile"]["name"]))
        {
            $DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
            $foto_dir = $DOCUMENT_ROOT."/img/texture/"; // Директория для фотографий
            $foto_name = $foto_dir.time()."_".basename($_FILES['myfile']['name']); // Полное имя файла вместе с путем
            if (!empty($_FILES['myfile']['name']))
                $foto_light_name = time()."_".basename($_FILES['myfile']['name']);// Имя файла исключая путь

            $myfile = $_FILES["myfile"]["tmp_name"];
            $myfile_name = $_FILES["myfile"]["name"];
            $myfile_size = $_FILES["myfile"]["size"];
            $myfile_type = $_FILES["myfile"]["type"];
            $error_flag_img = $_FILES["myfile"]["error"];

// Если ошибок не было
            if($error_flag_img == 0)
            {
                //Если не удалось загрузить файл
                if (!move_uploaded_file($_FILES['myfile']['tmp_name'], $foto_name))
                {
                    $lk_string .= '<div class="header2">Не удалось загрузить фотографию<br></div><br>';
                      unset($submit);
                }
                else
                {
                    include('classSimpleImage.php');
                    $image = new SimpleImage();
                    $image->load($foto_name);
                    $image->resizeToWidth(400);
                    if ($image->getHeight()>400) $image->resize2(400,400);
                    $image->save($foto_dir.$foto_light_name, IMAGETYPE_PNG);
                    unset($image);
                }
            }
            else
            {
                $lk_string .= '<div class="header2">Не удалось загрузить изображение<br></div><br>';
                 unset($submit);
            }
        }
    }
    if(isset($submit))
    {
        $texture = json_decode(file_get_contents('texture.json'), true);
        $texture[]=array("img"=>$foto_light_name, "name"=>$name);
        $text = json_encode($texture);

        $fp = fopen("texture.json", "w");

// записываем в файл текст
        fwrite($fp, $text);
        fclose($fp);
        header("Location: http://".$_SERVER['HTTP_HOST']."/M.A.N.E.D/dev/texture.php");
    }
    $content_to_insert .= '
<form method="post" enctype="multipart/form-data" action="add_texture.php" name="sendform" class="sendform">
<table width="100%" cellspacing="5" cellpadding="0" border="0">
<tr>
    <td class="text_g">Изображение:</td>
    <td class="text"><input type="file" name="myfile" id="myfile" ></td>
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
