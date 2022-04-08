<?php
include'../connexionbdd.php';

$query = "SELECT *  FROM fablab.logs INNER JOIN adherent on adherent_idAdherent = idAdherent WHERE Mail =?";

$mail=$_GET['mail'];
if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('s',$mail);
    $stmt->execute();

    $stmt->bind_param('i', $adhrent_idAdherent);
    if ($stmt->execute())
        $rep = array("success" => true);
    else
        $rep = array("success" => false);

    echo(json_encode($rep));
    $stmt->close();
}
$bdd->close();
