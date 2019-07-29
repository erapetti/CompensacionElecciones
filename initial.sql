-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: Personal
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `COMPELECPERIODOS`
--

DROP TABLE IF EXISTS `COMPELECPERIODOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COMPELECPERIODOS` (
  `CompElecPeriodoId` int(11) NOT NULL,
  `CompElecDesc` varchar(255) DEFAULT NULL,
  `CompElecAnio` double DEFAULT NULL,
  `CompElecDesde` date DEFAULT NULL,
  `CompElecHasta` date DEFAULT NULL,
  `CompElecLicenciaEscalafones` varchar(255) DEFAULT NULL,
  `CompElecLicenciaAsistencia` int(1) DEFAULT NULL,
  `CompElecLicenciaActuacion` int(1) DEFAULT NULL,
  `CompElecDineroEscalafones` varchar(255) DEFAULT NULL,
  `CompElecDineroAsistencia` int(1) DEFAULT NULL,
  `CompElecDineroActuacion` int(1) DEFAULT NULL,
  PRIMARY KEY (`CompElecPeriodoId`),
  UNIQUE KEY `CompElecPeriodoId` (`CompElecPeriodoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPELECPERIODOS`
--

LOCK TABLES `COMPELECPERIODOS` WRITE;
/*!40000 ALTER TABLE `COMPELECPERIODOS` DISABLE KEYS */;
INSERT INTO `COMPELECPERIODOS` VALUES (1,'Elecciones Internas 2019',2019,'2019-07-01','2019-12-31',NULL,3,5,'H',2000,5000);
/*!40000 ALTER TABLE `COMPELECPERIODOS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COMPELECPERIODOSOPCIONES`
--

DROP TABLE IF EXISTS `COMPELECPERIODOSOPCIONES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COMPELECPERIODOSOPCIONES` (
  `CompElecPeriodoOpcionId` int(11) NOT NULL AUTO_INCREMENT,
  `PersonalPerId` double DEFAULT NULL,
  `DependId` double DEFAULT NULL,
  `Tipo` varchar(255) DEFAULT NULL,
  `Compensacion` varchar(255) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT NULL,
  `UsrRegistro` varchar(255) DEFAULT NULL,
  `FechaEnvio` datetime DEFAULT NULL,
  `CompElecPeriodoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`CompElecPeriodoOpcionId`),
  UNIQUE KEY `CompElecPeriodoOpcionId` (`CompElecPeriodoOpcionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-10 11:23:14

-- v0.0.2
alter table COMPELECPERIODOS drop column CompElecAnio;
alter table COMPELECPERIODOS add column CompElecFecha date after CompElecDesc;
update COMPELECPERIODOS set CompElecFecha='2019-06-30' where CompElecPeriodoId=1;

-- v1.0.2
alter table COMPELECPERIODOS modify column CompElecPeriodoId int(11) not null auto_increment;

