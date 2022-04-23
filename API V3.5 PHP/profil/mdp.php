<?php
include'../connexionbdd.php';



$query = "UPDATE `fablab`.`adherent` SET `Password` = ? WHERE (`Mail` = ?)";

$Mail= $_POST["mail"];
$Password=$_POST["mdp"];

if ($stmt = $bdd->prepare($query)) {
$stmt->bind_param('ss', $Password,$Mail);
if($stmt->execute())
$rep=array("success"=>true);

else
$rep=array("success"=>false);
echo(json_encode($rep));
$stmt->close();
}
$bdd->close();