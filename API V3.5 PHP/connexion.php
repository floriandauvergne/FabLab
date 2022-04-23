<?php
header('Access-Control-Allow-Origin: *');
include'connexionbdd.php';

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
