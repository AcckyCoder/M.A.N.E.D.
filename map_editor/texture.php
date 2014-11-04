<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Библиотека текстур</title>
    <link rel="stylesheet" type="text/css" href="main.css" />
   </head>
<body>
<?php
$content_to_insert = "";
if (isset($_POST['sendID'])) $sendID = $_POST['sendID'];
if (isset($_POST['send'])) $send = $_POST['send'];
if (isset($sendID) and $sendID != "")
{
    $texture = json_decode(file_get_contents('texture.json'), true);
    unset($texture[$sendID]);
    $text = json_encode($texture);
    $fp = fopen("texture.json", "w");
    fwrite($fp, $text);
    fclose($fp);
}
$content_to_insert .= '
<script language="JavaScript">
function send_check(id)
{
			document.all("sendID").value = id;
 			document.fieldsForm.submit();
			return false;
}
</script>
';
$content_to_insert .= '<input type="button" name="submit" value="Добавить" class="button" onclick="javascript: location.href = \'add_texture.php\'"><br>';
    $content_to_insert .= '
        <form method="post" action="texture.php" name="fieldsForm">
        <input type="hidden" name="send" value="1">
        <INPUT TYPE="hidden" NAME="sendID" VALUE="">
        <table ONSELECTSTART="return false;" ONCONTEXTMENU="return false;" width="100%" border="0" cellpadding="3" cellspacing="1">
        <tr>
            <td class="header" >№</td>
            <td class="header">Изображение</td>
            <td class="header">Название</td>
            <td class="header" width="20px"><img src="'.$domain.'img/1x1.gif" alt="" width="20" height="1" border="0"></td>
        </tr>
        ';

  $texture = json_decode(file_get_contents('texture.json'), true);
        $z = 0;
        $pattern = "lite";
        $color ="#E5E5E5";
        foreach($texture as $id=>$myrow)
            $content_to_insert .= '
            <tr onmouseover="setPointer(this, '.($z+1).', \'over\', \''.$color.'\', \'#89AFCD\', \'#E4CBB2\');" onmouseout="setPointer(this, '.($z+1).', \'out\', \''.$color.'\', \'#89AFCD\', \'#E4CBB2\');" onmousedown="setPointer(this, '.($z+1).', \'click\', \''.$color.'\', \'#89AFCD\', \'#E4CBB2\');">
            <td class="'.$pattern.'" bgcolor="'.$color.'">'.$id.'</td>
            <td class="'.$pattern.'" align="center" bgcolor="'.$color.'" ><img src="http://'.$_SERVER['HTTP_HOST']."/img/texture/".$myrow['img'].'"border="0" width="80px"></td>
            <td class="'.$pattern.'" align="center" bgcolor="'.$color.'" >'.$myrow["name"].'</td>
            <td class="'.$pattern.'" bgcolor="'.$color.'"><a href="#" onClick="javascript: if ((confirm(\'Вы уверены что хотите удалить раздел &laquo;'.$myrow["name"].'&raquo;\'))) { send_check('.$id.'); }"><img src="http://'.$_SERVER['HTTP_HOST'].'/img/del.gif" alt="Удалить" width="16" height="16" border="0"></a></td>
            </tr>
            ';
            if ($z % 2)
            {
                $pattern = "lite";
                $color ="#E5E5E5";
            } else {
                $pattern = "hard";
                $color ="#D5D5D5";
            }
            $z++;
    $content_to_insert .= '
    <tr><td colspan="9" height="5"><img src="'.$domain.'img/1x1.gif" alt="" width="1" height="5" border="0"></td></tr>
</table></form>';
echo $content_to_insert;
?>
</body>
</html>