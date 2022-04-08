<?php
include'../connexionbdd.php';
if(isset($_GET["limite"])){
    $limite=$_GET["limite"];
}
else
$limite=1;

$query = "SELECT Nom,Prenom,Age,Type,Grade,Tel,Mail,Photo FROM fablab.adherent limit ?";

if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param("i",$limite);
    $stmt->execute();
    $stmt->bind_result($Nom, $Prenom, $Age, $Type, $Grade, $Tel, $Mail, $Photo);
    $json=array();

    while ($stmt->fetch()) {$tab=array("Nom"=>$Nom,"Prenom"=>$Prenom,"Age"=>$Age,"Type"=>$Type,"Grade"=>$Grade,"Tel"=>$Tel,"Mail"=>$Mail,"Photo"=>$Photo,);
        array_push($json,$tab);
    }
    echo(json_encode($json));
    $stmt->close();



}
$bdd->close();