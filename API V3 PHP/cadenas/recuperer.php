<?php
include'../connexionbdd.php';

$query = "SELECT idCadenas,Niveau,NomCadenas,Actif FROM cadenas";

if ($stmt = $bdd->prepare($query)) {
    $stmt->execute();
    $stmt->bind_result($idCadenas, $Niveau, $NomCadenas, $Actif);
    $json=array();
    while ($stmt->fetch()) {
        $tab=array("idCadenas"=>$idCadenas, "Niveau"=>$Niveau, "NomCadenas"=>$NomCadenas, "Actif"=>$Actif);
        if($Niveau=="0"&&$NomCadenas=="Nouveau"&&$Actif==0){
            $tab=array("idCadenas"=>$idCadenas, "Niveau"=>"", "NomCadenas"=>"", "Actif"=>$Actif,"Nouveau"=>1);
        }
        array_push($json,$tab);
    }
    echo(json_encode($json));
    $stmt->close();
}

