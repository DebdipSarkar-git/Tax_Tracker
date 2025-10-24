DROP SCHEMA IF EXISTS authms_db;
CREATE SCHEMA authms_db;
USE authms_db;

CREATE TABLE `authms_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `mobile_no` DECIMAL(10) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `role` VARCHAR(10) NOT NULL,
  `address_line1` VARCHAR(50) NOT NULL,
  `address_line2` VARCHAR(50) NOT NULL,
  `area` VARCHAR(50) NOT NULL,
  `city` VARCHAR(30) NOT NULL,
  `state` VARCHAR(30) NOT NULL,
  `pincode` DECIMAL(6) NOT NULL,
  `created_at` DATETIME not null,
  `updated_at` DATETIME,
  PRIMARY KEY (`id`));
  
  SELECT * FROM authms_db.users;