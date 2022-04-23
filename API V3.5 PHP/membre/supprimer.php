<?php
include'../connexionbdd.php';

$query = "DELETE from fablab.adherent WHERE idAdherent =?";
if(isset($_POST["id"])){
    $id=$_POST["id"];
}

if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('i',$id);
    if ($stmt->execute())
        $rep = array("success" => true);

    else
        $rep = array("success" => false);
    echo(json_encode($rep));
}
$stmt->close();

$bdd->close();