-- Create and use the database
CREATE DATABASE IF NOT EXISTS `prime` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `prime`;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2025 at 08:53 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

-- TABLES AND DATA (same as you already provided)
-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2025 at 08:53 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prime`
--

-- --------------------------------------------------------

--
-- Table structure for table `ofertat`
--

CREATE TABLE `ofertat` (
  `id` int(11) NOT NULL,
  `klient_id` int(11) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `porosit`
--

CREATE TABLE `porosit` (
  `id` int(11) NOT NULL,
  `klient_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `porosit_details`
--

CREATE TABLE `porosit_details` (
  `id` int(11) NOT NULL,
  `porosi_id` int(11) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `emer` varchar(255) DEFAULT NULL,
  `mbiemer` varchar(255) DEFAULT NULL,
  `telefon` varchar(50) DEFAULT NULL,
  `emri_biznesit` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `adresa` varchar(255) DEFAULT NULL,
  `qyteti` varchar(100) DEFAULT NULL,
  `nipt` varchar(100) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `token` varchar(255) DEFAULT NULL,
  `role` tinyint(4) DEFAULT NULL COMMENT '1 = admin, 2 = client'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `emer`, `mbiemer`, `telefon`, `emri_biznesit`, `email`, `adresa`, `qyteti`, `nipt`, `status`, `token`, `role`) VALUES
(1, 'admin', '$2y$10$usl9VA47hlDpXXR92updsu1Aj6LSR2qjdcB0OCd7tx2KEig5q41nq', 'Admin', 'Admin', '123456789', 'Biznesi Admin', 'admin@example.com', 'Adresa Admin', 'Qyteti', 'NIPT123', 1, 'c4f45bf8d4c53524ce2ccd768d990c64', 1),
(2, 'test', '$2y$10$K6vbheP5yNOfAsjkdyl2ouX.1eMif26sFALMsGyDiB1eXGHXDa/d.', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 1, '05dd647536f9c7eda9f13a43ec74c70c', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ofertat`
--
ALTER TABLE `ofertat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `klient_id` (`klient_id`);

--
-- Indexes for table `porosit`
--
ALTER TABLE `porosit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `klient_id` (`klient_id`);

--
-- Indexes for table `porosit_details`
--
ALTER TABLE `porosit_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `porosi_id` (`porosi_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ofertat`
--
ALTER TABLE `ofertat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `porosit`
--
ALTER TABLE `porosit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `porosit_details`
--
ALTER TABLE `porosit_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ofertat`
--
ALTER TABLE `ofertat`
  ADD CONSTRAINT `ofertat_ibfk_1` FOREIGN KEY (`klient_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `porosit`
--
ALTER TABLE `porosit`
  ADD CONSTRAINT `porosit_ibfk_1` FOREIGN KEY (`klient_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `porosit_details`
--
ALTER TABLE `porosit_details`
  ADD CONSTRAINT `porosit_details_ibfk_1` FOREIGN KEY (`porosi_id`) REFERENCES `porosit` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
