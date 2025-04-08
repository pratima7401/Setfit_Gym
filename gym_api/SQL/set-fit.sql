-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2025 at 11:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `set-fit`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'admin', '$2y$10$CjHclTDgJ5o3pTPOeFbT2eGeifsXk7e9Z4ilfzTOGTgjQqK5koeSe', '2025-02-11 06:50:03'),
(2, 'admin@gmail.com', '$2y$10$p47cO4e0ir1.lfu/hPyVQ.uxGUQwVCSZ.62fTORJWHsCw9vUUsQla', '2025-02-11 06:58:54'),
(4, 'admin1', '$2y$10$etZikGXWNu7Ug3GujG7vEuEs6F5fXrJfKjVtRcMHJv8EaDujJ9CbK', '2025-02-11 07:09:38');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `purpose` varchar(50) DEFAULT NULL,
  `medicalIssue` enum('Yes','No') NOT NULL,
  `medicalDetails` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `name`, `email`, `phone`, `purpose`, `medicalIssue`, `medicalDetails`, `created_at`) VALUES
(3, 'Geetanjali Palande', 'gitap184@gmail.com', '9881793409', 'Fitness', 'Yes', 'left leg ensured', '2025-02-11 10:16:27'),
(4, 'Diksha Bobade', 'bd123@gmail.com', '9632587480', 'Fitness', 'No', '', '2025-02-11 11:17:06'),
(5, 'Aniket Tambe', 'tambeaniket234@gmail.com', '8965748963', 'Muscle Building', 'No', '', '2025-02-14 06:55:30'),
(7, 'John Deo', 'johndeo34@gmail.com', '8569325874', 'Muscle Building', 'No', '', '2025-02-14 07:12:43'),
(8, 'Om Jori', 'omjDv@yahoo.com', '8989784859', 'Fitness', 'No', '', '2025-02-14 07:13:26'),
(9, 'Nitin Kale', 'kalenitin23@yahoo.com', '8888812345', 'Weight Loss', 'Yes', 'I have dsdjsodd ndd issue', '2025-02-14 07:14:23'),
(10, 'Aarti Kale', 'aartikj131@reddiffmail.com', '9658741589', 'General Well-being', 'Yes', 'My left leg is ensured in childhood', '2025-02-14 07:15:41'),
(11, 'Dipika Padukon', 'padukondipika34@gmail.com', '7777788888', 'Muscle Building', 'No', '', '2025-02-14 07:17:18'),
(12, 'Jaydip Kulkarni', 'justJK22@gmail.com', '85296374123', 'Muscle Building', 'Yes', 'I have breathing problem', '2025-02-14 07:18:10'),
(13, 'Pratima Palande', 'palandepratima74@gmail.com', '9325931040', 'Weight Loss', 'Yes', 'I have heart issue', '2025-02-14 07:18:47'),
(14, 'Madhuri Dikshit', 'madhurid232@gmail.com', '89657489652', 'Fitness', 'No', '', '2025-02-17 18:21:04');

-- --------------------------------------------------------

--
-- Table structure for table `membership_plans`
--

CREATE TABLE `membership_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` varchar(50) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `features` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `membership_plans`
--

INSERT INTO `membership_plans` (`id`, `name`, `price`, `duration`, `features`) VALUES
(4, 'Quaterly', '7000', '6', '[\"All Access to Equipments\",\"               Locker Access\",\"               Free Classes\"]'),
(6, 'Half-Quarterly', '6500', '3', '[\"All Access to Equipments\",\"                    F                              Locker Room Access\",\"              Free Classes\"]'),
(7, 'Yearly', '12000', '12', '[\"All Access to Equipments\",\"                                                   Locker Room\",\"                           Free Classess\",\"            Suplimetns\"]'),
(8, 'Monthly', '3000', '1', '[\"Access to all Equipments\",\"                                     Access to Locker Room\",\"      \"]');

-- --------------------------------------------------------

--
-- Table structure for table `trainers`
--

CREATE TABLE `trainers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `specialty` varchar(255) NOT NULL,
  `experience` varchar(50) NOT NULL,
  `certifications` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainers`
--

INSERT INTO `trainers` (`id`, `name`, `image`, `specialty`, `experience`, `certifications`) VALUES
(4, 'Salman Khan', '1739524840_m_trainer3.jpg', 'Strenght Training', '4', 'National Training Academy'),
(5, 'Sanjay Patil', '1739525145_m_trainer2.jpg', 'Cardio', '5', 'SDS-SKS'),
(6, 'Shivani Deshmukh', '1739525196_1739432351_yoga_trainer.jpg', 'Yoga', '4', 'Indian Yoga Association'),
(7, 'Jay Patil', '1739816045_m_trainer2.jpg', 'Muscle Building', '3', 'MB-DSA'),
(8, 'Lara Carffs', '1739816121_fe_trainer1.jpg', 'Neutrition', '4', 'MLDS');

-- --------------------------------------------------------

--
-- Table structure for table `transformation_plans`
--

CREATE TABLE `transformation_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `features` text NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `membership_plans`
--
ALTER TABLE `membership_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trainers`
--
ALTER TABLE `trainers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transformation_plans`
--
ALTER TABLE `transformation_plans`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `membership_plans`
--
ALTER TABLE `membership_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `trainers`
--
ALTER TABLE `trainers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `transformation_plans`
--
ALTER TABLE `transformation_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
