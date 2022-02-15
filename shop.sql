-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 14, 2022 at 01:16 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `item_id`, `u_id`, `quantity`, `timestamp`) VALUES
(48, 1, 1, 21, 20220213194423),
(49, 1, 6, 1, 20220213194423);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` bigint(16) NOT NULL,
  `name` varchar(128) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `added` timestamp NOT NULL DEFAULT current_timestamp(),
  `stock` int(8) NOT NULL,
  `visible` binary(1) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `description`, `added`, `stock`, `visible`, `image`) VALUES
(1, 'AAAAA', 12, 'Idkadsakndsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaoasdasd', '2022-02-08 07:15:50', 0, 0x31, '');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `fulfilled` binary(1) NOT NULL,
  `item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `quantity`, `fulfilled`, `item_id`, `user_id`, `value`, `timestamp`) VALUES
(1, 1, 0x31, 1, 1, 12, 20220213192604);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(64) NOT NULL DEFAULT 'Member',
  `profile` blob DEFAULT NULL,
  `accountcreation` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastlogin` timestamp NULL DEFAULT NULL,
  `proxy_ip` varchar(45) DEFAULT NULL,
  `ip` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `password`, `email`, `role`, `profile`, `accountcreation`, `lastlogin`, `proxy_ip`, `ip`) VALUES
(1, 'admin', 'undefined', 'Ga1ZziS15CtR', 'admin@localhost', 'Admin', '', '2022-02-12 04:22:34', '2022-02-14 06:00:53', '', '::1'),
(2, 'hey', 'undefined', 'SfsHk3+gtA==', 'hey@localhost', 'Member', '', '2022-02-12 04:26:20', NULL, '', '::1'),
(3, 'obillekyle', 'undefined', 'SfsHk3+g4iED', 'h@l', 'Member', '', '2022-02-12 04:30:22', NULL, '', '::1'),
(4, 'Hellow', 'undefined', 'GahVxiv3tHhT', '414141413@12', 'Member', '', '2022-02-12 04:31:38', '2022-02-12 04:34:00', '', '::1'),
(5, 'null', 'undefined', 'SfsHkyTjuXU=', 'null@localhost', 'Member', NULL, '2022-02-12 08:13:14', '2022-02-12 08:18:18', '', '127.0.0.1'),
(6, 'pogimojayjay', 'undefined', 'EqhNzSvv5CpTxTBR', 'jayjay@gmail', 'Member', NULL, '2022-02-12 10:50:31', NULL, '', '::1'),
(7, 'rick', 'undefined', 'CqBXzCvloXUHjys=', 'rick@roll', 'Member', NULL, '2022-02-13 12:37:22', NULL, '', '127.0.0.1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
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
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
