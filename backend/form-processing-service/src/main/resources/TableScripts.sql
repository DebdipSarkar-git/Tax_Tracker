DROP SCHEMA IF EXISTS taxtracker_formdb;
CREATE SCHEMA taxtracker_formdb;
USE taxtracker_formdb;
 
CREATE TABLE `taxtracker_formdb`.`form_status` (
	`id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`user_id` BIGINT NOT NULL,
    `financial_year` VARCHAR(9) not null,
	`is_submitted` BIT(1) NOT NULL
   );