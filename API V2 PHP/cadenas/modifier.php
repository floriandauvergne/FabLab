<?php
$host = "localhost";
$port = 3306;
$socket = "";
$user = "root";
$password = "";
$dbname = "fablab";

$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());

$query = "INSERT INTO `fablab`.`cadenas` (`idCadenas`=?, `Niveau`=?, `NomCadenas`=?, `Actif`=?,) VALUES (?,?,?,?)";

$idCadenas=$_POST['id'];
$Niveau=$_POST['Niveau'];
$NomCadenas=$_POST['Nom'];

if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('iisi ', $idCadenas, $Niveau, $NomCadenas, $Actif);
    if ($stmt->execute())
        $rep = array("success" => true);

    else
        $rep = array("success" => false);
    echo(json_encode($rep));
    $stmt->close();

}






