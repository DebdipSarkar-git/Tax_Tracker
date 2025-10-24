DROP SCHEMA IF EXISTS document_db;
CREATE SCHEMA document_db;
USE document_db;
CREATE TABLE `uploaded_files` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `upload_date` date NOT NULL,
  `file_name` varchar(50) DEFAULT NULL,
  `file_type` varchar(255) NOT NULL,
  `file_data` mediumblob NOT NULL,
  `size` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
);