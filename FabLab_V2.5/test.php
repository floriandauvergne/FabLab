<?php
$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="fablab";


$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());

$Mail = 'test.eleve@lycee-jeanrostand.fr';
$tab=array();
$t_tab=array();


$query = "SELECT Grade FROM fablab.adherent WHERE Mail=?";
if ($stmt = $con->prepare($query)) {
    $stmt->bind_param('s', $Mail); //FIXME: param types: s- string, i- integer, d- double, b- blob
    $stmt->execute();
    $stmt->bind_result($Grade);
    while ($stmt->fetch()) {
        $tab=(array("Grade"=>$Grade));
        echo json_encode($tab);
    }
    $stmt->close();
}

$query = "SELECT Nom,Prenom,Mail,Grade,Age,Type,Tel,Photo FROM fablab.adherent";

if ($stmt = $con->prepare($query)) {
    $stmt->execute();
    $stmt->bind_result($Nom, $Prenom, $Mail, $Grade, $Age, $Type, $Tel, $Photo);

    while ($stmt->fetch()) {
        $tab=(array("Nom"=>$Nom,"Prenom"=>$Prenom,"Mail"=>$Mail,"Grade"=>$Grade,"Age"=>$Age,"Type"=>$Type,"Tel"=>$Tel,"Photo"=>$Photo));
        array_push($t_tab,$tab);
    }
    echo json_encode($t_tab);
    $stmt->close();
}

//$mail="test.admin@lycee-jeanrostand.fr";
//$tab=array();
//
//$query = "SELECT Nom,Prenom FROM fablab.adherent WHERE Mail='$mail'";
//
//
//if ($stmt = $con->prepare($query)) {
//    $stmt->execute();
//    $stmt->bind_result($Nom, $Prenom);
//    while ($stmt->fetch()) {
//        $tab["Nom"]=$Nom;
//        $tab["Prenom"]=$Prenom;
//        echo(json_encode($tab));
//    }
//    $stmt->close();
//}

//$query = "SELECT Nom,Prenom,Mail,Grade,Age,Type,Tel,Photo FROM fablab.adherent WHERE Mail=?";
//
//if ($stmt = $con->prepare($query)) {
//    $stmt->bind_param('s', $Mail); //FIXME: param types: s- string, i- integer, d- double, b- blob
//    $stmt->execute();
//    $stmt->bind_result($Nom, $Prenom, $Mail, $Grade, $Age, $Type, $Tel, $Photo);
//    while ($stmt->fetch()) {
//        printf("%s, %s, %s, %s, %s, %s, %s, %s\n", $Nom, $Prenom, $Mail, $Grade, $Age, $Type, $Tel, $Photo);
//    }
//    $stmt->close();
//}
$con->close();
