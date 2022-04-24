<?php
$filename=$_FILES['file']['name'];
$location="./".$filename;


if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
    echo 'Réussi';
}
else{
    var_dump($location);
}