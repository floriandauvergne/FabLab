<?php
include'../connexionbdd.php';

function random_str(
    $length,
    $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) {
    $str = '';
    $max = mb_strlen($keyspace, '8bit') - 1;
    if ($max < 1) {
        throw new Exception('$keyspace must be at least two characters long');
    }
    for ($i = 0; $i < $length; ++$i) {
        $str .= $keyspace[random_int(0, $max)];
    }
    return "../../Photos de profils/".$str.".jpg";
}


$mail=$_GET['mail'];

$ancienne_photo = $_GET['ancienne'];

$location = random_str(10);

if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
    $query = "UPDATE `fablab`.`adherent` SET `Photo` = ? WHERE (`Mail` = ?);";

    if ($stmt = $bdd->prepare($query)) {
        $Photo=$location;

        $stmt->bind_param('ss',$Photo,$mail);

        if ($stmt->execute()){
            unlink($ancienne_photo);
            $rep = array("success" => true);
        }
        else
            $rep = array("success" => false);

        $stmt->close();
    }

} else
    $rep = array("success" => false);

echo(json_encode($rep));