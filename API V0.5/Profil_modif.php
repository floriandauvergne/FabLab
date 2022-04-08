<?php
$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="fablab_v2";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());

//$con->close();
$query = "UPDATE adherent SET `Nom` = ?, `Prenom` = ?, `Age` = ?,`Tel` = ?, `Mail` = ?, `Photo` = ? WHERE (Mail = ?)";


$Nom = "Test";
$Prenom = "Admin";
$Age = 20;
$Tel = "0687451247";
$Mail= "test.admin@lycee-jeanrostand.fr";
$Photo="https://bellevue-marierivier.fr/wp-content/uploads/2018/11/logo_cdi.png";
$ancien_mail="test.admin@lycee-jeanrostand.fr";



if ($stmt = $con->prepare($query)) {
    $stmt->bind_param('ssissss', $Nom,$Prenom,$Age,$Tel,$Mail,$Photo,$ancien_mail); //FIXME: param types: s- string, i- integer, d- double, b- blob
    if($stmt->execute()){
        echo("réussi");
    }
    $stmt->close();
}