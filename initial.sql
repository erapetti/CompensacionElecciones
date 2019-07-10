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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
  `FechaAnulacion` datetime DEFAULT NULL,
  `UsrAnulacion` varchar(255) DEFAULT NULL,
  `FechaEnvioAnulacion` datetime DEFAULT NULL,
  `CompElecPeriodoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`CompElecPeriodoOpcionId`),
  UNIQUE KEY `CompElecPeriodoOpcionId` (`CompElecPeriodoOpcionId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPELECPERIODOSOPCIONES`
--

LOCK TABLES `COMPELECPERIODOSOPCIONES` WRITE;
/*!40000 ALTER TABLE `COMPELECPERIODOSOPCIONES` DISABLE KEYS */;
INSERT INTO `COMPELECPERIODOSOPCIONES` VALUES (1,538,1023,'actuacion','licencia','2019-07-06 03:08:29','u19724241',NULL,NULL,'',NULL,1),(2,5313,1023,'actuacion','dinero','2019-07-06 03:27:36','u19724241',NULL,NULL,'',NULL,1),(3,5077,1023,'asistencia','dinero','2019-07-06 03:27:54','u19724241',NULL,NULL,'',NULL,1),(4,5976,1023,'asistencia','licencia','2019-07-06 03:28:02','u19724241',NULL,NULL,'',NULL,1),(5,76015,1023,'nopresenta','licencia','2019-07-06 03:30:53','u19724241',NULL,NULL,'',NULL,1),(6,78606,1023,'asistencia','licencia','2019-07-06 03:31:01','u19724241',NULL,NULL,'',NULL,1),(7,538,1023,'asistencia','licencia','2019-07-06 03:31:36','u19724241',NULL,NULL,'',NULL,1),(8,538,1023,'actuacion','licencia','2019-07-06 03:41:09','u19724241',NULL,NULL,'',NULL,1),(9,538,1023,'asistencia','licencia','2019-07-06 03:41:16','u19724241',NULL,NULL,'',NULL,1),(10,538,1023,'nopresenta','licencia','2019-07-06 03:41:21','u19724241',NULL,NULL,'',NULL,1),(11,6199,1023,'actuacion','licencia','2019-07-06 16:30:41','u19724241',NULL,NULL,'',NULL,1),(12,5077,1023,'actuacion','licencia','2019-07-06 17:37:50','u19724241',NULL,NULL,'',NULL,1),(13,5976,1023,'actuacion','dinero','2019-07-06 17:40:56','u19724241',NULL,NULL,'',NULL,1),(14,5976,1014,'nopresenta','dinero','2019-07-06 17:41:06','u19724241',NULL,NULL,'',NULL,1),(15,538,1014,'asistencia','licencia','2019-07-06 18:24:50','u19724241',NULL,NULL,'',NULL,1),(16,5976,1023,'nopresenta','licencia','2019-07-06 18:26:06','u19724241',NULL,NULL,'',NULL,1),(17,21767,1023,'asistencia','dinero','2019-07-06 19:09:10','u19724241',NULL,NULL,'',NULL,1),(18,21767,1023,'nopresenta','dinero','2019-07-06 19:09:19','u19724241',NULL,NULL,'',NULL,1),(19,23139,1023,'asistencia','licencia','2019-07-10 11:22:11','u19724241',NULL,NULL,'',NULL,1),(20,23139,1023,'actuacion','licencia','2019-07-10 11:22:18','u19724241',NULL,NULL,'',NULL,1),(21,23139,1023,'nopresenta','licencia','2019-07-10 11:22:23','u19724241',NULL,NULL,'',NULL,1);
/*!40000 ALTER TABLE `COMPELECPERIODOSOPCIONES` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-10 11:23:14
