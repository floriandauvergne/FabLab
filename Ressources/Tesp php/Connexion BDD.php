<?php

function connexion (){
    $host="localhost";
    $port=3306;
    $socket="";
    $user="root";
    $password="";
    $dbname="mini_chat";
    $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
    or die ('Could not connect to the database server' . mysqli_connect_error());
    return $con;
}
