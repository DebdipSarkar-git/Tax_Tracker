DROP SCHEMA IF EXISTS taxtracker_transactiondb;
CREATE SCHEMA taxtracker_transactiondb;
USE taxtracker_transactiondb;

CREATE TABLE `transactions` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `tax_amount` decimal(15,2) NOT NULL,
  `type` varchar(50) NOT NULL,
  `organization_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (1,1,'2023-01-01',100000.00,1000.00,'TDS','ABC Company');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (2,1,'2023-02-15',50000.00,1800.00,'ICS','XYZ Corporation');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (3,1,'2023-03-10',75000.00,2200.00,'GST','LMN Ltd');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (4,1,'2023-04-05',120000.00,3000.00,'TDS','DEF Enterprises');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (5,1,'2023-05-20',95000.00,2500.00,'ICS','PQR Solutions');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (6,2,'2023-06-11',60000.00,1800.00,'GST','STU Pvt Ltd');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (7,2,'2023-07-15',85000.00,2000.00,'TDS','VWX Inc');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (8,2,'2023-08-23',130000.00,4000.00,'ICS','MNO Group');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (9,2,'2023-09-12',70000.00,1600.00,'GST','JKL Technologies');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (10,2,'2023-10-30',110000.00,2700.00,'TDS','EFG Limited');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (11,3,'2023-11-22',97000.00,2600.00,'ICS','HIJ Ventures');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (12,3,'2023-12-05',55000.00,1500.00,'GST','QRS Holdings');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (13,3,'2024-01-17',102000.00,3100.00,'TDS','LMN Ltd');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (14,3,'2024-02-08',88000.00,2100.00,'ICS','XYZ Corporation');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (15,3,'2024-03-19',73000.00,2000.00,'GST','ABC Company');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (16,4,'2024-04-25',125000.00,3500.00,'TDS','DEF Enterprises');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (17,4,'2024-05-10',91000.00,2400.00,'ICS','PQR Solutions');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (18,4,'2024-06-15',58000.00,1700.00,'GST','STU Pvt Ltd');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (19,4,'2024-07-28',99000.00,2600.00,'TDS','VWX Inc');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (20,4,'2024-08-14',140000.00,5000.00,'ICS','MNO Group');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (21,4,'2024-09-09',77000.00,1800.00,'GST','JKL Technologies');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (22,4,'2024-10-21',113000.00,2800.00,'TDS','EFG Limited');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (23,4,'2024-11-30',92000.00,2300.00,'ICS','HIJ Ventures');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (24,4,'2024-12-12',63000.00,1900.00,'GST','QRS Holdings');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (25,4,'2025-01-15',105000.00,3200.00,'TDS','LMN Ltd');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (26,4,'2025-02-11',87000.00,2200.00,'ICS','XYZ Corporation');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (27,4,'2025-03-05',76000.00,2100.00,'GST','ABC Company');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (28,4,'2025-04-18',126000.00,3600.00,'TDS','DEF Enterprises');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (29,4,'2025-05-23',94000.00,2500.00,'ICS','PQR Solutions');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (30,4,'2025-06-30',60000.00,1800.00,'GST','STU Pvt Ltd');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (31,5,'2025-07-14',102500.00,2700.00,'TDS','VWX Inc');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (32,5,'2025-08-29',135000.00,4800.00,'ICS','MNO Group');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (33,5,'2025-09-11',78000.00,1900.00,'GST','JKL Technologies');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (34,5,'2025-10-26',115000.00,2900.00,'TDS','EFG Limited');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (35,5,'2025-11-18',96000.00,2400.00,'ICS','HIJ Ventures');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (36,6,'2025-12-03',64000.00,2000.00,'GST','QRS Holdings');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (37,6,'2026-01-22',107000.00,3300.00,'TDS','LMN Ltd');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (38,6,'2026-02-09',89000.00,2300.00,'ICS','XYZ Corporation');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (39,6,'2026-03-16',78000.00,2200.00,'GST','ABC Company');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (40,6,'2026-04-27',128000.00,3700.00,'TDS','DEF Enterprises');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (41,7,'2026-05-19',95000.00,2600.00,'ICS','PQR Solutions');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (42,7,'2026-06-28',62000.00,1900.00,'GST','STU Pvt Ltd');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (43,7,'2026-07-10',104500.00,2800.00,'TDS','VWX Inc');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (44,7,'2026-08-30',137000.00,4900.00,'ICS','MNO Group');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (45,7,'2026-09-14',80000.00,2000.00,'GST','JKL Technologies');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (46,8,'2026-10-20',118000.00,3000.00,'TDS','EFG Limited');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (47,8,'2026-11-25',97000.00,2500.00,'ICS','HIJ Ventures');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (48,8,'2026-12-07',65000.00,2100.00,'GST','QRS Holdings');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (49,8,'2027-01-18',97000.00,2500.00,'ICS','HIJ Ventures');
INSERT INTO `transactions` (`id`,`user_id`,`date`,`amount`,`tax_amount`,`type`,`organization_name`) VALUES (50,8,'2027-02-28',67000.00,1500.00,'GST','JKL Technologies');
