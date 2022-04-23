<?php
include'../connexionbdd.php';

date_default_timezone_set('Europe/Paris');
$heure=date("G");
$minute=date("i");
$h1=$heure+1;
$h0=$heure-1;

$date=strftime("%Y-%m-%d");

if(intval($heure)>=14){
    $query=" SELECT adherent_idAdherent,Nom,Prenom,Photo,Grade FROM logs INNER JOIN adherent ON adherent_idAdherent = idAdherent where HOUR(Horaire) = {$heure} AND Date=\"{$date}\" OR HOUR(Horaire) = {$h1} AND Date=\"{$date}\" GROUP BY adherent_idAdherent ";
}
else{
    if(intval($minute)>30){
        $query=" SELECT adherent_idAdherent,Nom,Prenom,Photo,Grade FROM logs INNER JOIN adherent ON adherent_idAdherent = idAdherent where HOUR(Horaire) = {$heure} AND MINUTE(Horaire) >=30 AND Date=\"{$date}\" OR HOUR(Horaire) = {$h1} AND MINUTE(Horaire) <30 AND Date=\"{$date}\" GROUP BY adherent_idAdherent";
    }else{
        $query=" SELECT adherent_idAdherent,Nom,Prenom,Photo,Grade FROM logs INNER JOIN adherent ON adherent_idAdherent = idAdherent where HOUR(Horaire) = {$h0} AND MINUTE(Horaire) >=30 AND Date=\"{$date}\" OR HOUR(Horaire) = {$heure} AND MINUTE(Horaire) <30 AND Date=\"{$date}\" GROUP BY adherent_idAdherent";
    }
}

if ($stmt = $bdd->prepare($query)) {
    $stmt->execute();
    $stmt->bind_result($idAdherent, $Nom,$Prenom,$Photo,$Grade);
    $json = array();
    $tab=array("Heure"=>$heure,"Minute"=>$minute);
    array_push($json,$tab);
    while ($stmt->fetch()) {
        switch ($Grade){
            case 1:$Grade="Member";$Couleur="primary";break;
            case 2:$Grade="Teacher";$Couleur="success";break;
            case 3:$Grade="Manager";$Couleur="warning";break;
            case 4:$Grade="Admin";$Couleur="danger";break;
        }
        
            $tab=array("Nom"=>$Nom,"Prenom"=>$Prenom,"Photo"=>$Photo,"Grade"=>$Grade,"Couleur"=>$Couleur);
                array_push($json,$tab);

    }
    echo(json_encode($json));
    $stmt->close();
}
$bdd->close();