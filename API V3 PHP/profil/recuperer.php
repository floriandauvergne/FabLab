<?php
include'../connexionbdd.php';

    $mail=$_GET['mail'];
    $Nom="";
    $Prenom="";
    $Age="";
    $Type="";
    $Grade="";
    $Tel="";
    $Mail="";
    $Photo="";

    $query = "SELECT Nom,Prenom,Age,Type,Grade,Tel,Mail,Photo FROM fablab.adherent WHERE (Mail=?)";

    if ($stmt = $bdd->prepare($query)) {
        $stmt->bind_param('s',$mail);
        $stmt->execute();
        $stmt->bind_result($Nom,$Prenom,$Age,$Type,$Grade,$Tel,$Mail,$Photo);
        while ($stmt->fetch()) {$tab=array("Nom"=>$Nom,"Prenom"=>$Prenom,"Age"=>$Age,"Type"=>$Type,"Grade"=>$Grade,"Tel"=>$Tel,"Mail"=>$Mail,"Photo"=>$Photo);
            echo(json_encode($tab));
        }
        $stmt->close();
    }
$bdd->close();