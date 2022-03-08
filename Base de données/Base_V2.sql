-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: fablab
-- ------------------------------------------------------
-- Server version	5.7.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adherent`
--

DROP TABLE IF EXISTS `adherent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adherent` (
  `idAdherent` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(45) DEFAULT NULL,
  `Prenom` varchar(45) DEFAULT NULL,
  `Mail` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `Grade` int(11) DEFAULT NULL,
  `IDCarte` varchar(45) DEFAULT NULL,
  `Age` varchar(45) DEFAULT NULL,
  `Type` varchar(45) DEFAULT NULL,
  `Tel` varchar(45) DEFAULT NULL,
  `Photo` mediumtext,
  PRIMARY KEY (`idAdherent`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adherent`
--

LOCK TABLES `adherent` WRITE;
/*!40000 ALTER TABLE `adherent` DISABLE KEYS */;
INSERT INTO `adherent` VALUES (0,'Test','Admin','test.admin@lycee-jeanrostand.fr','Admin',4,'54 87 7F E7','20','Eleve','0687451247','./img/no_image_available.png'),(1,'Test','Eleve','test.eleve@lycee-jeanrostand.fr','Eleve',1,'24 0D 7E E7','18','Eleve','0149876148','https://bellevue-marierivier.fr/wp-content/uploads/2018/11/logo_cdi.png'),(60,'e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `adherent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cadenas`
--

DROP TABLE IF EXISTS `cadenas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cadenas` (
  `idCadenas` int(11) NOT NULL,
  `Niveau` varchar(45) DEFAULT NULL,
  `NomCadenas` varchar(45) DEFAULT NULL,
  `Actif` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idCadenas`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadenas`
--

LOCK TABLES `cadenas` WRITE;
/*!40000 ALTER TABLE `cadenas` DISABLE KEYS */;
INSERT INTO `cadenas` VALUES (3000,'3','Découpe Laser',1),(2000,'2','Porte Entrée',1),(8000,'1','Casier Admin',1),(4000,'2','Imprimante 3D',1);
/*!40000 ALTER TABLE `cadenas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `idAdherent` varchar(45) NOT NULL,
  `idCadenas` varchar(45) DEFAULT NULL,
  `Date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES ('54','2500',NULL),('54','2500',NULL),('54','2500',NULL),('54','2500','2012-02-13 00:00:00'),('54','2500','2012-02-13 00:00:00'),('54','2500','2012-02-13 00:30:25');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-08 15:07:52
