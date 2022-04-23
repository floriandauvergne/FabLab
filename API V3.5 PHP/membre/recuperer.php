<?php
include'../connexionbdd.php';


$query = "SELECT idAdherent,Nom,Prenom,Age,Type,Grade,Tel,Mail,Photo,iduid FROM fablab.adherent left join fablab.carte on carte_idAdherent=idAdherent order by idAdherent desc";
$json = array();
if ($stmt = $bdd->prepare($query)) {
    $stmt->execute();
    $stmt->bind_result($id, $Nom, $Prenom, $Age, $Type, $Grade, $Tel, $Mail, $Photo,$iduid);
    $nombre = 0;
    while ($stmt->fetch()) {

        switch ($Grade){
            case "1":$Grade_complet="Member";break;
            case "2":$Grade_complet="Teacher";break;
            case "3":$Grade_complet="Manager";break;
            case "4":$Grade_complet="Admin";break;
        };
        if($iduid==null){
            $iduid="Aucune carte n'est attribuée";
        }

        $nombre++;

        $tab_nombre=array("Nombre"=>$nombre);
        $tab = array("Nom" => $Nom, "Prenom" => $Prenom, "Age" => $Age, "Type" => $Type, "Grade" => $Grade, "Tel" => $Tel, "Mail" => $Mail, "Photo" => $Photo, "ID" => $id,"iduid"=>$iduid,"Grade_complet"=>$Grade_complet);
        array_push($json, $tab);

    }
    array_push($json, $tab_nombre);
    echo(json_encode($json));
    $stmt->close();
}

$bdd->close();

//if(isset($_GET["limite"])){
//    $limite=$_GET["limite"];
//    $query = "SELECT idAdherent,Nom,Prenom,Age,Type,Grade,Tel,Mail,Photo FROM fablab.adherent order by idAdherent desc limit ?";
//    $json=array();
//    if ($stmt = $bdd->prepare($query)) {
//        $stmt->bind_param("i",$limite);
//        $stmt->execute();
//        $stmt->bind_result($id,$Nom, $Prenom, $Age, $Type, $Grade, $Tel, $Mail, $Photo);
//        while ($stmt->fetch()) {$tab=array("Nom"=>$Nom,"Prenom"=>$Prenom,"Age"=>$Age,"Type"=>$Type,"Grade"=>$Grade,"Tel"=>$Tel,"Mail"=>$Mail,"Photo"=>$Photo,"ID"=>$id);
//            array_push($json,$tab);
//        }
//        echo(json_encode($json));
//        $stmt->close();
//    }
//}
//
//if(isset($_GET["nombre"])){
//    $query = "SELECT Nom FROM fablab.adherent";
//    $json=array();
//    if ($stmt = $bdd->prepare($query)) {
//        $stmt->execute();
//        $stmt->bind_result($Nom);
//        $nombre=0;
//
//        while ($stmt->fetch()) {
//            $nombre++;
//        }
//        $json=array("Nombre"=>$nombre);
//        $stmt->close();
//    }
//    echo(json_encode($json));
//}
//
//
//$bdd->close();