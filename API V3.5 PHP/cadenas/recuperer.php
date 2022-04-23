<?php
include'../connexionbdd.php';

$query = "SELECT idCadenas,Niveau,NomCadenas,Actif FROM cadenas ORDER BY idCadenas desc";

if ($stmt = $bdd->prepare($query)) {
    $stmt->execute();
    $stmt->bind_result($idCadenas, $Niveau, $NomCadenas, $Actif);
    $json=array();
    $nombre=0;
    while ($stmt->fetch()) {

        $nombre++;

        $tab_nombre=array("Nombre"=>$nombre);

        $tab=array("idCadenas"=>$idCadenas, "Niveau"=>$Niveau, "NomCadenas"=>$NomCadenas, "Actif"=>$Actif);
        if($Niveau=="0"&&$NomCadenas=="Nouveau"&&$Actif==0){
            $tab=array("idCadenas"=>$idCadenas, "Niveau"=>0, "NomCadenas"=>"", "Actif"=>$Actif,"Nouveau"=>1);
        }
        array_push($json,$tab);
    }
    array_push($json,$tab_nombre);
    echo(json_encode($json));
    $stmt->close();
}

