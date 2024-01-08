-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 07, 2024 at 08:32 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `like-a-flight`
--
CREATE DATABASE IF NOT EXISTS `like-a-flight` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `like-a-flight`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(2, 1),
(2, 2),
(2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `role`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(50) NOT NULL,
  `roleId` int(20) NOT NULL,
  `userImageUrl` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`, `userImageUrl`) VALUES
(1, 'admin', 'adminson', 'admin@gmail.com', '1234', 1, ''),
(2, 'user', 'userovich', 'user@gmail.com', '1234', 2, ''),
(4, 'test', 'test', 'test1@gmail.com', '1234', 2, 'temp'),
(5, 'Roey', 'Regev', 'roeyregev@gmail.com', '1234', 2, 'temp'),
(6, 'test', 'test', 'test2@gmail.com', '1234', 2, 'temp'),
(7, 'test', 'test', 'test3@gmail.com', '1234', 2, 'temp'),
(8, 'test', 'test', 'test%@gmail.com', '1234', 2, 'temp');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `description` varchar(500) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Rome', 'Wander through the Vatican City, home to the Sistine Chapel and Michelangelo\'s breathtaking masterpiece, the ceiling. Experience breathtaking views from the top of St. Peter\'s Basilica and lose yourself in the art treasures of the Borghese Gallery.', '2024-01-01', '2024-01-08', 449.00, 'rome.png'),
(2, 'Paris', 'Paris, the City of Lights, beckons you with its timeless elegance and irresistible charm. Picture yourself strolling along the romantic Seine River, watching the sun paint the Eiffel Tower in golden hues and feeling the magic of the city come alive.', '2024-03-04', '2024-03-11', 529.00, 'paris.png'),
(3, 'Amsterdam', 'Amsterdam, the City of Canals and Freedom, awaits you with open arms. Imagine yourself gliding down the picturesque canals, admiring the colorful gabled houses and vibrant street life. Picture yourself cycling through charming neighborhoods, past hidden courtyards and blooming flower markets.', '2023-11-11', '2023-12-16', 429.00, 'amsterdam.png'),
(4, 'Prague', 'Beyond the established tourist destinations, discover the hidden gems of Prague. Explore the Kampa Island, a tranquil oasis with charming canals and art galleries. Visit the Lennon Wall, a vibrant symbol of peace and love.', '2023-11-24', '2023-11-30', 199.00, 'prague.png'),
(5, 'New York City', 'Experience the nightlife: From rooftop bars and vibrant clubs to intimate jazz bars and hidden speakeasies, New York\'s nightlife scene is buzzing with energy. Explore the unique neighborhoods of Brooklyn, like Williamsburg and Greenpoint, or venture to Governors Island for a tranquil escape with stunning views of the city skyline. ', '2023-12-24', '2024-01-07', 1149.00, 'nyc.png'),
(6, 'Los Angeles', 'Explore world-class art at the Getty Center, LACMA, and MOCA, showcasing diverse collections from around the world. Discover culinary delights, from fresh seafood to authentic Mexican cuisine, or explore the diverse food trucks offering flavors from all over the world.', '2024-03-24', '2024-01-01', 1499.00, 'los-angeles.png'),
(7, 'London', 'London\'s allure awaits! Explore iconic landmarks, from Buckingham Palace to the Tower of London. Wander through museums brimming with treasures, savor classic fare, and experience world-class theatre. Escape the city bustle in Hyde Park or Regent\'s Park, and let London\'s vibrant history and culture captivate you. Pack your bags and book your flight!', '2024-04-11', '2024-04-18', 609.00, 'London.png'),
(8, 'Cairo', 'Unravel Cairo\'s ancient mysteries!** Explore the iconic pyramids of Giza, marvel at the Sphinx, and wander through the Egyptian Museum, filled with treasures. Sail the Nile, soak up the Khan el-Khalili bazaar\'s vibrant atmosphere, and be mesmerized by the call to prayer. Experience Egypt\'s rich history, captivating culture, and warm hospitality in Cairo. Book your adventure today!', '2024-04-23', '2024-05-01', 149.00, 'cairo.png'),
(15, 'Bangkok', 'test', '2024-08-08', '2024-08-10', 999.00, 'Test'),
(16, 'Bangkok', 'Let Bangkok\'s magic captivate you!** Explore the Grand Palace, wander through vibrant temples, and savor legendary street food. Cruise the Chao Phraya River, marveling at stunning contrasts. Discover hidden gems in bustling markets, lose yourself in vibrant nightlife, and find peace in green spaces. Bangkok\'s energy and cultural richness await. Book your adventure!', '2024-05-16', '2024-05-30', 899.00, '5048474b-7189-4df7-9ee3-e3bc529f2969.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
