<?php
try {
    $bdd = new PDO('mysql:host=localhost;dbname=fablab', 'root','');
}
catch (Exception $e) {
    die('Erreur de connexion : ' . $e->getMessage());
}

if(isset($_GET['nom'])){
$email=$_GET['nom'];
//connexion bdd
//preparation de la requête avec les variables $_POST du formulaire
$req = $bdd->prepare('SELECT Nom,Prenom,Age,Type,Grade,Tel,Mail,Photo FROM fablab.adherent WHERE Mail=:email');
$req->execute(array('email' => $email)) or die(print_r($req->errorInfo()));
$donnee = $req->fetch();
echo(json_encode($donnee));
$req->closeCursor();
}

if(isset($_GET['cadenas'])){
    if($_GET['cadenas']=="Affiche"){
        $return_arr = array();
//connexion bdd
//preparation de la requête avec les variables $_POST du formulaire
        $rep = $bdd->query('SELECT * FROM cadenas');
        while ( $donnee = $rep->fetch() ) {
            $row_array['id'] =   $donnee['idCadenas'];
            $row_array['Niveau'] = $donnee['Niveau'];
            $row_array['Nom_vero'] = $donnee['Nom_vero'];
            array_push($return_arr,$row_array);
        }
        echo(json_encode($return_arr));
    }
    elseif($_GET['cadenas']=="Ajout"){
        $rep = $bdd->query('INSERT INTO `fablab`.`cadenas` (`idCadenas`, `Niveau`) VALUES ('.$_GET['cadenas_id'].','.$_GET['niv_secu'].')');
        if($rep)
            echo (json_encode("reussite"));

        else
            echo (json_encode("echec"));
    }

    elseif ($_GET['cadenas']=="Supprime"){
        $rep = $bdd->query('DELETE FROM `fablab`.`cadenas` WHERE idCadenas='.$_GET['cadenas_id']);
        if($rep)
        echo (json_encode("reussite"));

        else
            echo (json_encode("echec"));
    }

    elseif ($_GET['cadenas']=="Modif"){
        $rep = $bdd->query('UPDATE fablab.cadenas SET idCadenas='.$_GET['cadenas_id'].', Niveau= '.$_GET['niv_secu'].' WHERE (idCadenas = '.$_GET['ancien_id'].')');
        if($rep)
            echo (json_encode("reussite"));

        else
            echo (json_encode("echec"));
    }
}