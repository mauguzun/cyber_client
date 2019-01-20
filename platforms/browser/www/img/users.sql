-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Янв 20 2019 г., 12:26
-- Версия сервера: 5.7.23-23-log
-- Версия PHP: 7.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `tricypolitain`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(254) NOT NULL,
  `activation_selector` varchar(255) DEFAULT NULL,
  `activation_code` varchar(255) DEFAULT NULL,
  `forgotten_password_selector` varchar(255) DEFAULT NULL,
  `forgotten_password_code` varchar(255) DEFAULT NULL,
  `forgotten_password_time` int(11) UNSIGNED DEFAULT NULL,
  `remember_selector` varchar(255) DEFAULT NULL,
  `remember_code` varchar(255) DEFAULT NULL,
  `created_on` int(11) UNSIGNED NOT NULL,
  `last_login` int(11) UNSIGNED DEFAULT NULL,
  `active` tinyint(1) UNSIGNED DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `ip_address`, `username`, `password`, `email`, `activation_selector`, `activation_code`, `forgotten_password_selector`, `forgotten_password_code`, `forgotten_password_time`, `remember_selector`, `remember_code`, `created_on`, `last_login`, `active`, `first_name`, `last_name`, `company`, `phone`) VALUES
(1, '127.0.0.1', 'administrator', '$2y$12$yCNDR5MqQcghsuFYWE3tz.kPntwnFjTg6e0RsAM8UFdMJ4k.4.vmO', 'mauguzun+admin@gmail.com', NULL, '', NULL, NULL, NULL, NULL, NULL, 1268889823, 1547986943, 1, 'Admin', 'istrator', 'ADMIN', '0'),
(4, '', '1212', '$2y$10$yUnh2orqcy2YDEeD5nNQ9O68ri7B24dnGXBygBphRgi7Zh.KgUKcG', 'mauguzun+12@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 'Deniss', 'Sabalins', NULL, '27597292'),
(5, '', 'asd', '$2y$10$AknBlab31IypHLSRmsVva.45u5/cpC7h7h5E7.fHHXgaLrnR3ztMG', 'mauguzun+asd@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 'Deniss', 'Sabalins', NULL, '12'),
(6, '', 'boss of the boss', '$2y$10$LNV2L0/1wU93gZUk9qhrs.Sa14oift2nG20BTbq6p2gZuIm.ljA3e', 'fabrice.de.biasio@gmail.com', NULL, NULL, '4c056fc2804ac56e36b5', '$2y$10$UonTk.HGIK3YBGw6QfhxLu8PM.ivOUCE85.TzaJ8kYrtJStHcwOGS', 1547231336, NULL, NULL, 0, NULL, 1, 'fabrice', 'fabrice', NULL, '231'),
(7, '', 'jemeljanovs.igors', '$2y$10$AEF3FkKUmknQVi3/.VwunebNL0vBXggXasGhCL6Lbsh.mOKkbFJcm', 'jemeljanovs.igors@gmail.com', NULL, NULL, '7e3f963d3b1933505074', '$2y$10$dH/5tLjmm7IHOGVortbSRewITJyHajfQKUKOgFSZAiQwDbnQVdVvK', 1547636392, NULL, NULL, 0, NULL, 1, 'jemeljanovs.igors@gmail.com', 'jemeljanovs.igors@gmail.com', NULL, '33 6 95 23 55 57');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uc_email` (`email`),
  ADD UNIQUE KEY `uc_activation_selector` (`activation_selector`),
  ADD UNIQUE KEY `uc_forgotten_password_selector` (`forgotten_password_selector`),
  ADD UNIQUE KEY `uc_remember_selector` (`remember_selector`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
