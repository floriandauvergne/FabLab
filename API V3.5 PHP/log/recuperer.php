<?php
include'../connexionbdd.php';

function dateFR($datetime) {
    //setlocale(LC_ALL, 'fr_FR');
    return strftime('%A/%e/%m/%Y', strtotime($datetime));
}

//-- DELETE FROM fablab.logs WHERE adherent_idAdherent=2 AND cadenas_idCadenas=3000;
//-- INSERT INTO fablab.logs (cadenas_idCadenas, adherent_idAdherent, Horaire, Date) VALUES (2000,5,"17:50:00","2022-05-06");
//$query = "SELECT cadenas_idCadenas, adherent_idAdherent, Date FROM logs";

if(isset($_GET["brut"])){
    $query ="SELECT  Nom,Prenom,Date,DATE_FORMAT(Horaire,'%k:%i')as Horaire,NomCadenas  FROM fablab.adherent inner join logs on adherent_idAdherent=idAdherent inner join cadenas on idMacAddress=cadenas_idCadenas order by Date,Horaire desc";
    if ($stmt = $bdd->prepare($query)) {
        $json=array();

        $stmt->execute();
        $stmt->bind_result($Nom,$Prenom,$Date,$Horaire,$NomCadenas);

        while ($stmt->fetch()) {
            $Date=dateFR($Date);
            $temp=explode("/",$Date);
            $jour=$temp[0];
            $Date=$temp[1]."/".$temp[2]."/".$temp[3];
            $tab=array("Nom"=>$Nom,"Prenom"=>$Prenom,"NomCadenas"=>$NomCadenas,"Date"=>$Date,"Horaire"=>$Horaire,"Jour"=>$temp[0]);
            array_push($json,$tab);

        }
        echo(json_encode($json));
        $stmt->close();
}
}
    if(isset($_GET["cadenas"])){
        $query ="SELECT count(cadenas_idCadenas) as badger, NomCadenas,date,cadenas_idCadenas FROM fablab.logs INNER JOIN cadenas on cadenas_idCadenas = idCadenas WHERE month(date) = 5 group by cadenas_idCadenas,date, NomCadenas ORDER BY badger asc ;";
        if ($stmt = $bdd->prepare($query)) {
            $json=array();
            $stmt->execute();
            $stmt->bind_result($badger,$NomCadenas,$date, $idCadenas);

            while ($stmt->fetch()) {
                $tab=array("badger"=>$badger,"NomCadenas"=>$NomCadenas);
                array_push($json,$tab);

            }
            echo(json_encode($json));
            $stmt->close();
    }
}

//$query = "select * FROM fablab.logs WHERE adherent_idAdherent = 93 and Date = \"2022-04-22\"";

