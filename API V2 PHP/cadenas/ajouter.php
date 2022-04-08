<?php
$host = "localhost";
$port = 3306;
$socket = "";
$user = "root";
$password = "";
$dbname = "fablab";

$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());

if (isset($_POST['id'],$_POST['Niveau'],$_POST['Nom']))
{
    $idCadenas=$_POST['id'];
    $Niveau=$_POST['Niveau'];
    $NomCadenas=$_POST['Nom'];
}
else
{
    $idCadenas=9000;
    $Niveau=6;
    $NomCadenas="test";
}

$query = "INSERT INTO `fablab`.`cadenas` (`idCadenas`, `Niveau`, `NomCadenas`, `Actif`) VALUES (?,?,?,1)";




if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('iis', $idCadenas, $Niveau, $NomCadenas);


    if ($stmt->execute())
        $rep = array("success" => true);
    else
        $rep = array("success" => false);

    echo(json_encode($rep));
    $stmt->close();
}
