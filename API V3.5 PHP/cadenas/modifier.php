<?php
include'../connexionbdd.php';

$host = "51.210.151.13";
$port = 3306;
$socket = "";
$user = "fablab";
$password = "fablab";
$dbname = "fablab";


$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());


$query = "UPDATE `fablab`.`cadenas` SET `Niveau` = ?, `NomCadenas` = ?, `Actif` = ? WHERE (`idCadenas` = ?);";

$idCadenas=$_POST['id'];
$Niveau=$_POST['Niveau'];
$NomCadenas=$_POST['Nom'];
$Actif=1;

//$idCadenas=2000;
//$Niveau=1;
//$NomCadenas="Porte entree";
//$Actif=1;

if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('isii', $Niveau, $NomCadenas, $Actif,$idCadenas);
    if ($stmt->execute())
        $rep = array("success" => true);
    else
        $rep = array("success" => false);

    echo(json_encode($rep));
    $stmt->close();

}
$bdd->close();






