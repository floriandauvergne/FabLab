<?php
include'../connexionbdd.php';

$query = "SELECT Nom, Prenom,Grade,Photo FROM fablab.adherent WHERE Mail=?";

$mail=$_GET['mail'];
if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('s',$mail);
    $stmt->execute();
    $stmt->bind_result( $Nom,$Prenom,$Grade, $Photo);

    while ($stmt->fetch()) {
        $tab=array("Nom"=>$Nom,"Prenom"=>$Prenom,"Grade"=>$Grade,"Grade"=>$Grade,"Photo"=>$Photo);
    }
    echo(json_encode($tab));
    $stmt->close();
}

