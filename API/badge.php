<?php
$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="fablab";

$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());

$query = "SELECT Niveau,Grade FROM adherent inner join cadenas  Where idCadenas='3000' and IDCarte='54 87 7F E7'";

if ($stmt = $bdd->prepare($query)) {
    $stmt->execute();
    $stmt->bind_result($Niveau, $Grade);
    $json=array();
    while ($stmt->fetch()) { $tab=array("Cadenas"=>$Niveau,"Adherent"=>$Grade);
        array_push($json,$tab);
    }
    echo(json_encode($tab));
    $stmt->close();


//$con->close();

}