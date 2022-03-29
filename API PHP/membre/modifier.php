<?php
$host = "localhost";
$port = 3306;
$socket = "";
$user = "root";
$password = "";
$dbname = "fablab";

$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());

$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());

$mail=$_POST['mail'];
$query = "s";
$mail=$_GET['mail'];
$mail=$_POST['mail'];
$Nom = $_POST["nom"];
$Prenom = $_POST["prenom"];
$Age = $_POST["age"];
$Tel = $_POST["tel"];
$Mail= $_POST["mail"];
$Photo=$_POST["Photo"];
$ancien_mail=$_POST["ancien_mail"];




if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('ssissss', $Nom,$Prenom,$Age,$Tel,$Mail,$Photo,$ancien_mail);
    if($stmt->execute())
        $rep=array("success"=>true);

    else
        $rep=array("success"=>false);
    echo(json_encode($rep));
    $stmt->close();
}
