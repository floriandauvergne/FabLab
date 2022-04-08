<?php
$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="fablab";

$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());



$query = "SELECT Prenom,Grade,Photo FROM fablab.adherent WHERE Mail=?";

$mail=$_GET['mail'];
if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('s',$mail);
    $stmt->execute();
    $stmt->bind_result($Prenom,$Grade, $Photo);

    while ($stmt->fetch()) {
        $tab=array("Prenom"=>$Prenom,"Grade"=>$Grade,"Grade"=>$Grade,"Photo"=>$Photo);
    }
    echo(json_encode($tab));
    $stmt->close();
}

