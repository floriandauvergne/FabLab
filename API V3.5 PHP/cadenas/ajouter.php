<?php
include'../connexionbdd.php';

if (isset($_POST['id'],$_POST['Niveau'],$_POST['Nom']))
{
    $idCadenas=$_POST['id'];
    $Niveau=$_POST['Niveau'];
    $NomCadenas=$_POST['Nom'];
}
else
{
    $idCadenas=9000;
    $Niveau=6;
    $NomCadenas="test";
}

$query = "INSERT INTO `fablab`.`cadenas` (`idCadenas`, `Niveau`, `NomCadenas`, `Actif`) VALUES (?,?,?,1)";




if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('iis', $idCadenas, $Niveau, $NomCadenas);


    if ($stmt->execute())
        $rep = array("success" => true);
    else
        $rep = array("success" => false);

    echo(json_encode($rep));
    $stmt->close();
}

$bdd->close();
