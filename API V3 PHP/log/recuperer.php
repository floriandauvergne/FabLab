<?php
include'../connexionbdd.php';
function dateFR($datetime) {
    setlocale(LC_ALL, 'fr_FR');
    return strftime('%e/%m/%Y', strtotime($datetime));
}

$query = "SELECT cadenas_idCadenas, adherent_idAdherent, Date FROM logs";

if ($stmt = $bdd->prepare($query)) {
    $stmt->execute();
    $stmt->bind_result($idAdherent, $idCadenas, $Date);
    $json=array();

    while ($stmt->fetch()) {
        $Date=dateFR($Date);
        $tab=array("idAdherent"=>$idAdherent,"idCadenas"=>$idCadenas,"Date"=>$Date);
        array_push($json,$tab);
    }
    echo(json_encode($json));
    $stmt->close();
//    -- DELETE FROM fablab.logs WHERE adherent_idAdherent=2 AND cadenas_idCadenas=3000;
//-- INSERT INTO fablab.logs (cadenas_idCadenas, adherent_idAdherent, Horaire, Date) VALUES (2000,5,"17:50:00","2022-05-06");
}