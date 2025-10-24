DROP SCHEMA IF EXISTS taxtracker_db;
CREATE SCHEMA taxtracker_db;
USE taxtracker_db;

CREATE TABLE `taxtracker_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `mobile_no` DECIMAL(10) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `addressLine1` VARCHAR(40) NOT NULL,
  `addressLine2` VARCHAR(60) NOT NULL,
  `area` VARCHAR(30) NOT NULL,
  `city` VARCHAR(20) NOT NULL,
  `state` VARCHAR(70) NOT NULL,
  `pincode` DECIMAL(6) NOT NULL,
  PRIMARY KEY (`id`));