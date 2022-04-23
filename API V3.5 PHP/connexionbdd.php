<?php
$host="51.210.151.13";
$port=3306;
$socket="";
$user="fablab";
$password="fablab";
$dbname="fablab";


$bdd = new mysqli($host, $user, $password, $dbname, $port, $socket)
or die ('Could not connect to the database server' . mysqli_connect_error());
