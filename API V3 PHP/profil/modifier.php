<?php
include'../connexionbdd.php';



    $query = "UPDATE `fablab`.`adherent` SET `Nom` = ?, `Prenom` = ?, `Mail` = ?, `Age` = ?, `Tel` = ?, `Photo` = ? WHERE (`Mail` = ?)";

    $Nom = $_POST["nom"];

    $Prenom = $_POST["prenom"];

    $Mail=$_POST["mail"];

    $Age = $_POST["age"];

    $Tel = $_POST["tel"];

    $Photo=$_POST["Photo"];

    $ancien_mail=$_POST["ancien_mail"];



    if ($stmt = $bdd->prepare($query)) {
        $stmt->bind_param('sssisss', $Nom,$Prenom,$Mail,$Age,$Tel,$Photo,$ancien_mail);
        if($stmt->execute())
            $rep=array("success"=>true);

        else
            $rep=array("success"=>false);
        echo(json_encode($rep));
        $stmt->close();
    }
    $bdd->close();






