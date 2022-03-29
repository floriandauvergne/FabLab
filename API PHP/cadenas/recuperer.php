<?php
$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="fablab";

$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());

$query = "SELECT idCadenas,Niveau,NomCadenas,Actif FROM fablab.cadenas";

if ($stmt = $bdd->prepare($query)) {
    $stmt->execute();
    $stmt->bind_result($idCadenas, $Niveau, $NomCadenas, $Actif);
    $json=array();

    while ($stmt->fetch()) {
        $tab=array("idCadenas"=>$idCadenas, "Niveau"=>$Niveau, "NomCadenas"=>$NomCadenas, "Actif"=>$Actif);
        array_push($json,$tab);


    }

    echo(json_encode($json));
    $stmt->close();
}

