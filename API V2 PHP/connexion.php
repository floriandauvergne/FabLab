<?php
//try {
//    $bdd = new PDO('mysql:host=localhost;dbname=fablab', 'root','');
//}
//catch (Exception $e) {
//    die('Erreur de connexion : ' . $e->getMessage());
//}
//$query = "SELECT * FROM fablab.adherent";
//
//
//if ($stmt = $bdd->prepare($query)) {
//    $stmt->execute();
//    $stmt->bind_result($field1,$field2,$field3,$field4,$field5,$field6,$field7,$field8,$field9,$field10,$field11);
//    while ($stmt->fetch()) {
//        echo( $field1.$field2.$field3.$field4.$field5.$field6.$field7.$field8.$field9.$field10.$field11  ) ;
//    }
//    $stmt->close();
//}
$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="fablab";

$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());

$mail=$_GET['mail'];
$password=$_GET['password'];
$query = "SELECT Grade,idAdherent FROM fablab.adherent WHERE Mail=? AND Password=?";

if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('ss',$mail,$password);
    if($stmt->execute()){
        $stmt->bind_result($Grade,$idAdherent);

        while ($stmt->fetch()) {
            $tab=array("succes"=>true,"grade"=>$Grade,"id"=>$idAdherent);
        }
        if(empty($tab)){
            $tab=array("succes"=>false);
        }

        echo(json_encode($tab));

        $stmt->close();
    }

}