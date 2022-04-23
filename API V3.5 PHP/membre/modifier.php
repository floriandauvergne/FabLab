<?php
include'../connexionbdd.php';



$query = "UPDATE `fablab`.`adherent` SET `Grade` = ? WHERE (`idAdherent` = ?)";
    $Grade = $_POST["grade"];
    $id=$_POST["id"];




if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('ii', $Grade,$id);
    if($stmt->execute())
        $rep=array("success"=>true);

    else
        $rep=array("success"=>false);
    echo(json_encode($rep));
    $stmt->close();
}
$bdd->close();






