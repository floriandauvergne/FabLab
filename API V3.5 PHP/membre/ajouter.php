<?php
include'../connexionbdd.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

function random_str(
    $length,
    $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) {
    $str = '';
    $max = mb_strlen($keyspace, '8bit') - 1;
    if ($max < 1) {
        throw new Exception('$keyspace must be at least two characters long');
    }
    for ($i = 0; $i < $length; ++$i) {
        $str .= $keyspace[random_int(0, $max)];
    }
    return $str;
}
$Nom = $_POST["Nom"];

$Prenom = $_POST["Prenom"];

$Mail = $_POST["Mail"];

$Password = random_str(16);

$Grade = $_POST["Grade"];

$Age = $_POST["Age"];

$Type = $_POST["Type"];

$Tel = "0123456793";

$Photo = "/btssnir/projets2022/fablab/Photos de profils/photo_profil.jpg";


//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 0;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth = true;                                   //Enable SMTP authentication
    $mail->Username = 'fablabjr127@gmail.com';                     //SMTP username
    $mail->Password = 'fablab92';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('fablabjr127@gmail.com', 'Le personnel du FabLab');
    $mail->addAddress($Mail, $Nom." ".$Prenom);     //Add a recipient
//    $mail->addAddress('ellen@example.com');               //Name is optional
//    $mail->addReplyTo('info@example.com', 'Information');
//    $mail->addCC('cc@example.com');
//    $mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    //$mail->addAttachment('../../site 2/Image/Fablab_logo-removebg-preview (3).png', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body = '<b>Votre inscription au FabLab a bien été effectué</b><p>Vos identifiants:<b>'.$Mail.'</b><br>Votre mot de passe: <b>'.$Password.'</b></p>';
    $mail->AltBody = 'Votre inscription au FabLab a bien été effectué Vos identifiants: '.$Mail.' Votre mot de passe: '.$Password;

    $mail->send();

    $query = "INSERT INTO `fablab`.`adherent` (`Nom`, `Prenom`, `Mail`, `Password`, `Grade`, `Age`, `Type`, `Tel`, `Photo`) VALUES (?,?,?,?,?,?,?,?,?);";

    if ($stmt = $bdd->prepare($query)) {
        $stmt->bind_param("ssssissss", $Nom, $Prenom, $Mail, $Password, $Grade, $Age, $Type, $Tel, $Photo);
        if ($stmt->execute()){
            $rep = array("success" => true);
        }

        else
            $rep = array("success" => false);

        $stmt->close();
    }
} catch (Exception $e) {
    $rep = array("success" => "mail");
}

echo(json_encode($rep));




