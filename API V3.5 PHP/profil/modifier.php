<?php
include'../connexionbdd.php';



    $query = "UPDATE `fablab`.`adherent` SET `Nom` = ?, `Prenom` = ?, `Mail` = ?,`Tel` = ? WHERE (`Mail` = ?)";

    $Nom = $_POST["nom"];

    $Prenom = $_POST["prenom"];

    $Mail= $_POST["mail"];



    $Tel = $_POST["tel"];


    $ancien_mail =$_POST["ancien_mail"];

    $Password = $_POST["password"];



    if ($stmt = $bdd->prepare($query)) {
        $stmt->bind_param('sssss', $Nom,$Prenom,$Mail,$Tel,$ancien_mail);
        if($stmt->execute())
            $rep=array("success"=>true);

        else
            $rep=array("success"=>false);
        echo(json_encode($rep));
        $stmt->close();
    }
    $bdd->close();






