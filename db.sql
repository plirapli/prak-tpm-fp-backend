-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 09, 2024 at 08:33 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tudulis`
--

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `title` tinytext NOT NULL,
  `description` text NOT NULL,
  `img` text DEFAULT NULL,
  `is_completed` smallint(11) NOT NULL DEFAULT 0,
  `color` tinyint(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `title`, `description`, `img`, `is_completed`, `color`, `updated_at`, `created_at`, `user_id`) VALUES
(2, 'asdsadaaaaa', 'asdasd', NULL, 1, 1, '2024-06-08 06:15:43', '2024-05-23 13:33:01', '-LH_vSFSQ7dDaFLEp8eMU'),
(5, 'Lorem ipsum', 'lorem ipsum dolor sit amet', NULL, 0, 2, '2024-06-06 19:16:38', '2024-05-23 13:03:36', '-LH_vSFSQ7dDaFLEp8eMU'),
(21, 'asdsidajsdajdjadjasdsidajsdajdjadjasdsidajsdajdjadjasdsidajsdajdjadjsssddasdasdadasd', 'asdsidajsdajdjadjasdsidajsdajdjadjasdsidajsdajdjadjasdsidajsdajdjadjasdsidajsdajdjadjsssddasdasdadasdasdsidajsdajdjadjasdsidajsdajdjadjasdsidajsdajdjadjasdsidajsdajdjadjsssddasdasdadasdasdsidajsdajdjadjasdsidajsdajdjadjasdsidajsdajdjadjasdsidajsdajdjadjsssddasdasdadasdasdsidajsdajdjadjasdsidajsdajdjadjasdsidajsdajdjadjasdsidajsdajdjadjsssddasdasdadasd', NULL, 0, 4, '2024-06-06 18:59:24', '2024-06-06 18:59:24', '-LH_vSFSQ7dDaFLEp8eMU'),
(22, 'asdasdasdasdjasdjasjdjansdjansd', 'ajsndajsndjansdjnasjdnjasnd', NULL, 1, 5, '2024-06-06 21:09:33', '2024-06-06 21:09:14', '-LH_vSFSQ7dDaFLEp8eMU'),
(24, 'asdsa', 'sdsdsdasd', NULL, 1, 2, '2024-06-08 06:08:49', '2024-06-08 06:08:16', 'lfxpD2e_sBpuafVuZ8kH2');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`) VALUES
('-LH_vSFSQ7dDaFLEp8eMU', 'Muhammad Rafli', 'rafli', '$2b$06$M42CgBU7er82OWF5EVVZM.EoE8.UZXLjYYc2RkeWBJFdKeiq613dG'),
('R15rNQ0P_uqua6F2wbIRP', 'Muhammad Sumbul', 'sumbul', '$2b$06$thuLXVkdGooRS1jbq5i8IuDzUiWI98vt1luTe5McVMm1o8WmA4B8y');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
