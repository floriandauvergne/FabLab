<?php
$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="fablab";

$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());
if(isset($_GET['mail']))
    $mail=$_GET['mail'];
else
    $mail=$_POST['mail'];

if(isset($_GET['modif']))
    $modif=$_GET['modif'];
else
    $modif=$_POST['modif'];

if ($_GET['modif']==0){
    $query = "SELECT Nom,Prenom,Age,Type,Grade,Tel,Mail,Photo FROM fablab.adherent WHERE Mail=?";

    if ($stmt = $bdd->prepare($query)) {
        $stmt->bind_param('s',$mail);
        $stmt->execute();
        $stmt->bind_result($Nom,$Prenom,$Age,$Type,$Grade,$Tel,$Mail,$Photo);

        while ($stmt->fetch()) {$tab=array("Nom"=>$Nom,"Prenom"=>$Prenom,"Age"=>$Age,"Type"=>$Type,"Grade"=>$Grade,"Tel"=>$Tel,"Mail"=>$Mail,"Photo"=>$Photo);
            echo(json_encode($tab));
        }
        $stmt->close();


    }
}
else {
    $query = "UPDATE adherent SET `Nom` = ?, `Prenom` = ?, `Age` = ?,`Tel` = ?, `Mail` = ?, `Photo` = ? WHERE (Mail = ?)";
    $mail=$_GET['mail'];
    $mail=$_POST['mail'];
    $Nom = $_POST["nom"];
    $Prenom = $_POST["prenom"];
    $Age = $_POST["age"];
    $Tel = $_POST["tel"];
    $Mail= $_POST["mail"];
    $Photo=$_POST["Photo"];
    $ancien_mail=$_POST["ancien_mail"];



    if ($stmt = $bdd->prepare($query)) {
        $stmt->bind_param('ssissss', $Nom,$Prenom,$Age,$Tel,$Mail,$Photo,$ancien_mail); //FIXME: param types: s- string, i- integer, d- double, b- blob
        if($stmt->execute())
            $rep=array("success"=>true);

        else
            $rep=array("success"=>false);
        echo(json_encode($rep));
        $stmt->close();
    }
}





