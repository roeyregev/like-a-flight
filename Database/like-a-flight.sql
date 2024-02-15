-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 14, 2024 at 07:56 PM
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
(31, 27),
(31, 36),
(31, 29),
(31, 38),
(40, 40),
(30, 27),
(30, 29),
(30, 25),
(30, 31),
(30, 33),
(30, 36),
(30, 35),
(30, 37),
(30, 42),
(31, 34),
(31, 40),
(32, 29),
(32, 25),
(32, 26),
(32, 34),
(32, 35),
(32, 38),
(32, 40),
(32, 42),
(40, 27),
(40, 29),
(40, 31),
(40, 30),
(40, 32),
(40, 33),
(40, 35),
(40, 39),
(33, 28),
(33, 25),
(33, 26),
(33, 31),
(33, 35),
(33, 39),
(33, 37),
(33, 40),
(33, 42),
(33, 41),
(34, 29),
(34, 28),
(34, 30),
(34, 31),
(34, 35),
(34, 40),
(34, 41),
(35, 29),
(35, 27),
(35, 30),
(35, 32),
(35, 33),
(35, 38),
(35, 37),
(41, 29),
(41, 30),
(41, 31),
(41, 35),
(41, 40),
(41, 42),
(36, 29),
(36, 30),
(36, 31),
(36, 35),
(36, 36),
(36, 37),
(36, 42),
(37, 27),
(37, 26),
(37, 30),
(37, 31),
(37, 33),
(38, 29),
(38, 25),
(38, 30),
(38, 31),
(38, 35),
(38, 36),
(38, 37),
(38, 42),
(39, 29),
(39, 25),
(39, 26),
(39, 31),
(39, 34),
(39, 36),
(39, 39),
(39, 38),
(39, 42),
(30, 28),
(31, 30),
(37, 28),
(37, 35),
(37, 36),
(40, 26),
(31, 28);

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
  `password` varchar(200) NOT NULL,
  `roleId` int(20) NOT NULL,
  `userImageUrl` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`, `userImageUrl`) VALUES
(28, 'admin', 'adminson', 'admin@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 1, 'http://localhost:4000/api/register/images/6b09d7b5-e43f-4a7f-80f3-5a93d9434419.png'),
(30, 'Mirabel', 'Madrigal', 'mirabel@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/35457384-3cf1-4339-a8e6-51bfb6b2acfb.png'),
(31, 'Abuela', 'Madrigal', 'abuela@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/4b7b2300-d4b0-4c2b-a743-4c90eadc5494.png'),
(32, 'Julieta', 'Madrigal', 'julieta@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/d9028e00-d157-4df1-9bb0-8a04ba64cbe7.png'),
(33, 'Isabela', 'Madrigal', 'isabela@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/b827f1cb-a6c3-4031-b58d-755f3113cd63.png'),
(34, 'Luisa', 'Madrigal', 'luisa@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/88c63cd4-f246-4d7d-b473-6c848c4a564e.png'),
(35, 'Pepa', 'Madrigal', 'pepa@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/678b8b76-62c6-48df-b964-f87fd9ac660e.png'),
(36, 'Antonio', 'Madrigal', 'antonio@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/194cbf05-6a4c-414d-9c03-195e32c7225f.png'),
(37, 'Camilo', 'Madrigal', 'camilo@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/00b5ccd9-ab04-411c-b8b8-0099632cd3cc.png'),
(38, 'Dolores', 'Madrigal', 'dolores@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/15bd7fd4-ece8-4d92-9773-945d958f9c42.png'),
(39, 'Bruno', 'Madrigal', 'bruno@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/fe323ed7-dd77-49b1-9211-462bfc88f3d8.png'),
(40, 'Agustín', 'Madrigal', 'agustin@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/f41fb092-db41-4a18-a081-9715f8f9c5fd.png'),
(41, 'Félix', 'Madrigal', 'felix@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'http://localhost:4000/api/register/images/778a2c0c-4a3a-4f29-a4de-b6d06e88fbd9.png'),
(42, 'anonymous', 'anonymous', 'anon@gmail.com', '6107fecf248b4f315b12d4158c87874c725a95be4906290f7c5eb365451e1d86bcb9ca89fdc2838afd61802b9687efb7e341420e3416e29ccf5c2f24cad2f535', 2, 'undefined');

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
(25, 'Rome', 'Wander through the Vatican City, home to the Sistine Chapel and Michelangelo\'s breathtaking masterpiece, the ceiling. Experience breathtaking views from the top of St. Peter\'s Basilica and lose yourself in the art treasures of the Borghese Gallery.', '2024-01-01', '2024-01-08', 449.00, '5cc8e549-2132-4714-b398-6b3741e22a88.png'),
(26, 'Paris', 'Paris, the City of Lights, beckons you with its timeless elegance and irresistible charm. Picture yourself strolling along the romantic Seine River, watching the sun paint the Eiffel Tower in golden hues and feeling the magic of the city come alive.', '2024-03-04', '2024-03-10', 529.00, 'cc7d5814-4061-49d0-80cd-240627a67fe5.png'),
(27, 'Amsterdam', 'Amsterdam, the City of Canals and Freedom, awaits you with open arms. Imagine yourself gliding down the picturesque canals, admiring the colorful gabled houses and vibrant street life. Picture yourself cycling through charming neighborhoods, past hidden courtyards and blooming flower markets.', '2024-02-01', '2024-02-25', 529.00, '152d1983-0a6f-408b-b91e-72dd1c23fdcb.png'),
(28, 'Prague', 'Beyond the established tourist destinations, discover the hidden gems of Prague. Explore the Kampa Island, a tranquil oasis with charming canals and art galleries. Visit the Lennon Wall, a vibrant symbol of peace and love.', '2023-11-25', '2023-11-30', 199.00, '487a9b8e-bfb7-4371-893c-3037a6a2dbd2.png'),
(29, 'New York City', 'Experience the nightlife: From rooftop bars and vibrant clubs to intimate jazz bars and hidden speakeasies, New York\'s nightlife scene is buzzing with energy. Explore the unique neighborhoods of Brooklyn, like Williamsburg and Greenpoint, or venture to Governors Island for a tranquil escape with stunning views of the city skyline. ', '2023-12-24', '2024-01-07', 1149.00, '4d86ef91-ce86-41e6-9794-89efe410f758.png'),
(30, 'Los Angeles', 'Explore world-class art at the Getty Center, LACMA, and MOCA, showcasing diverse collections from around the world. Discover culinary delights, from fresh seafood to authentic Mexican cuisine, or explore the diverse food trucks offering flavors from all over the world.', '2024-03-24', '2024-04-01', 1499.00, '8b714349-d570-4a55-a354-938a84700ce1.png'),
(31, 'London', 'London\'s allure awaits! Explore iconic landmarks, from Buckingham Palace to the Tower of London. Wander through museums brimming with treasures, savor classic fare, and experience world-class theatre. Escape the city bustle in Hyde Park or Regent\'s Park, and let London\'s vibrant history and culture captivate you. Pack your bags and book your flight!', '2024-04-12', '2024-04-19', 609.00, 'bab9fcc7-77af-495f-809b-385546b22668.png'),
(32, 'Cairo', 'Unravel Cairo\'s ancient mysteries! Explore the iconic pyramids of Giza, marvel at the Sphinx, and wander through the Egyptian Museum, filled with treasures. Sail the Nile, soak up the Khan el-Khalili bazaar\'s vibrant atmosphere, and be mesmerized by the call to prayer. Experience Egypt\'s rich history, captivating culture, and warm hospitality in Cairo. Book your adventure today!', '2024-04-23', '2024-05-01', 149.00, 'd8ba27fa-0519-4a1c-adcc-abf9fb1f6695.png'),
(33, 'Bangkok', 'Let Bangkok\'s magic captivate you!** Explore the Grand Palace, wander through vibrant temples, and savor legendary street food. Cruise the Chao Phraya River, marveling at stunning contrasts. Discover hidden gems in bustling markets, lose yourself in vibrant nightlife, and find peace in green spaces. Bangkok\'s energy and cultural richness await. Book your adventure!', '2024-05-16', '2024-05-30', 849.00, 'b05c990c-1483-4888-83e5-7018f071f44e.png'),
(34, 'Budapest', 'Budapest awaits! Relax in thermal baths, admire Buda Castle, wander Pest\'s streets. Explore markets, savor Hungarian food, marvel at Parliament. Cruise the Danube at dusk, embrace classical music, lose yourself in nightlife. Discover Budapest\'s unique charm. Book your escape today!', '2024-02-10', '2024-02-26', 289.00, 'b20dc0b4-e060-4750-950d-f2abc82f8671.png'),
(35, 'Madrid', 'Madrid\'s fiery spirit awaits! Immerse yourself in vibrant flamenco, stroll through the Prado Museum\'s masterpieces, and savor tapas at hidden bodegas. Explore the Royal Palace\'s grandeur, wander through El Rastro flea market, and relax in Retiro Park. Soak up the sun at Plaza Mayor, join the lively nightlife, and be captivated by Madrid\'s infectious energy.', '2024-06-10', '2024-06-17', 559.00, 'f656233e-d3e5-403a-a72d-dea3547ccde0.png'),
(36, 'Barcelona', 'Discover Barcelona\'s vibrant soul! Wander through Sagrada Familia\'s architectural marvel, explore Gaudi\'s whimsical creations, and lose yourself in the vibrant La Boqueria market. Soak up the sun on Barceloneta Beach, cruise along the waterfront, and savor tapas in charming cafes. Experience the city\'s infectious energy, from flamenco shows to buzzing nightlife. Barcelona\'s unique charm awaits you.', '2024-06-10', '2024-06-17', 549.00, 'e1967ed3-af28-45e0-b7df-898d11421bdd.png'),
(37, 'Ibiza', 'Unleash your inner party animal in Ibiza! Dance the night away in world-renowned nightclubs, sunbathe on pristine beaches, and soak in the bohemian vibes. \r\nFrom sunset cruises to adrenaline-pumping water sports, Ibiza offers an unforgettable escape. Book your adventure and let the rhythm of the island take over!', '2024-08-12', '2024-08-19', 629.00, 'f2add38a-4219-4cf9-8a23-e3cec1a25766.png'),
(38, 'Napoli', 'Napoli\'s fiery heart beckons! Explore Pompeii\'s ruins, lose yourself in Spaccanapoli\'s chaotic charm, and savor pizza from a hidden trattoria. Climb Vesuvius, wander vibrant markets, and bask on Capri\'s shores. Embrace opera, buzzing nightlife, and Napoli\'s fiery spirit. Book your Italian escape now!', '2024-07-19', '2024-07-25', 489.00, '7e7e0f32-ee83-41c4-8e2c-68a632e01f6c.png'),
(39, 'Milano', 'Immerse yourself in Milano\'s chic beauty!** Explore iconic Duomo, stroll Galleria Vittorio Emanuele II\'s opulent halls, and marvel at Da Vinci\'s masterpiece at Santa Maria delle Grazie. Discover fashion\'s cutting edge, savor delectable cuisine, and soak up the vibrant nightlife. Escape to art-filled museums, explore hidden gems, and be captivated by Milano\'s timeless elegance. ', '2024-07-12', '2024-07-18', 539.00, '6e7b2e53-71fa-4c68-96a9-0c2cb50b00fc.png'),
(40, 'Berlin', 'Berlin\'s vibrant pulse awaits! Explore iconic landmarks like the Brandenburg Gate and Reichstag, stroll along the Spree River, and soak up the city\'s contemporary art scene. Savor diverse cuisine, from traditional Biergartens to trendy restaurants, and lose yourself in buzzing nightlife. Discover historical depths and embrace Berlin\'s unique blend of history and modern energy. ', '2024-08-20', '2024-08-27', 649.00, 'e432ac37-e1ee-4ee3-aee4-53ee4c9f185d.png'),
(41, 'Munich', 'Unwind in Munich\'s vibrant embrace! Savor a Bavarian beer at the iconic Hofbräuhaus, explore Marienplatz\'s enchanting charm, and marvel at the Glockenspiel\'s lively performance. Indulge in delicious pastries at Viktualienmarkt, wander through Hofgarten\'s serene beauty, and experience the festive spirit of Oktoberfest. Discover hidden courtyards and be captivated by Munich\'s rich history and cheerful spirit.', '2024-08-22', '2024-08-29', 619.00, 'fc7bab7b-db3f-4938-b234-b000ae8783cb.png'),
(42, 'Hadera', 'Immerse yourself in Hadera\'s coastal charm! Explore the scenic Shvil HaTapuzim, discover the fascinating Salt & Pepper Museum, and marvel at the vibrant Hadera River Park. \r\nUnwind on the stunning beaches, delve into history at the Khan Museum, and experience the tranquility of HaSharon Park. Savor fresh seafood, embrace the vibrant nightlife, and be captivated by Hadera\'s unique blend of nature, culture, and history.', '2024-08-27', '2024-08-31', 9.00, '48ff473e-5583-424e-b62d-ecb65edce3b2.png'),
(44, 'Dubai', 'Escape to the dazzling cityscape of Dubai, where modern luxury meets ancient charm. Discover a world of opulent skyscrapers, pristine beaches, and vibrant souks. Indulge in adrenaline-pumping desert safaris, awe-inspiring architectural marvels like the Burj Khalifa, and world-class shopping experiences in glamorous malls. Embark on a journey of wonder and delight.', '2023-07-11', '2023-07-30', 209.00, 'e82ec04e-1b66-4b74-9309-c0cc9d201a83.webp');

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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

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
