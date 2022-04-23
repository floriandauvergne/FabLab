<?php
include '../connexionbdd.php';

$idCadenas = $_GET['idCadenas'];
$idCarte = $_GET['idCarte'];
$idAdherent = 0;
$Actif1 = 0;
$Actif2 = 0;
$GradeAdherent = 0;
$NiveauCadenas = 0;


//Requête pour trouver le grade de l'utilisateur en fonction de l'ID de sa carte
$query = "SELECT idAdherent,Grade,Actif FROM fablab.carte INNER JOIN adherent ON idAdherent = carte_idAdherent where iduid = ?;";

if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('s', $idCarte);

    if ($stmt->execute()) {
        $stmt->bind_result($idAdherent,$Grade, $Actif);

        //Si la carte est reliée à un utilisateur
        if ($stmt->fetch()) {
            $GradeAdherent = $Grade;
            $Actif1 = $Actif;
            $idAdherent = $idAdherent;

        } else { //Si pas de réponse de la requête
            //Requête pour voir si la carte a un utilisateur
            $query3 = "SELECT carte_idAdherent FROM fablab.carte where iduid = ?";
            if ($stmt3 = $bdd->prepare($query3)) {
                $stmt3->bind_param('i', $idCarte);
                if ($stmt3->execute()) {
                    $stmt3->bind_result($carte_idAdherent);

                    //Si il n'y a pas de réponse -> la carte n'existe pas
                    if (!$stmt3->fetch()) {
                        //Si la carte n'existe pas -> Création dans la BDD avec son uid
                        $query = "INSERT INTO `fablab`.`carte` (`carte_idAdherent`, `Actif`, `iduid`) VALUES (0,0,?)";
                        if ($stmt2 = $bdd->prepare($query)) {
                            $stmt2->bind_param('s', $idCarte);
                            $stmt2->execute();
                            $stmt2->close();
                        }
                    }
                    $stmt3->close();
                }
            }
        }
    }
    $stmt->close();
}

//Requête pour trouver le niveau du cadenas en fonction de son ID
$query = "SELECT Niveau,Actif FROM fablab.cadenas where idMacAddress = ?;";

if ($stmt = $bdd->prepare($query)) {
    $stmt->bind_param('s', $idCadenas);
    if ($stmt->execute()) {
        $stmt->bind_result($Niveau, $Actif);

        while ($stmt->fetch()) {
            $NiveauCadenas = $Niveau;
            $Actif2 = $Actif;
        }
        $stmt->close();
    }

}


//Vérifie que le cadenas et la carte sont actif
if ($Actif1 != 0 && $Actif2 != 0) {
    //Verifie que l'utilisateur à le grade requis pour ouvrir le cadenas
    if ($GradeAdherent >= $NiveauCadenas) {
        $tab = array("succes" => true, "idCadenas" => $idCadenas);

        //Ajoute l'action dans les logs

        date_default_timezone_set('Europe/Paris');
        $date=date("y-m-d");
        $horaire=date("H:i:s");

        $query4 = "INSERT INTO `fablab`.`logs` (`cadenas_idCadenas`, `adherent_idAdherent`, `Horaire`, `Date`) VALUES (?,?,?,?)";
        if ($stmt4 = $bdd->prepare($query4)) {
            $stmt4->bind_param('siss', $idCadenas, $idAdherent, strval($horaire), strval($date));
            $stmt4->execute();

            $stmt4->close();
        }

    } else {
        $tab = array("succes" => false, "idCadenas" => $idCadenas);
    }
} else {
    $tab = array("succes" => false, "idCadenas" => $idCadenas);
}


echo(json_encode($tab));
$stmt->close();
