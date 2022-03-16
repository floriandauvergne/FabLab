<?php
$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="fablab";

$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());

$query = "SELECT idAdherent,idCadenas,Date FROM fablab.logs";

if ($stmt = $bdd->prepare($query)) {
    $stmt->execute();
    $stmt->bind_result($idAdherent, $idCadenas, $Date);
    $json=array();
    while ($stmt->fetch()) {
        $tab=array("idAdherent"=>$idAdherent,"idCadenas"=>$idCadenas,"Date"=>$Date);
        array_push($json,$tab);
    }
    echo(json_encode($json));
    $stmt->close();


//$con->close();

}