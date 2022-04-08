<?php
include'../connexionbdd.php';



$query = "UPDATE `fablab`.`adherent` SET `Grade` = ? WHERE (`Mail` = ?)";
if(isset($_POST["grade"],$_POST["mail"])){
    $Grade = $_POST["grade"];
    $Mail=$_POST["mail"];
}





if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('is', $Grade,$Mail);
    if($stmt->execute())
        $rep=array("success"=>true);

    else
        $rep=array("success"=>false);
    echo(json_encode($rep));
    $stmt->close();
}
$bdd->close();






