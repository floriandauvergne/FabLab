<?php
$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="fablab";

$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());


$query = "SELECT Nom,Prenom,Age,Type,Grade,Tel,Mail,Photo FROM fablab.adherent WHERE Mail='test.admin@lycee-jeanrostand.fr'";

if ($stmt = $bdd->prepare($query)) {
    $stmt->execute();
    $stmt->bind_result($Nom,$Prenom,$Age,$Type,$Grade,$Tel,$Mail,$Photo);
    while ($stmt->fetch()) {$tab=array("Nom"=>$Nom,"Prenom"=>$Prenom,"Age"=>$Age,"Type"=>$Type,"Grade"=>$Grade,"Tel"=>$Tel,"Mail"=>$Mail,"Photo"=>$Photo);
        echo(json_encode($tab));
    }
    $stmt->close();


}


