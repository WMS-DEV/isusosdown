/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chart_tag`
--

DROP TABLE IF EXISTS `chart_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chart_tag` (
                             `id` int NOT NULL AUTO_INCREMENT,
                             `tag` varchar(60) DEFAULT NULL,
                             `description` varchar(250) DEFAULT NULL,
                             `start_date` date DEFAULT NULL,
                             `end_date` date DEFAULT NULL,
                             `type` varchar(45) DEFAULT NULL,
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `combined_service_stats`
--

DROP TABLE IF EXISTS `combined_service_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combined_service_stats` (
                                          `url` varchar(125) NOT NULL,
                                          `total_downtime_millis` bigint DEFAULT NULL,
                                          `latest_downtime_end_date` timestamp NULL DEFAULT NULL,
                                          PRIMARY KEY (`url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `downtime`
--

DROP TABLE IF EXISTS `downtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `downtime` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `url` varchar(200) DEFAULT NULL,
                            `start_date` timestamp NULL DEFAULT NULL,
                            `end_date` timestamp NULL DEFAULT NULL,
                            `duration_millis` int DEFAULT NULL,
                            `tracked_service_id` int DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            KEY `URL` (`url`),
                            KEY `id_tracked_service_idx` (`tracked_service_id`),
                            CONSTRAINT `tracked_service_id` FOREIGN KEY (`tracked_service_id`) REFERENCES `tracked_service` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=267796 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `downtimes_per_day`
--

DROP TABLE IF EXISTS `downtimes_per_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `downtimes_per_day` (
                                     `url` varchar(125) NOT NULL,
                                     `date_` date DEFAULT NULL,
                                     `number_of_downtime` int DEFAULT NULL,
                                     PRIMARY KEY (`url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `flyway_schema_history`
--

DROP TABLE IF EXISTS `flyway_schema_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flyway_schema_history` (
                                         `installed_rank` int NOT NULL,
                                         `version` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
                                         `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                                         `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                                         `script` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                                         `checksum` int DEFAULT NULL,
                                         `installed_by` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                                         `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                         `execution_time` int NOT NULL,
                                         `success` tinyint(1) NOT NULL,
                                         PRIMARY KEY (`installed_rank`),
                                         KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usos_frontpage_meme`
--

DROP TABLE IF EXISTS `usos_frontpage_meme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usos_frontpage_meme` (
                                       `id` int NOT NULL AUTO_INCREMENT,
                                       `content` varchar(225) NOT NULL,
                                       PRIMARY KEY (`id`),
                                       UNIQUE KEY `id_UNIQUE` (`id`),
                                       UNIQUE KEY `content_UNIQUE` (`content`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `service_response_time`
--

DROP TABLE IF EXISTS `service_response_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_response_time` (
                                         `id` int NOT NULL AUTO_INCREMENT,
                                         `service_url` varchar(45) DEFAULT NULL,
                                         `response_time` int DEFAULT NULL,
                                         `response_date` date DEFAULT NULL,
                                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2701428 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tracked_service`
--

DROP TABLE IF EXISTS `tracked_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracked_service` (
                                   `id` int NOT NULL AUTO_INCREMENT,
                                   `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                                   `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                                   `is_active` tinyint(1) NOT NULL DEFAULT '1',
                                   `group_id` int DEFAULT NULL,
                                   PRIMARY KEY (`id`),
                                   UNIQUE KEY `id_UNIQUE` (`id`),
                                   UNIQUE KEY `name_UNIQUE` (`name`),
                                   UNIQUE KEY `url_UNIQUE` (`url`),
                                   KEY `id_idx` (`group_id`),
                                   CONSTRAINT `group_id` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `traffic_stats`
--

DROP TABLE IF EXISTS `traffic_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `traffic_stats` (
                                 `id` int NOT NULL AUTO_INCREMENT,
                                 `service` varchar(45) DEFAULT NULL,
                                 `total_visits_this_month` int DEFAULT NULL,
                                 `bounce_rate_percentage` decimal(10,0) DEFAULT NULL,
                                 `pages_per_visit` decimal(10,0) DEFAULT NULL,
                                 `average_visit_duration_millis` bigint DEFAULT NULL,
                                 `query_date` datetime DEFAULT NULL,
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;