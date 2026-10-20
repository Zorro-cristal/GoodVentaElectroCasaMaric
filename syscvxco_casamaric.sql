-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 26-08-2026 a las 12:51:57
-- Versión del servidor: 10.6.28-MariaDB-log
-- Versión de PHP: 8.1.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `syscvxco_casamaric`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accesosuser`
--

CREATE TABLE `accesosuser` (
  `idaccesosUser` int(11) NOT NULL,
  `formulario` varchar(75) DEFAULT NULL,
  `anhadir` varchar(75) DEFAULT NULL,
  `modificar` varchar(75) DEFAULT NULL,
  `buscar` varchar(75) DEFAULT NULL,
  `informes` varchar(75) DEFAULT NULL,
  `frmname` varchar(75) NOT NULL,
  `orden` double NOT NULL,
  `usuarios_idusario` int(11) NOT NULL,
  `accion` varchar(5) NOT NULL,
  `agrupacion` varchar(75) DEFAULT NULL,
  `idlistadodeaccesoFK` int(11) NOT NULL,
  `tipo` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `accesosuser`
--

INSERT INTO `accesosuser` (`idaccesosUser`, `formulario`, `anhadir`, `modificar`, `buscar`, `informes`, `frmname`, `orden`, `usuarios_idusario`, `accion`, `agrupacion`, `idlistadodeaccesoFK`, `tipo`) VALUES
(9138, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 3, 'Administrativo'),
(9139, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 7, 'Administrativo'),
(9140, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 6, 'Administrativo'),
(9141, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 5, 'Administrativo'),
(9142, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 4, 'Administrativo'),
(9143, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 9, 'Administrativo'),
(9144, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 8, 'Administrativo'),
(9145, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 12, 'Administrativo'),
(9146, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 11, 'Administrativo'),
(9147, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 10, 'Administrativo'),
(9148, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 13, 'Administrativo'),
(9149, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 16, 'Administrativo'),
(9150, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 15, 'Administrativo'),
(9151, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 14, 'Administrativo'),
(9152, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 17, 'Administrativo'),
(9153, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 20, 'Administrativo'),
(9154, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 19, 'Administrativo'),
(9155, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 18, 'Administrativo'),
(9156, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 21, 'Administrativo'),
(9157, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 25, 'Administrativo'),
(9158, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 24, 'Administrativo'),
(9159, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 23, 'Administrativo'),
(9160, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 22, 'Administrativo'),
(9161, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 26, 'Administrativo'),
(9162, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 29, 'Administrativo'),
(9163, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 28, 'Administrativo'),
(9164, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 27, 'Administrativo'),
(9165, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 30, 'Administrativo'),
(9166, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 33, 'Administrativo'),
(9167, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 32, 'Administrativo'),
(9168, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 31, 'Administrativo'),
(9169, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 35, 'Administrativo'),
(9170, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 115, 'Administrativo'),
(9171, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 34, 'Administrativo'),
(9172, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 38, 'Administrativo'),
(9173, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 37, 'Administrativo'),
(9174, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 36, 'Administrativo'),
(9175, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 39, 'Administrativo'),
(9176, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 42, 'Administrativo'),
(9177, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 41, 'Administrativo'),
(9178, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 40, 'Administrativo'),
(9179, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 44, 'Administrativo'),
(9180, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 43, 'Administrativo'),
(9181, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 46, 'Administrativo'),
(9182, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 45, 'Administrativo'),
(9183, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 48, 'Administrativo'),
(9184, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 47, 'Administrativo'),
(9185, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 50, 'Administrativo'),
(9186, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 49, 'Administrativo'),
(9187, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 53, 'Administrativo'),
(9188, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 52, 'Administrativo'),
(9189, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 51, 'Administrativo'),
(9190, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 105, 'Administrativo'),
(9191, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 54, 'Administrativo'),
(9192, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 58, 'Administrativo'),
(9193, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 110, 'Administrativo'),
(9194, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 62, 'Administrativo'),
(9195, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 57, 'Administrativo'),
(9196, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 66, 'Administrativo'),
(9197, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 61, 'Administrativo'),
(9198, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 56, 'Administrativo'),
(9199, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 65, 'Administrativo'),
(9200, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 60, 'Administrativo'),
(9201, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 112, 'Administrativo'),
(9202, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 55, 'Administrativo'),
(9203, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 64, 'Administrativo'),
(9204, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 59, 'Administrativo'),
(9205, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 63, 'Administrativo'),
(9206, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 67, 'Administrativo'),
(9207, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 70, 'Administrativo'),
(9208, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 69, 'Administrativo'),
(9209, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 68, 'Administrativo'),
(9210, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 71, 'Administrativo'),
(9211, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 72, 'Administrativo'),
(9212, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 73, 'Administrativo'),
(9213, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 74, 'Administrativo'),
(9214, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 75, 'Administrativo'),
(9215, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 76, 'Administrativo'),
(9216, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 80, 'Administrativo'),
(9217, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 79, 'Administrativo'),
(9218, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 78, 'Administrativo'),
(9219, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 77, 'Administrativo'),
(9220, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 81, 'Administrativo'),
(9221, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 85, 'Administrativo'),
(9222, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 103, 'Administrativo'),
(9223, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 84, 'Administrativo'),
(9224, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 83, 'Administrativo'),
(9225, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 87, 'Administrativo'),
(9226, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 82, 'Administrativo'),
(9227, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 111, 'Administrativo'),
(9228, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 86, 'Administrativo'),
(9229, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 90, 'Administrativo'),
(9230, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 89, 'Administrativo'),
(9231, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 88, 'Administrativo'),
(9232, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 107, 'Administrativo'),
(9233, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 99, 'Administrativo'),
(9234, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 94, 'Administrativo'),
(9235, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 98, 'Administrativo'),
(9236, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 109, 'Administrativo'),
(9237, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 93, 'Administrativo'),
(9238, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 102, 'Administrativo'),
(9239, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 113, 'Administrativo'),
(9240, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 97, 'Administrativo'),
(9241, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 92, 'Administrativo'),
(9242, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 101, 'Administrativo'),
(9243, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 96, 'Administrativo'),
(9244, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 91, 'Administrativo'),
(9245, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 100, 'Administrativo'),
(9246, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 95, 'Administrativo'),
(9247, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 104, 'Administrativo'),
(9249, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 116, 'Administrativo'),
(9260, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 117, 'Administrativo'),
(9714, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 118, 'Administrativo'),
(10067, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 119, 'Administrativo'),
(10075, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 120, 'Administrativo'),
(10083, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 121, 'Administrativo'),
(10091, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 122, 'Administrativo'),
(10099, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 123, 'Administrativo'),
(10107, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 124, 'Administrativo'),
(10823, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 125, 'Administrativo'),
(11550, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 126, 'Administrativo'),
(11551, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 127, 'Administrativo'),
(11552, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 128, 'Administrativo'),
(11553, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 130, 'Administrativo'),
(11554, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 131, 'Administrativo'),
(11555, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 132, 'Administrativo'),
(11556, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 133, 'Administrativo'),
(11557, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 134, 'Administrativo'),
(11558, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 135, 'Administrativo'),
(11559, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 136, 'Administrativo'),
(11560, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 137, 'Administrativo'),
(11561, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 138, 'Administrativo'),
(11562, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 139, 'Administrativo'),
(11563, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 140, 'Administrativo'),
(11564, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 141, 'Administrativo'),
(11565, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 142, 'Administrativo'),
(11566, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 143, 'Administrativo'),
(11567, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 144, 'Administrativo'),
(11568, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 145, 'Administrativo'),
(11569, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 146, 'Administrativo'),
(11570, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 147, 'Administrativo'),
(11571, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 148, 'Administrativo'),
(11572, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 149, 'Administrativo'),
(11573, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 150, 'Administrativo'),
(11574, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 151, 'Administrativo'),
(11575, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 152, 'Administrativo'),
(11576, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 153, 'Administrativo'),
(11577, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 154, 'Administrativo'),
(11578, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 155, 'Administrativo'),
(11579, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 156, 'Administrativo'),
(11580, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 157, 'Administrativo'),
(11581, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 158, 'Administrativo'),
(11582, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 159, 'Administrativo'),
(11583, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 160, 'Administrativo'),
(11584, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 161, 'Administrativo'),
(11585, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 162, 'Administrativo'),
(11586, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 163, 'Administrativo'),
(11587, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 164, 'Administrativo'),
(11588, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 165, 'Administrativo'),
(11589, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 166, 'Administrativo'),
(11590, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 167, 'Administrativo'),
(11591, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 168, 'Administrativo'),
(11592, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 169, 'Administrativo'),
(11593, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 170, 'Administrativo'),
(11594, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 171, 'Administrativo'),
(11595, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 172, 'Administrativo'),
(11596, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 173, 'Administrativo'),
(11597, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 174, 'Administrativo'),
(11598, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 175, 'Administrativo'),
(11599, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 176, 'Administrativo'),
(11600, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 177, 'Administrativo'),
(11601, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 178, 'Administrativo'),
(11602, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 179, 'Administrativo'),
(11603, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 180, 'Administrativo'),
(11604, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 181, 'Administrativo'),
(11605, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 182, 'Administrativo'),
(11606, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 183, 'Administrativo'),
(11607, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 184, 'Administrativo'),
(11608, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 185, 'Administrativo'),
(11609, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 186, 'Administrativo'),
(11610, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 187, 'Administrativo'),
(11611, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 188, 'Administrativo'),
(11612, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 189, 'Administrativo'),
(11613, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 190, 'Administrativo'),
(11614, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 191, 'Administrativo'),
(11615, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 192, 'Administrativo'),
(11616, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 193, 'Administrativo'),
(11617, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 194, 'Administrativo'),
(11618, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 195, 'Administrativo'),
(11619, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 196, 'Administrativo'),
(11620, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 197, 'Administrativo'),
(11621, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 198, 'Administrativo'),
(11622, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 199, 'Administrativo'),
(11623, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 200, 'Administrativo'),
(11624, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 201, 'Administrativo'),
(11625, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 202, 'Administrativo'),
(11626, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 203, 'Administrativo'),
(11627, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 204, 'Administrativo'),
(11628, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 205, 'Administrativo'),
(11629, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 206, 'Administrativo'),
(11630, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 207, 'Administrativo'),
(11631, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 208, 'Administrativo'),
(11632, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 210, 'Administrativo'),
(11633, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 211, 'Administrativo'),
(11634, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 212, 'Administrativo'),
(11635, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 213, 'Administrativo'),
(11636, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 214, 'Administrativo'),
(11637, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 215, 'Administrativo'),
(11638, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 216, 'Administrativo'),
(11639, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 217, 'Administrativo'),
(11640, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 218, 'Administrativo'),
(11641, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 219, 'Administrativo'),
(11642, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 220, 'Administrativo'),
(11643, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 221, 'Administrativo'),
(11644, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 222, 'Administrativo'),
(11645, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 223, 'Administrativo'),
(11646, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 224, 'Administrativo'),
(11647, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 225, 'Administrativo'),
(11648, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 226, 'Administrativo'),
(11649, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 227, 'Administrativo'),
(11650, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 228, 'Administrativo'),
(11651, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 229, 'Administrativo'),
(11652, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 230, 'Administrativo'),
(11653, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 231, 'Administrativo'),
(11654, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 232, 'Administrativo'),
(11655, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 233, 'Administrativo'),
(11656, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 234, 'Administrativo'),
(11657, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 235, 'Administrativo'),
(11658, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 236, 'Administrativo'),
(11659, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 237, 'Administrativo'),
(11660, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 238, 'Administrativo'),
(11661, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 239, 'Administrativo'),
(11662, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 240, 'Administrativo'),
(11663, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 241, 'Administrativo'),
(11664, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 242, 'Administrativo'),
(11665, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 243, 'Administrativo'),
(11666, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 244, 'Administrativo'),
(11667, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 245, 'Administrativo'),
(11668, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 246, 'Administrativo'),
(11669, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 247, 'Administrativo'),
(11670, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 248, 'Administrativo'),
(11671, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 249, 'Administrativo'),
(11672, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 250, 'Administrativo'),
(11673, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 251, 'Administrativo'),
(11674, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 252, 'Administrativo'),
(11675, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 253, 'Administrativo'),
(16850, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 254, 'Administrativo'),
(16863, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 255, 'Administrativo'),
(16876, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 256, 'Administrativo'),
(18632, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 257, 'Administrativo'),
(18648, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 258, 'Administrativo'),
(18664, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 259, 'Administrativo'),
(18680, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 260, 'Administrativo'),
(18696, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 261, 'Administrativo'),
(18712, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 262, 'Administrativo'),
(18728, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 263, 'Administrativo'),
(18744, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 264, 'Administrativo'),
(18760, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 265, 'Administrativo'),
(18776, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 266, 'Administrativo'),
(18792, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 267, 'Administrativo'),
(18808, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 268, 'Administrativo'),
(18824, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 269, 'Administrativo'),
(18840, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 270, 'Administrativo'),
(18856, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 271, 'Administrativo'),
(18872, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 272, 'Administrativo'),
(18888, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 273, 'Administrativo'),
(18904, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 274, 'Administrativo'),
(18920, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'NO', NULL, 275, 'Administrativo'),
(18936, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 276, 'Administrativo'),
(18952, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'NO', NULL, 277, 'Administrativo'),
(18968, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'NO', NULL, 278, 'Administrativo'),
(18984, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'NO', NULL, 279, 'Administrativo'),
(19000, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'NO', NULL, 280, 'Administrativo'),
(19016, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'NO', NULL, 281, 'Administrativo'),
(19032, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 282, 'Administrativo'),
(19048, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 283, 'Administrativo'),
(19064, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 284, 'Administrativo'),
(19080, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 285, 'Administrativo'),
(19096, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 286, 'Administrativo'),
(19112, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 287, 'Administrativo'),
(19128, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 288, 'Administrativo'),
(19144, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 289, 'Administrativo'),
(19160, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 290, 'Administrativo'),
(19176, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 291, 'Administrativo'),
(19192, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 292, 'Administrativo'),
(19208, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 293, 'Administrativo'),
(19224, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 294, 'Administrativo'),
(19240, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 295, 'Administrativo'),
(19256, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 296, 'Administrativo'),
(19272, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 297, 'Administrativo'),
(19288, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 298, 'Administrativo'),
(19304, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 299, 'Administrativo'),
(19320, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 300, 'Administrativo'),
(19336, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 301, 'Administrativo'),
(19352, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 302, 'Administrativo'),
(19368, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 303, 'Administrativo'),
(19384, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 304, 'Administrativo'),
(22564, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 262, 'Administrativo'),
(22565, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 240, 'Administrativo'),
(22566, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 239, 'Administrativo'),
(22567, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 238, 'Administrativo'),
(22568, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 237, 'Administrativo'),
(22569, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 236, 'Administrativo'),
(22570, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 235, 'Administrativo'),
(22571, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 234, 'Administrativo'),
(22572, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 233, 'Administrativo'),
(22573, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 232, 'Administrativo'),
(22574, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 231, 'Administrativo'),
(22575, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 230, 'Administrativo'),
(22576, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 229, 'Administrativo'),
(22577, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 228, 'Administrativo'),
(22578, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 227, 'Administrativo'),
(22579, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 223, 'Administrativo'),
(22580, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 222, 'Administrativo'),
(22581, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 220, 'Administrativo'),
(22582, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 241, 'Administrativo'),
(22583, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 242, 'Administrativo'),
(22584, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 243, 'Administrativo'),
(22585, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 261, 'Administrativo'),
(22586, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 260, 'Administrativo'),
(22587, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 259, 'Administrativo'),
(22588, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 258, 'Administrativo'),
(22589, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 257, 'Administrativo'),
(22590, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 256, 'Administrativo'),
(22591, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 254, 'Administrativo'),
(22592, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 253, 'Administrativo'),
(22593, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 252, 'Administrativo'),
(22594, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 251, 'Administrativo'),
(22595, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 250, 'Administrativo'),
(22596, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 249, 'Administrativo'),
(22597, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 248, 'Administrativo'),
(22598, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 247, 'Administrativo'),
(22599, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 246, 'Administrativo'),
(22600, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 245, 'Administrativo'),
(22601, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 244, 'Administrativo'),
(22602, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 219, 'Administrativo'),
(22603, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 218, 'Administrativo'),
(22604, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 195, 'Administrativo'),
(22605, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 194, 'Administrativo'),
(22606, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 193, 'Administrativo'),
(22607, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 191, 'Administrativo'),
(22608, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 190, 'Administrativo'),
(22609, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 189, 'Administrativo'),
(22610, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 188, 'Administrativo'),
(22611, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 187, 'Administrativo'),
(22612, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 186, 'Administrativo'),
(22613, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 185, 'Administrativo'),
(22614, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 184, 'Administrativo'),
(22615, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 182, 'Administrativo'),
(22616, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 181, 'Administrativo'),
(22617, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 179, 'Administrativo'),
(22618, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 178, 'Administrativo'),
(22619, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 177, 'Administrativo'),
(22620, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 176, 'Administrativo'),
(22621, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 196, 'Administrativo'),
(22622, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 198, 'Administrativo'),
(22623, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 199, 'Administrativo'),
(22624, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 217, 'Administrativo'),
(22625, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 216, 'Administrativo'),
(22626, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 215, 'Administrativo'),
(22627, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 214, 'Administrativo'),
(22628, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 213, 'Administrativo'),
(22629, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 212, 'Administrativo'),
(22630, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 211, 'Administrativo'),
(22631, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 210, 'Administrativo'),
(22632, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 208, 'Administrativo'),
(22633, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 207, 'Administrativo'),
(22634, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 206, 'Administrativo'),
(22635, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 205, 'Administrativo'),
(22636, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 204, 'Administrativo'),
(22637, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 203, 'Administrativo'),
(22638, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 202, 'Administrativo'),
(22639, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 201, 'Administrativo'),
(22640, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 200, 'Administrativo'),
(22641, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 175, 'Administrativo'),
(22642, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 301, 'Administrativo'),
(22643, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 294, 'Administrativo'),
(22644, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 293, 'Administrativo'),
(22645, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 292, 'Administrativo'),
(22646, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 291, 'Administrativo'),
(22647, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 290, 'Administrativo'),
(22648, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 289, 'Administrativo'),
(22649, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 288, 'Administrativo'),
(22650, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 287, 'Administrativo'),
(22651, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 303, 'Administrativo'),
(22652, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 295, 'Administrativo'),
(22653, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 296, 'Administrativo'),
(22654, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 304, 'Administrativo'),
(22655, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 267, 'Administrativo'),
(22656, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 302, 'Administrativo'),
(22657, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 300, 'Administrativo'),
(22658, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 299, 'Administrativo'),
(22659, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 197, 'Administrativo'),
(22660, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 298, 'Administrativo'),
(22661, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 297, 'Administrativo'),
(22662, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 286, 'Administrativo'),
(22663, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 285, 'Administrativo'),
(22664, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 284, 'Administrativo'),
(22665, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 272, 'Administrativo'),
(22666, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 271, 'Administrativo'),
(22667, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 270, 'Administrativo'),
(22668, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 269, 'Administrativo'),
(22669, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 268, 'Administrativo'),
(22670, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 266, 'Administrativo'),
(22671, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 265, 'Administrativo'),
(22672, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 264, 'Administrativo'),
(22673, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 263, 'Administrativo'),
(22674, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 273, 'Administrativo'),
(22675, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 274, 'Administrativo'),
(22676, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 283, 'Administrativo'),
(22677, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 282, 'Administrativo'),
(22678, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 281, 'Administrativo'),
(22679, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 280, 'Administrativo'),
(22680, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 279, 'Administrativo'),
(22681, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 278, 'Administrativo'),
(22682, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 277, 'Administrativo'),
(22683, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 276, 'Administrativo'),
(22684, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 275, 'Administrativo'),
(22685, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 5, 'Administrativo'),
(22686, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 6, 'Administrativo'),
(22687, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 7, 'Administrativo'),
(22688, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 4, 'Administrativo'),
(22689, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 226, 'Administrativo'),
(22690, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 3, 'Administrativo'),
(22691, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 8, 'Administrativo'),
(22692, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 9, 'Administrativo'),
(22693, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 12, 'Administrativo'),
(22694, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 13, 'Administrativo'),
(22695, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 11, 'Administrativo'),
(22696, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 10, 'Administrativo'),
(22697, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 14, 'Administrativo'),
(22698, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 15, 'Administrativo'),
(22699, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 16, 'Administrativo'),
(22700, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 17, 'Administrativo'),
(22701, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 18, 'Administrativo'),
(22702, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 19, 'Administrativo'),
(22703, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 20, 'Administrativo'),
(22704, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 21, 'Administrativo'),
(22705, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 23, 'Administrativo'),
(22706, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 25, 'Administrativo'),
(22707, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 24, 'Administrativo'),
(22708, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 22, 'Administrativo'),
(22709, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 26, 'Administrativo'),
(22710, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 27, 'Administrativo'),
(22711, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 29, 'Administrativo'),
(22712, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 28, 'Administrativo'),
(22713, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 33, 'Administrativo'),
(22714, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 31, 'Administrativo'),
(22715, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 30, 'Administrativo'),
(22716, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 32, 'Administrativo'),
(22717, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 34, 'Administrativo'),
(22718, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 35, 'Administrativo'),
(22719, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 128, 'Administrativo'),
(22720, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 115, 'Administrativo'),
(22721, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 38, 'Administrativo'),
(22722, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 37, 'Administrativo'),
(22723, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 36, 'Administrativo'),
(22724, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 180, 'Administrativo'),
(22725, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 40, 'Administrativo'),
(22726, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 39, 'Administrativo'),
(22727, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 41, 'Administrativo'),
(22728, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 42, 'Administrativo'),
(22729, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 46, 'Administrativo'),
(22730, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 45, 'Administrativo'),
(22731, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 44, 'Administrativo'),
(22732, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 43, 'Administrativo'),
(22733, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 47, 'Administrativo'),
(22734, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 48, 'Administrativo'),
(22735, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 49, 'Administrativo'),
(22736, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 50, 'Administrativo'),
(22737, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 51, 'Administrativo'),
(22738, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 52, 'Administrativo'),
(22739, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 53, 'Administrativo'),
(22740, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 54, 'Administrativo'),
(22741, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 105, 'Administrativo'),
(22742, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 118, 'Administrativo'),
(22743, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 138, 'Administrativo'),
(22744, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 137, 'Administrativo'),
(22745, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 136, 'Administrativo'),
(22746, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 135, 'Administrativo'),
(22747, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 134, 'Administrativo'),
(22748, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 133, 'Administrativo'),
(22749, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 132, 'Administrativo'),
(22750, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 131, 'Administrativo'),
(22751, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 130, 'Administrativo'),
(22752, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 63, 'Administrativo'),
(22753, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 64, 'Administrativo'),
(22754, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 65, 'Administrativo'),
(22755, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 110, 'Administrativo'),
(22756, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 112, 'Administrativo'),
(22757, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 66, 'Administrativo'),
(22758, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 116, 'Administrativo'),
(22759, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 192, 'Administrativo'),
(22760, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 139, 'Administrativo'),
(22761, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 140, 'Administrativo'),
(22762, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 169, 'Administrativo'),
(22763, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 56, 'Administrativo'),
(22764, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 55, 'Administrativo'),
(22765, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 142, 'Administrativo'),
(22766, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 57, 'Administrativo'),
(22767, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 170, 'Administrativo'),
(22768, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 183, 'Administrativo'),
(22769, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 174, 'Administrativo'),
(22770, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 171, 'Administrativo'),
(22771, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 58, 'Administrativo'),
(22772, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 59, 'Administrativo'),
(22773, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 143, 'Administrativo'),
(22774, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 62, 'Administrativo'),
(22775, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 145, 'Administrativo'),
(22776, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 141, 'Administrativo'),
(22777, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 146, 'Administrativo'),
(22778, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 147, 'Administrativo'),
(22779, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 61, 'Administrativo'),
(22780, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 60, 'Administrativo'),
(22781, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 144, 'Administrativo'),
(22782, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 255, 'Administrativo'),
(22783, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 70, 'Administrativo'),
(22784, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 69, 'Administrativo'),
(22785, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 68, 'Administrativo'),
(22786, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 67, 'Administrativo'),
(22787, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 71, 'Administrativo'),
(22788, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 72, 'Administrativo'),
(22789, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 73, 'Administrativo'),
(22790, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 119, 'Administrativo'),
(22791, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 74, 'Administrativo'),
(22792, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 120, 'Administrativo'),
(22793, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 75, 'Administrativo'),
(22794, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 76, 'Administrativo'),
(22795, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 80, 'Administrativo'),
(22796, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 79, 'Administrativo'),
(22797, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 78, 'Administrativo'),
(22798, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 77, 'Administrativo'),
(22799, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 81, 'Administrativo'),
(22800, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 111, 'Administrativo'),
(22801, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 87, 'Administrativo'),
(22802, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 86, 'Administrativo'),
(22803, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 85, 'Administrativo'),
(22804, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 84, 'Administrativo'),
(22805, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 83, 'Administrativo'),
(22806, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 82, 'Administrativo'),
(22807, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 103, 'Administrativo'),
(22808, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 89, 'Administrativo'),
(22809, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 90, 'Administrativo'),
(22810, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 88, 'Administrativo'),
(22811, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 107, 'Administrativo'),
(22812, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 109, 'Administrativo'),
(22813, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 113, 'Administrativo'),
(22814, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 125, 'Administrativo'),
(22815, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 104, 'Administrativo'),
(22816, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 102, 'Administrativo'),
(22817, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 101, 'Administrativo'),
(22818, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 100, 'Administrativo'),
(22819, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 99, 'Administrativo'),
(22820, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 98, 'Administrativo'),
(22821, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 91, 'Administrativo'),
(22822, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 92, 'Administrativo'),
(22823, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 93, 'Administrativo'),
(22824, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 94, 'Administrativo'),
(22825, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 95, 'Administrativo'),
(22826, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 96, 'Administrativo'),
(22827, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 97, 'Administrativo'),
(22828, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 117, 'Administrativo'),
(22829, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 168, 'Administrativo'),
(22830, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 124, 'Administrativo'),
(22831, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 165, 'Administrativo'),
(22832, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 122, 'Administrativo'),
(22833, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 121, 'Administrativo'),
(22834, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 167, 'Administrativo'),
(22835, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 123, 'Administrativo'),
(22836, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 126, 'Administrativo'),
(22837, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 151, 'Administrativo'),
(22838, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 149, 'Administrativo'),
(22839, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 148, 'Administrativo'),
(22840, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 150, 'Administrativo'),
(22841, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 155, 'Administrativo'),
(22842, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 152, 'Administrativo'),
(22843, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 153, 'Administrativo'),
(22844, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 154, 'Administrativo'),
(22845, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 156, 'Administrativo'),
(22846, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 158, 'Administrativo'),
(22847, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 159, 'Administrativo'),
(22848, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 157, 'Administrativo'),
(22849, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 172, 'Administrativo'),
(22850, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 173, 'Administrativo'),
(22851, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 166, 'Administrativo'),
(22852, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 164, 'Administrativo'),
(22853, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 163, 'Administrativo'),
(22854, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 162, 'Administrativo'),
(22855, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 161, 'Administrativo'),
(22856, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 160, 'Administrativo'),
(22857, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 221, 'Administrativo'),
(22858, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 224, 'Administrativo'),
(22859, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 225, 'Administrativo'),
(22860, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 127, 'Administrativo'),
(24643, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 305, 'Administrativo'),
(24644, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'NO', NULL, 305, 'Administrativo'),
(24660, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 306, 'Administrativo'),
(24661, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 306, 'Administrativo'),
(24976, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'NO', NULL, 307, 'Administrativo'),
(24977, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'NO', NULL, 307, 'Administrativo'),
(24994, NULL, NULL, NULL, NULL, NULL, '', 0, 1, 'SI', NULL, 308, 'Administrativo'),
(24995, NULL, NULL, NULL, NULL, NULL, '', 0, 2, 'SI', NULL, 308, 'Administrativo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accesos_directos_usuario`
--

CREATE TABLE `accesos_directos_usuario` (
  `cod_usuario` int(11) NOT NULL,
  `clave_acceso` char(40) NOT NULL,
  `accion` varchar(500) NOT NULL,
  `orden` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `accesos_directos_usuario`
--

INSERT INTO `accesos_directos_usuario` (`cod_usuario`, `clave_acceso`, `accion`, `orden`, `actualizado_en`) VALUES
(1, '076c1327bfdd9651dea39920de69c0dd3836f973', 'verCerrarAbmCheque()', 1, '2026-08-10 13:26:44'),
(1, '4b6a7870beaa29a6793917ec61849bdd5ef74ce1', 'verCerrarAbmProducto()', 14, '2026-08-10 13:26:44'),
(1, '530c39934185bccd8a82416aca95a8d06ccf4940', 'verCerrarAbmsolicotud()', 15, '2026-08-10 13:26:44'),
(1, '6838f460c94e4da2d8fbb2c067a03bae066ef032', 'vercerrarDashboardSocio()', 5, '2026-08-10 13:26:44'),
(1, '6f78e2d1ddf2f467003e5a9d8620e3b9f5402222', 'verCerrarInformeGananciasVentas()', 11, '2026-08-10 13:26:44'),
(1, '7817d86be6700528ffef47dcd797f668e7e6eab0', 'verCerrarInformeConsultaCaja(1)', 4, '2026-08-10 13:26:44'),
(1, '91c9bc12b3cfbfd2740ef99da283baf6b422a498', 'verCerrarHistorialCompra()', 9, '2026-08-10 13:26:44'),
(1, '9c4b53f6a1b26bd32c615df6530dca97049ac2f3', 'verCerrarAbmChequeACobrar()', 2, '2026-08-10 13:26:44'),
(1, '9d6d9f9c10fb646c5a0fa38f0b9bbc4de884e09a', 'verCerrarAbmVenta()', 13, '2026-08-10 13:26:44'),
(1, 'a138050aab6cefa87ee46cef11b481c1c1193c84', 'verCerrarAbmListadoDespacho(\"1\")', 7, '2026-08-10 13:26:44'),
(1, 'b47f955547646d33a7b4999ccef2b74c7707674c', 'verCerrarAbmCompra()', 0, '2026-08-10 13:26:44'),
(1, 'c0dbc405a6685bebb964946c04d7f9f4f9357ea2', 'verCerrarInformeExpedientes()', 8, '2026-08-10 13:26:44'),
(1, 'd311c5972cf413e4a164af3d40379e8683cc0363', 'verCerrarInformeArqueo()', 3, '2026-08-10 13:26:44'),
(1, 'd388c4b02960e3f54228398d35122fa924893609', 'verCerrarHistorialVenta()', 10, '2026-08-10 13:26:44'),
(1, 'ec1a44a8ccd5ed1770c21dd8c63d5e75d9480a80', 'verCerrarCuentasACobrar()', 6, '2026-08-10 13:26:44'),
(1, 'edb9eec4907c55780b97f1b144a8a319eebd7d24', 'verCerrarAbmUsuarios()', 16, '2026-08-10 13:26:44'),
(1, 'fffda1641fddf11c351ee353a4ad9b393c8d1139', 'abrirMapaClientes()', 12, '2026-08-10 13:26:44'),
(2, '4b6a7870beaa29a6793917ec61849bdd5ef74ce1', 'verCerrarAbmProducto()', 8, '2026-07-27 17:23:30'),
(2, '508d352c6c256a998fbe549a6dfd99f41081350a', 'verCerrarAbmClientes()', 6, '2026-07-27 17:23:30'),
(2, '530c39934185bccd8a82416aca95a8d06ccf4940', 'verCerrarAbmsolicotud()', 9, '2026-07-27 17:23:30'),
(2, '632df6cae6fb718ad5d40e258763abfb8d14d6df', 'verCerrarInformeCatalogo()', 0, '2026-07-27 17:23:30'),
(2, '6838f460c94e4da2d8fbb2c067a03bae066ef032', 'vercerrarDashboardSocio()', 2, '2026-07-27 17:23:30'),
(2, '9d6d9f9c10fb646c5a0fa38f0b9bbc4de884e09a', 'verCerrarAbmVenta()', 7, '2026-07-27 17:23:30'),
(2, 'd311c5972cf413e4a164af3d40379e8683cc0363', 'verCerrarInformeArqueo()', 1, '2026-07-27 17:23:30'),
(2, 'd388c4b02960e3f54228398d35122fa924893609', 'verCerrarHistorialVenta()', 4, '2026-07-27 17:23:30'),
(2, 'ec1a44a8ccd5ed1770c21dd8c63d5e75d9480a80', 'verCerrarCuentasACobrar()', 3, '2026-07-27 17:23:30'),
(2, 'f9125a3aaf37651b505afb4511d705fbd21fa21f', 'verCerrarAbmTipoPago()', 5, '2026-07-27 17:23:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad_callcenter`
--

CREATE TABLE `actividad_callcenter` (
  `idactividad_callcenter` int(11) NOT NULL,
  `cod_callcenterFK` int(11) DEFAULT NULL,
  `cod_usarioFK` int(11) DEFAULT NULL,
  `cod_clienteFK` int(11) DEFAULT NULL,
  `actividad` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad_callcenter_ventas`
--

CREATE TABLE `actividad_callcenter_ventas` (
  `idactividad_callcenter_ventas` int(11) NOT NULL,
  `cod_detalle_callcenterventas` int(11) DEFAULT NULL,
  `agente_cod_usarioFK` int(11) DEFAULT NULL,
  `nombre_cliente` int(11) DEFAULT NULL,
  `actividad` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin_local`
--

CREATE TABLE `admin_local` (
  `idadmin_local` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda_callcenterventas`
--

CREATE TABLE `agenda_callcenterventas` (
  `idagenda_callcenterventas` int(11) NOT NULL,
  `observacion` varchar(256) DEFAULT NULL,
  `iddetalle_callcenterventasFK` int(11) NOT NULL,
  `fecha_insert` date DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda_personal`
--

CREATE TABLE `agenda_personal` (
  `idagenda_personal` int(11) NOT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `fecha` varchar(45) DEFAULT NULL,
  `cod_usuario` int(11) DEFAULT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_tipo_agendaFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aperturacajaapp`
--

CREATE TABLE `aperturacajaapp` (
  `idaperturacajaapp` int(11) NOT NULL,
  `fechaapertura` datetime DEFAULT NULL,
  `fechacierre` datetime DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `montocierre` int(11) DEFAULT 0,
  `cod_cobrador` int(11) NOT NULL,
  `montogasto` int(11) DEFAULT NULL,
  `totalcaja` int(11) DEFAULT NULL,
  `cod_AperturaCajaFK` int(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos_cliente`
--

CREATE TABLE `archivos_cliente` (
  `idarchivos_cliente` int(11) NOT NULL,
  `url` varchar(150) NOT NULL,
  `cod_clienteFK` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `estado_archivo` varchar(45) DEFAULT NULL,
  `calificacion` varchar(45) DEFAULT NULL,
  `cod_solicitud_creditoFK` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos_funcionario`
--

CREATE TABLE `archivos_funcionario` (
  `idarchivos_funcionario` int(11) NOT NULL,
  `url` varchar(150) NOT NULL,
  `cod_funcionarioFK` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos_general`
--

CREATE TABLE `archivos_general` (
  `idarchivos_general` int(11) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `url` varchar(128) DEFAULT NULL,
  `mes` varchar(45) DEFAULT NULL,
  `anho` varchar(45) DEFAULT NULL,
  `cod_descripcion_tipo_movimientoFK` int(11) NOT NULL,
  `cod_descripcion_carga_archivoFK` int(11) NOT NULL,
  `fecha_carga` datetime DEFAULT NULL,
  `user_insert` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos_listacontroldeposito`
--

CREATE TABLE `archivos_listacontroldeposito` (
  `idarchivos_listacontroldeposito` int(11) NOT NULL,
  `url` varchar(150) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `idlista_controldepositoFK` int(11) NOT NULL,
  `fecha_insert` date DEFAULT NULL,
  `user_insert` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos_pedido_proveedor`
--

CREATE TABLE `archivos_pedido_proveedor` (
  `idarchivos_pedido_proveedor` int(11) NOT NULL,
  `url` varchar(150) NOT NULL,
  `cod_proveedorFK` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `arqueocaja`
--

CREATE TABLE `arqueocaja` (
  `idarqueocaja` int(11) NOT NULL,
  `cajanro` varchar(45) DEFAULT NULL,
  `puntoexpedicion` varchar(45) DEFAULT NULL,
  `montoapertura` double DEFAULT 0,
  `montocierre` double DEFAULT 0,
  `fechaapertura` datetime DEFAULT NULL,
  `fechacierre` datetime DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `codusuarioap` varchar(45) DEFAULT NULL,
  `codusuarioce` varchar(45) DEFAULT NULL,
  `cod_local` int(11) NOT NULL,
  `caja_idcaja` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `arqueocaja`
--

INSERT INTO `arqueocaja` (`idarqueocaja`, `cajanro`, `puntoexpedicion`, `montoapertura`, `montocierre`, `fechaapertura`, `fechacierre`, `estado`, `codusuarioap`, `codusuarioce`, `cod_local`, `caja_idcaja`) VALUES
(1, NULL, NULL, 0, 0, '2026-08-22 16:08:00', NULL, 'Activo', '2', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoriaproducto`
--

CREATE TABLE `auditoriaproducto` (
  `idauditoriaProducto` int(11) NOT NULL,
  `nombre_descripcion` varchar(100) DEFAULT NULL,
  `precio_compra` int(11) DEFAULT NULL,
  `precio_venta` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `cod_barra` varchar(45) DEFAULT NULL,
  `nombredescripcionAnt` varchar(100) DEFAULT NULL,
  `precio_compraAnt` int(11) DEFAULT NULL,
  `precio_ventaAnt` int(11) DEFAULT NULL,
  `stockAnt` int(11) DEFAULT NULL,
  `cod_barraAnt` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cod_usuarioFK` int(11) DEFAULT NULL,
  `accion` varchar(20) DEFAULT NULL,
  `cod_productoFK` varchar(20) DEFAULT NULL,
  `cod_localfk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoria_productos`
--

CREATE TABLE `auditoria_productos` (
  `idauditoria_productos` int(11) NOT NULL,
  `cod_producto` int(11) DEFAULT NULL,
  `nombre_producto` varchar(255) DEFAULT NULL,
  `precio_producto` bigint(20) DEFAULT NULL,
  `cod_barra` varchar(45) DEFAULT NULL,
  `accion` varchar(45) DEFAULT NULL,
  `fecha_accion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoria_stock_locales`
--

CREATE TABLE `auditoria_stock_locales` (
  `idauditoria_stock_locales` int(11) NOT NULL,
  `cant_ant` int(11) DEFAULT NULL,
  `cod_producto` int(11) DEFAULT NULL,
  `cod_local` int(11) DEFAULT NULL,
  `user_update` int(11) DEFAULT NULL,
  `accion` varchar(45) DEFAULT NULL,
  `fecha_accion` datetime DEFAULT NULL,
  `cant_nueva` int(11) DEFAULT NULL,
  `can` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `balance_general`
--

CREATE TABLE `balance_general` (
  `cod_balance_general` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_usuarioFK` int(11) DEFAULT NULL,
  `monto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `banco`
--

CREATE TABLE `banco` (
  `idbanco` int(11) NOT NULL,
  `nombre` varchar(75) NOT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `banco_liquidez`
--

CREATE TABLE `banco_liquidez` (
  `idbanco_liquidez` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caja`
--

CREATE TABLE `caja` (
  `idcaja` int(11) NOT NULL,
  `cajanro` varchar(45) DEFAULT NULL,
  `puntoexpedicion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_localFK` int(11) NOT NULL,
  `cod_user_insert` varchar(45) DEFAULT NULL,
  `cod_user_edit` varchar(45) DEFAULT NULL,
  `fecha_insert` datetime DEFAULT NULL,
  `fecha_edit` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `caja`
--

INSERT INTO `caja` (`idcaja`, `cajanro`, `puntoexpedicion`, `estado`, `cod_localFK`, `cod_user_insert`, `cod_user_edit`, `fecha_insert`, `fecha_edit`) VALUES
(1, 'CAJA 1', '001', 'Activo', 1, '2', NULL, '2026-08-22 15:25:47', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion_cobrador`
--

CREATE TABLE `calificacion_cobrador` (
  `cod_calificacion_cobrador` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `rangoinicio` int(11) DEFAULT NULL,
  `rangofin` int(11) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo',
  `puntaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion_entrega`
--

CREATE TABLE `calificacion_entrega` (
  `idcalificacion_entrega` int(11) NOT NULL,
  `observacion` varchar(512) DEFAULT NULL,
  `calificacion` int(1) DEFAULT NULL,
  `idSolicitudCreditoFK` int(11) DEFAULT NULL,
  `user_insert` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'PENDIENTE',
  `fecha_insert` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion_entrega_contado`
--

CREATE TABLE `calificacion_entrega_contado` (
  `idcalificacion_entrega_contado` int(11) NOT NULL,
  `observacion` varchar(512) DEFAULT NULL,
  `calificacion` int(1) DEFAULT NULL,
  `cod_ventaFK` int(11) DEFAULT NULL,
  `user_insert` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'PENDIENTE',
  `fecha_insert` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion_vendedor`
--

CREATE TABLE `calificacion_vendedor` (
  `cod_calificacion_vendedor` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `rangoinicio` int(11) DEFAULT NULL,
  `rangofin` int(11) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo',
  `puntaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `callcenter_ventas`
--

CREATE TABLE `callcenter_ventas` (
  `idcallcenter_ventas` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `cod_localFK` int(11) DEFAULT NULL,
  `condicion` varchar(45) DEFAULT NULL,
  `cod_zonaFK` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `ingresado_por_userFK` int(11) DEFAULT NULL,
  `fecha_insert` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `call_center`
--

CREATE TABLE `call_center` (
  `idcall_center` int(11) NOT NULL,
  `cod_usuarioFK` int(11) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'ACTIVO',
  `fecha_fin_periodo` date DEFAULT NULL,
  `fecha_inicio_periodo` date DEFAULT NULL,
  `fecha_generado` date DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cambiarproducto`
--

CREATE TABLE `cambiarproducto` (
  `idcambiarproducto` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `cod_productoFK` varchar(45) NOT NULL,
  `cod_ventaFK` int(11) NOT NULL,
  `cod_usuarioFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cambios`
--

CREATE TABLE `cambios` (
  `idcambios` int(11) NOT NULL,
  `motivo` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cant` double DEFAULT NULL,
  `cod_producto` varchar(45) NOT NULL,
  `coddetalleventa` int(11) NOT NULL,
  `cod_venta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cancelaciones`
--

CREATE TABLE `cancelaciones` (
  `idcancelaciones` int(11) NOT NULL,
  `montodevuelto` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `motivo` varchar(100) DEFAULT NULL,
  `cod_venta` int(11) NOT NULL,
  `cod_usuario` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargar_calificacion_cobrador`
--

CREATE TABLE `cargar_calificacion_cobrador` (
  `cod_cargar_calificacion_cobrador` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo',
  `puntos` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargar_calificacion_vendedor`
--

CREATE TABLE `cargar_calificacion_vendedor` (
  `cod_cargar_calificacion_vendedor` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo',
  `puntos` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carga_precios`
--

CREATE TABLE `carga_precios` (
  `desde` varchar(100) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `idcargos` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `cod_categoria` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`cod_categoria`, `descripcion`, `Estado`) VALUES
(1, 'GENERAL', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriagasto`
--

CREATE TABLE `categoriagasto` (
  `cod_categoriaGasto` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_lista_precio`
--

CREATE TABLE `categoria_lista_precio` (
  `idcategoria_lista_precio` int(11) NOT NULL,
  `accion` varchar(45) DEFAULT NULL,
  `cod_lista_precio_productoFK` int(11) NOT NULL,
  `cod_categoriaFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cheque`
--

CREATE TABLE `cheque` (
  `idcheque` int(11) NOT NULL,
  `fecemi` date NOT NULL,
  `nroche` int(11) NOT NULL,
  `fecven` date NOT NULL,
  `orden` varchar(200) NOT NULL,
  `concep` varchar(200) NOT NULL,
  `importe` bigint(20) NOT NULL,
  `pagado` int(11) NOT NULL,
  `cod_bancoFK` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `cod_compraFk` varchar(45) NOT NULL,
  `ingresadopor_cod_user` varchar(45) NOT NULL,
  `fechaingresado` varchar(45) NOT NULL,
  `url` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chequeacobrar`
--

CREATE TABLE `chequeacobrar` (
  `idchequeacobrar` int(11) NOT NULL,
  `fecemi` date NOT NULL,
  `nroche` int(11) NOT NULL,
  `fecven` date NOT NULL,
  `orden` varchar(200) NOT NULL,
  `concep` varchar(200) NOT NULL,
  `importe` bigint(20) NOT NULL,
  `pagado` int(11) NOT NULL,
  `cod_bancoFK` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `cod_compraFk` varchar(45) NOT NULL,
  `ingresadopor_cod_user` varchar(45) NOT NULL,
  `fechaingresado` varchar(45) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `nombre_banco` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `cod_cliente` int(11) NOT NULL,
  `rut_cliente` varchar(20) NOT NULL,
  `Calificacion` varchar(10) DEFAULT NULL,
  `whapp` varchar(15) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lot` double DEFAULT NULL,
  `estado` varchar(15) DEFAULT 'Activo',
  `idzonaFk` int(11) NOT NULL,
  `foto1` varchar(150) NOT NULL,
  `foto2` varchar(150) NOT NULL,
  `ci_cliente` varchar(45) DEFAULT NULL,
  `totaldias` varchar(45) DEFAULT NULL,
  `lugardetrabajo` varchar(45) DEFAULT NULL,
  `salario` double DEFAULT NULL,
  `antiguedad` varchar(25) DEFAULT NULL,
  `teleftrab1` varchar(45) DEFAULT NULL,
  `teleftrab2` varchar(45) DEFAULT NULL,
  `direcciontrab` varchar(150) NOT NULL,
  `cod_user_insert` varchar(45) DEFAULT NULL,
  `cod_user_edit` varchar(45) DEFAULT NULL,
  `fecha_insert` datetime DEFAULT NULL,
  `fecha_edit` datetime DEFAULT NULL,
  `accesocredito` varchar(15) NOT NULL DEFAULT 'Denegado',
  `fecha_edicion_referencia` datetime NOT NULL,
  `sms` varchar(5) DEFAULT 'SI',
  `fechanac` date NOT NULL,
  `obsTrabajo` varchar(450) NOT NULL,
  `nota` varchar(150) DEFAULT NULL,
  `nombremadre` varchar(150) NOT NULL,
  `nombrepadre` varchar(150) NOT NULL,
  `tipohogar` varchar(150) NOT NULL,
  `cod_tipomora` varchar(45) DEFAULT '32',
  `tipo_estado` int(11) NOT NULL,
  `tipo_cliente` varchar(45) DEFAULT '''FIJO''',
  `tipo_persona_equifax` varchar(20) NOT NULL DEFAULT 'SIN_CLASIFICAR',
  `tipo_vivienda` varchar(45) DEFAULT NULL,
  `informacion_extra` text DEFAULT NULL,
  `calificacion_cliente` varchar(45) DEFAULT 'SIN REGISTRO',
  `cod_profesion` int(11) DEFAULT NULL,
  `tipo_empleado` varchar(10) DEFAULT NULL,
  `cargo` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`cod_cliente`, `rut_cliente`, `Calificacion`, `whapp`, `lat`, `lot`, `estado`, `idzonaFk`, `foto1`, `foto2`, `ci_cliente`, `totaldias`, `lugardetrabajo`, `salario`, `antiguedad`, `teleftrab1`, `teleftrab2`, `direcciontrab`, `cod_user_insert`, `cod_user_edit`, `fecha_insert`, `fecha_edit`, `accesocredito`, `fecha_edicion_referencia`, `sms`, `fechanac`, `obsTrabajo`, `nota`, `nombremadre`, `nombrepadre`, `tipohogar`, `cod_tipomora`, `tipo_estado`, `tipo_cliente`, `tipo_persona_equifax`, `tipo_vivienda`, `informacion_extra`, `calificacion_cliente`, `cod_profesion`, `tipo_empleado`, `cargo`) VALUES
(10, 'XXX', '', '', 0, 0, 'Activo', 1, '', '', 'XXXX', NULL, '', 0, '', '', '', '', NULL, '', NULL, '2022-09-22 00:00:00', 'Confirmado', '0000-00-00 00:00:00', 'SI', '0000-00-00', '', NULL, '', '', '', '32', 0, '\'FIJO\'', 'SIN_CLASIFICAR', NULL, NULL, 'SIN REGISTRO', NULL, NULL, NULL);;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes_trabajados`
--

CREATE TABLE `clientes_trabajados` (
  `idclientes_trabajados` int(11) NOT NULL,
  `descripcion` varchar(512) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_venta` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cod_user_insert` int(11) DEFAULT NULL,
  `estado_cliente` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cobrador`
--

CREATE TABLE `cobrador` (
  `cod_cobrador` int(11) NOT NULL,
  `idzona` int(11) NOT NULL,
  `usu` varchar(45) DEFAULT NULL,
  `con` varchar(45) DEFAULT NULL,
  `estado` varchar(15) NOT NULL DEFAULT 'Activo',
  `accesocliente` varchar(15) NOT NULL DEFAULT 'si',
  `accesoproducto` varchar(15) NOT NULL DEFAULT 'si',
  `accesocuentas` varchar(15) NOT NULL DEFAULT 'si',
  `modosinconexion` varchar(15) NOT NULL DEFAULT 'si',
  `realizarcobranzas` varchar(15) NOT NULL DEFAULT 'si',
  `cod_localFK` int(11) NOT NULL,
  `realizarentregas` varchar(15) NOT NULL,
  `url_img` varchar(200) NOT NULL,
  `verificarsolicitudcredito` varchar(45) DEFAULT NULL,
  `accesocrearsoliticudcredito` varchar(45) DEFAULT NULL,
  `accesoagendacliente` varchar(45) DEFAULT NULL,
  `accesocargarfotoscliente` varchar(45) DEFAULT NULL,
  `accesocargarpdfcliente` varchar(45) DEFAULT NULL,
  `accesoegresoingreso` varchar(45) DEFAULT NULL,
  `accesoubicacioncliente` varchar(45) DEFAULT NULL,
  `accesometascobrador` varchar(45) DEFAULT NULL,
  `accesosolicituddescuentocredito` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `cobrador`
--

INSERT INTO `cobrador` (`cod_cobrador`, `idzona`, `usu`, `con`, `estado`, `accesocliente`, `accesoproducto`, `accesocuentas`, `modosinconexion`, `realizarcobranzas`, `cod_localFK`, `realizarentregas`, `url_img`, `verificarsolicitudcredito`, `accesocrearsoliticudcredito`, `accesoagendacliente`, `accesocargarfotoscliente`, `accesocargarpdfcliente`, `accesoegresoingreso`, `accesoubicacioncliente`, `accesometascobrador`, `accesosolicituddescuentocredito`) VALUES
(1, 1, 'walter', '123', 'Activo', 'si', 'si', 'si', 'si', 'si', 1, 'si', '', 'si', 'si', 'si', 'si', 'si', 'si', 'si', 'si', 'si'),
(2, 1, 'Jorge', '123', 'Activo', 'si', 'si', 'si', 'si', 'si', 1, 'si', '', 'si', 'si', 'si', 'si', 'si', 'si', 'si', 'si', 'si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cobradorusuario`
--

CREATE TABLE `cobradorusuario` (
  `idCobradorUsuario` int(11) NOT NULL,
  `cod_usuarioFk` int(11) NOT NULL,
  `cod_cobradorFk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `cobradorusuario`
--

INSERT INTO `cobradorusuario` (`idCobradorUsuario`, `cod_usuarioFk`, `cod_cobradorFk`) VALUES
(1, 2, 2),
(2, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `combo_producto`
--

CREATE TABLE `combo_producto` (
  `idcombo_producto` int(11) NOT NULL,
  `fecha_insert` date DEFAULT NULL,
  `user_insert` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `cod_compra` int(11) NOT NULL,
  `fecha_compra` date NOT NULL,
  `total_compra` double NOT NULL,
  `cod_proveedorFK` int(11) NOT NULL,
  `tipo_comprobante` varchar(20) NOT NULL,
  `num_comprobante` varchar(45) DEFAULT NULL,
  `cod_local` int(11) NOT NULL DEFAULT 1,
  `descuento` int(11) NOT NULL,
  `pagado1` int(11) NOT NULL,
  `pagado2` int(11) NOT NULL,
  `cod_user_insert` varchar(45) DEFAULT NULL,
  `cod_user_edit` varchar(45) DEFAULT NULL,
  `fecha_insert` datetime DEFAULT NULL,
  `fecha_edit` datetime DEFAULT NULL,
  `estado` varchar(15) NOT NULL DEFAULT 'Inactivo',
  `motivoeliminar` varchar(150) NOT NULL,
  `tipo_compra` varchar(45) DEFAULT NULL,
  `timbrado` varchar(45) DEFAULT NULL,
  `tipoFactura` varchar(45) DEFAULT NULL,
  `tipotr` varchar(45) DEFAULT NULL,
  `url` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concepto_cheque`
--

CREATE TABLE `concepto_cheque` (
  `idconcepto_cheque` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concepto_chequeacobrar`
--

CREATE TABLE `concepto_chequeacobrar` (
  `idconcepto_chequeacobrar` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `controlcobrador`
--

CREATE TABLE `controlcobrador` (
  `cod_controlcobrador` int(11) NOT NULL,
  `montoNeto` int(11) NOT NULL,
  `montoTotal` int(11) NOT NULL,
  `fechainicio` date NOT NULL,
  `fechafin` date NOT NULL,
  `cod_zona` int(11) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `cod_cobradorFK` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `cobrado` int(11) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `cod_callcenterFK` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credito`
--

CREATE TABLE `credito` (
  `plazo` varchar(45) NOT NULL,
  `fechapago` date DEFAULT NULL,
  `cod_venta` int(11) NOT NULL,
  `Monto` int(11) DEFAULT NULL,
  `idcredito` int(11) NOT NULL,
  `Esado` varchar(45) DEFAULT NULL,
  `Nro_recibo` varchar(45) DEFAULT NULL,
  `dias` double NOT NULL,
  `interes` double NOT NULL,
  `totalinteres` int(11) NOT NULL,
  `totaldeuda` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `pagado` varchar(45) DEFAULT NULL,
  `tipo` varchar(15) NOT NULL DEFAULT 'CUOTAS',
  `diasatrasados` varchar(45) DEFAULT NULL,
  `deudaInteres` int(11) NOT NULL DEFAULT 0,
  `nroventa` varchar(45) DEFAULT NULL,
  `anulado` varchar(45) DEFAULT NULL,
  `condi` varchar(45) NOT NULL,
  `desde` varchar(45) NOT NULL,
  `cod_tareaFK` int(11) DEFAULT NULL,
  `descuentoInteres` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Estructura de tabla para la tabla `cuentas_funcionario`
--

CREATE TABLE `cuentas_funcionario` (
  `cod_cuentas_funcionario` int(11) NOT NULL,
  `cod_cobr_vend` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `cod_funcionarios` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos_empresa`
--

CREATE TABLE `datos_empresa` (
  `iddatos_empresa` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `ruc` varchar(100) DEFAULT NULL,
  `telefono` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `debaja`
--

CREATE TABLE `debaja` (
  `iddebaja` int(11) NOT NULL,
  `Cantidad` double DEFAULT NULL,
  `Motivo` varchar(150) DEFAULT NULL,
  `Cod_productoFK` varchar(45) NOT NULL,
  `Cod_usuarioFK` int(11) NOT NULL,
  `Fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcionventa`
--

CREATE TABLE `descripcionventa` (
  `cod_descripcionventa` int(11) NOT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `cod_detalleFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_archivo`
--

CREATE TABLE `descripcion_archivo` (
  `iddescripcion_archivo` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_archivo_funcionario`
--

CREATE TABLE `descripcion_archivo_funcionario` (
  `iddescripcion_archivo_funcionario` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_archivo_pedido_proveedor`
--

CREATE TABLE `descripcion_archivo_pedido_proveedor` (
  `iddescripcion_archivo_pedido_proveedor` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_arreglo_gasto`
--

CREATE TABLE `descripcion_arreglo_gasto` (
  `cod_descripcion_arreglo_gasto` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_arreglo_gasto_administrativo`
--

CREATE TABLE `descripcion_arreglo_gasto_administrativo` (
  `cod_descripcion_arreglo_gasto_administrativo` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_arreglo_gasto_juan`
--

CREATE TABLE `descripcion_arreglo_gasto_juan` (
  `cod_descripcion_arreglo_gasto_juan` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_banco_gasto_administrativo`
--

CREATE TABLE `descripcion_banco_gasto_administrativo` (
  `cod_descripcion_banco_gasto_administrativo` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_banco_gasto_juan`
--

CREATE TABLE `descripcion_banco_gasto_juan` (
  `cod_descripcion_banco_gasto_juan` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_carga_archivo`
--

CREATE TABLE `descripcion_carga_archivo` (
  `cod_descripcion_carga_archivo` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_estado_cumple`
--

CREATE TABLE `descripcion_estado_cumple` (
  `cod_descripcion_estado_cumple` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_foto`
--

CREATE TABLE `descripcion_foto` (
  `iddescripcion_foto` int(11) NOT NULL,
  `descripcion` varchar(70) NOT NULL,
  `estado` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_foto_calificacion_entrega`
--

CREATE TABLE `descripcion_foto_calificacion_entrega` (
  `iddescripcion_foto_calificacion_entrega` int(11) NOT NULL,
  `descripcion` varchar(70) NOT NULL,
  `estado` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_local_gasto_administrativo`
--

CREATE TABLE `descripcion_local_gasto_administrativo` (
  `cod_descripcion_local_gasto_administrativo` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_local_gasto_juan`
--

CREATE TABLE `descripcion_local_gasto_juan` (
  `cod_descripcion_local_gasto_juan` int(11) NOT NULL,
  `descripcion` varchar(75) DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_tipo_agenda_personal`
--

CREATE TABLE `descripcion_tipo_agenda_personal` (
  `iddescripcion_tipo_agenda_personal` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_tipo_movimiento`
--

CREATE TABLE `descripcion_tipo_movimiento` (
  `cod_descripcion_tipo_movimiento` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion_ubicacion`
--

CREATE TABLE `descripcion_ubicacion` (
  `iddescripcion_ubicacion` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleentregador_local`
--

CREATE TABLE `detalleentregador_local` (
  `iddetalleentregador_local` int(11) NOT NULL,
  `cod_cobradorFK` int(11) NOT NULL,
  `cod_localFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallescambio`
--

CREATE TABLE `detallescambio` (
  `iddetallescambio` int(11) NOT NULL,
  `cant` double DEFAULT NULL,
  `idcambiarproductoFK` int(11) NOT NULL,
  `cod_productoFK` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesniveles`
--

CREATE TABLE `detallesniveles` (
  `iddetallesniveles` int(11) NOT NULL,
  `accion` varchar(15) DEFAULT NULL,
  `idlistadodeacceso` int(11) NOT NULL,
  `cod_nivelesfk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesolicitud`
--

CREATE TABLE `detallesolicitud` (
  `iddetallesolicitud` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `codProducto` varchar(45) NOT NULL,
  `plan` varchar(45) NOT NULL,
  `idSolicitudCreditoFK` int(11) NOT NULL,
  `cuotas` varchar(45) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `es_provisional` tinyint(1) NOT NULL DEFAULT 0,
  `nombre_producto_provisional` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesprecio`
--

CREATE TABLE `detallesprecio` (
  `iddetallesprecio` int(11) NOT NULL,
  `precio` double DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `cod_producto` varchar(45) NOT NULL,
  `comision` double DEFAULT NULL,
  `Porcentaje` double NOT NULL,
  `Cuota` int(3) NOT NULL,
  `preciocuota` double NOT NULL,
  `codigo` varchar(45) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
--
-- Estructura de tabla para la tabla `detallesventaeliminado`
--

CREATE TABLE `detallesventaeliminado` (
  `iddetallesventaeliminado` int(11) NOT NULL,
  `motivo` varchar(150) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cod_producto` varchar(45) NOT NULL,
  `cod_user_insert` varchar(45) DEFAULT NULL,
  `cod_user_edit` varchar(45) DEFAULT NULL,
  `fecha_insert` datetime DEFAULT NULL,
  `fecha_edit` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_entrega`
--

CREATE TABLE `detalles_entrega` (
  `iddetalles_entrega` int(11) NOT NULL,
  `cod_ventaFK` int(11) NOT NULL,
  `iddocumentosFK` int(11) NOT NULL,
  `cod_cobradorFK` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_entrega_cliente`
--

CREATE TABLE `detalles_entrega_cliente` (
  `iddetalles_entrega_cliente` int(11) NOT NULL,
  `cod_ventaFK` int(11) NOT NULL,
  `iddocumentos_clienteFK` int(11) NOT NULL,
  `cod_cobradorFK` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_informconf`
--

CREATE TABLE `detalles_informconf` (
  `iddetalles_informconf` int(11) NOT NULL,
  `cod_clienteFK` int(11) DEFAULT NULL,
  `cod_ventaFK` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallevendedor`
--

CREATE TABLE `detallevendedor` (
  `iddetallevendedor` int(11) NOT NULL,
  `cod_localFK` int(11) NOT NULL,
  `cod_vendedorFK` int(11) NOT NULL,
  `accion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_admin_local`
--

CREATE TABLE `detalle_admin_local` (
  `iddetalle_admin_local` int(11) NOT NULL,
  `condicion` varchar(45) DEFAULT NULL,
  `idadmin_localFK` int(11) NOT NULL,
  `cod_localFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_callcenter`
--

CREATE TABLE `detalle_callcenter` (
  `iddetalle_callcenter` int(11) NOT NULL,
  `cod_callcenterFK` int(11) DEFAULT NULL,
  `cod_clienteFK` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_callcenterventas`
--

CREATE TABLE `detalle_callcenterventas` (
  `iddetalle_callcenterventas` int(11) NOT NULL,
  `nombre_cliente` varchar(100) DEFAULT NULL,
  `total_venta` int(11) DEFAULT NULL,
  `fecha_venta` date DEFAULT NULL,
  `origen` varchar(150) DEFAULT NULL,
  `telefono` varchar(100) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `idcallcenter_ventasFK` int(11) NOT NULL,
  `agente_cod_usuarioFK` int(11) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `cod_clienteFK` int(11) DEFAULT NULL,
  `cod_ventaFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_cliente_cumple`
--

CREATE TABLE `detalle_cliente_cumple` (
  `iddetalle_cliente_cumple` int(11) NOT NULL,
  `cod_clienteFK` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `observacion` varchar(500) DEFAULT NULL,
  `fecha_insert` date DEFAULT NULL,
  `user_insert` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_combo_producto`
--

CREATE TABLE `detalle_combo_producto` (
  `iddetalle_combo_producto` int(11) NOT NULL,
  `cod_productoFK` int(11) DEFAULT NULL,
  `cod_comboFK` int(11) DEFAULT NULL,
  `precio_descuento` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compra`
--

CREATE TABLE `detalle_compra` (
  `cod_detalle_compra` int(11) NOT NULL,
  `cantidad_detalle_compra` double NOT NULL,
  `cod_productoFK` varchar(45) NOT NULL,
  `precio_producto` bigint(20) NOT NULL,
  `precio_compra` int(11) DEFAULT NULL,
  `cod_compraFK` int(11) NOT NULL,
  `subTotal` double NOT NULL,
  `cantidadCompra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_descuento`
--

CREATE TABLE `detalle_descuento` (
  `iddetalle_descuento` int(11) NOT NULL,
  `dias` varchar(45) NOT NULL,
  `porcentaje` double NOT NULL,
  `estado` varchar(45) NOT NULL,
  `cod_descuentos_fechaFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_listado_precio`
--

CREATE TABLE `detalle_listado_precio` (
  `cod_detalle_listado_precio` int(11) NOT NULL,
  `cuota` int(11) DEFAULT NULL,
  `descuento` decimal(10,0) DEFAULT NULL,
  `porcentaje` decimal(10,0) DEFAULT NULL,
  `cod_lista_precio_productoFK` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_listado_precio_producto`
--

CREATE TABLE `detalle_listado_precio_producto` (
  `cod_detalle_listado_precio_producto` int(11) NOT NULL,
  `precio` double DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `comision` double DEFAULT NULL,
  `Porcentaje` double DEFAULT NULL,
  `Cuota` int(11) DEFAULT NULL,
  `preciocuota` double DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_detalle_listado_precioFK` int(11) DEFAULT NULL,
  `cod_producto` varchar(45) DEFAULT NULL,
  `cod_lista_precio_productoFK` int(11) DEFAULT NULL,
  `descuento` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pago_cheque`
--

CREATE TABLE `detalle_pago_cheque` (
  `iddetalle_pago_cheque` int(11) NOT NULL,
  `idchequeFK` int(11) NOT NULL,
  `cod_compraFK` int(11) NOT NULL,
  `cod_proveedorFK` int(11) NOT NULL,
  `idpago_total_compraFK` int(11) NOT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pago_compra`
--

CREATE TABLE `detalle_pago_compra` (
  `iddetalle_pago_compra` int(11) NOT NULL,
  `id_pago_total_compra` int(11) DEFAULT NULL,
  `cod_compraFK` int(11) DEFAULT NULL,
  `monto` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_tarea_cobrador`
--

CREATE TABLE `detalle_tarea_cobrador` (
  `cod_detalle_tarea_cobrador` int(11) NOT NULL,
  `cod_controlcobradorFK` int(11) NOT NULL,
  `cod_creditoFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_vehiculo`
--

CREATE TABLE `detalle_vehiculo` (
  `iddetalle_vehiculo` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `nro_inicio` int(11) DEFAULT NULL,
  `nro_fin` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_vehiculoFK` int(11) NOT NULL,
  `cod_tipo_detalle_vehiculoFK` int(11) NOT NULL,
  `cod_encargadoFK` varchar(45) DEFAULT NULL,
  `estado_redistro` varchar(45) DEFAULT NULL,
  `observacion` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_vendedor_usuario`
--

CREATE TABLE `detalle_vendedor_usuario` (
  `iddetalle_vendedor_usuario` int(11) NOT NULL,
  `cod_usuarioFK` int(11) DEFAULT NULL,
  `cod_vendedorFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `cod_detalle` int(11) NOT NULL,
  `cantidad_detalle` double NOT NULL,
  `cod_productoFK` varchar(45) NOT NULL,
  `precio_producto` bigint(20) NOT NULL,
  `cod_ventaFK` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `subPrecioCompra` bigint(20) NOT NULL,
  `estado` varchar(45) DEFAULT 'Entregado',
  `comision` double DEFAULT NULL,
  `detalleproducto` varchar(150) NOT NULL,
  `descuento` int(11) DEFAULT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `nroventa` varchar(45) NOT NULL,
  `comprobante` varchar(45) NOT NULL,
  `fecha` int(45) NOT NULL,
  `cod` varchar(45) NOT NULL,
  `tipo_combo` varchar(45) DEFAULT NULL,
  `idcombo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
--
-- Estructura de tabla para la tabla `dispositivos`
--

CREATE TABLE `dispositivos` (
  `iddispositivos` int(11) NOT NULL,
  `codigo` varchar(150) DEFAULT NULL,
  `codigo_so` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `dispositivos`
--

INSERT INTO `dispositivos` (`iddispositivos`, `codigo`, `codigo_so`) VALUES
(1, 'aLnQAsoLIgLGOWlTez7I', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `iddocumentos` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos_cliente`
--

CREATE TABLE `documentos_cliente` (
  `iddocumentos_cliente` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entregacobrador`
--

CREATE TABLE `entregacobrador` (
  `cod_EntregaCobrador` int(11) NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Monto` int(11) DEFAULT NULL,
  `Estado` varchar(45) DEFAULT NULL,
  `cod_usuarioFK` int(11) NOT NULL,
  `cod_cobradorFK` int(11) NOT NULL,
  `cod_localFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especificaciones`
--

CREATE TABLE `especificaciones` (
  `id` int(11) NOT NULL,
  `caracteristica` text NOT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `cod_productoFK` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_clientes_trabajados`
--

CREATE TABLE `estados_clientes_trabajados` (
  `idestados_clientes_trabajados` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_cliente_callcenter`
--

CREATE TABLE `estados_cliente_callcenter` (
  `idestados_cliente_callcenter` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_cliente_callcenter_venta`
--

CREATE TABLE `estados_cliente_callcenter_venta` (
  `idestados_cliente_callcenter_venta` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_diferencia`
--

CREATE TABLE `estado_diferencia` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `diferencia` decimal(15,2) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `local` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos_calificacion_entrega`
--

CREATE TABLE `fotos_calificacion_entrega` (
  `idfotos_calificacion_entrega` int(11) NOT NULL,
  `url` varchar(300) DEFAULT NULL,
  `idSolicitudCreditoFK` varchar(45) DEFAULT NULL,
  `user_insert` varchar(45) DEFAULT NULL,
  `fecha_insert` date DEFAULT NULL,
  `descripcion` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos_calificacion_entrega_contado`
--

CREATE TABLE `fotos_calificacion_entrega_contado` (
  `idfotos_calificacion_entrega_contado` int(11) NOT NULL,
  `url` varchar(300) DEFAULT NULL,
  `cod_ventaFK` varchar(45) DEFAULT NULL,
  `user_insert` varchar(45) DEFAULT NULL,
  `fecha_insert` date DEFAULT NULL,
  `descripcion` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos_cliente`
--

CREATE TABLE `fotos_cliente` (
  `idfotos_cliente` int(11) NOT NULL,
  `url` varchar(150) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `cod_clienteFK` int(11) NOT NULL,
  `iddescripcion_fotoFK` int(11) NOT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `lot` varchar(100) DEFAULT NULL,
  `cod_cobradorFK` int(11) DEFAULT NULL,
  `calificacion` varchar(45) DEFAULT NULL,
  `cod_solicitud_creditoFK` varchar(45) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionarios`
--

CREATE TABLE `funcionarios` (
  `idfuncionarios` int(11) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `fechaingreso` date DEFAULT NULL,
  `tipo_contrato` varchar(45) DEFAULT NULL,
  `sueldo_base` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_cargosFK` int(11) NOT NULL,
  `nombre` varchar(75) DEFAULT NULL,
  `apellido` varchar(75) DEFAULT NULL,
  `ci_funcionario` varchar(45) DEFAULT NULL,
  `url` varchar(150) DEFAULT NULL,
  `cod_localFK` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `garantia`
--

CREATE TABLE `garantia` (
  `Cod_Garantia` int(11) NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Motivo` varchar(150) DEFAULT NULL,
  `cod_detalleFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `garantias`
--

CREATE TABLE `garantias` (
  `idgarantia` int(11) NOT NULL,
  `fecharecibido` date DEFAULT NULL,
  `fechaenvio` date DEFAULT NULL,
  `fechaentrega` date DEFAULT NULL,
  `fechadevuelto` date DEFAULT NULL,
  `observacion` varchar(150) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_detalle_venta_fk` varchar(45) DEFAULT NULL,
  `cod_productoFK` varchar(45) NOT NULL,
  `cod_ventaFK` int(11) NOT NULL,
  `cod_usuarioFKRecibido` int(11) NOT NULL,
  `cod_usuarioFkEnvio` varchar(45) DEFAULT NULL,
  `cod_usuarioFkDevuelto` varchar(45) DEFAULT NULL,
  `cod_usuarioFkEntrega` varchar(45) DEFAULT NULL,
  `telefonoaviso` varchar(45) DEFAULT NULL,
  `cod_usuarioFKAnula` int(11) DEFAULT NULL,
  `fecha_anulado` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `garantias_producto`
--

CREATE TABLE `garantias_producto` (
  `idgarantiaproducto` int(11) NOT NULL,
  `fecharecibido` date DEFAULT NULL,
  `fechaenvio` date DEFAULT NULL,
  `fechaentrega` date DEFAULT NULL,
  `fechadevuelto` date DEFAULT NULL,
  `observacion` varchar(150) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_productoFK` varchar(45) NOT NULL,
  `cod_usuarioFKRecibido` int(11) NOT NULL,
  `cod_usuarioFkEnvio` varchar(45) DEFAULT NULL,
  `cod_usuarioFkDevuelto` varchar(45) DEFAULT NULL,
  `cod_usuarioFkEntrega` varchar(45) DEFAULT NULL,
  `cod_ventaFK` int(11) DEFAULT NULL,
  `cod_detalle_venta_fk` int(11) DEFAULT NULL,
  `telefonoaviso` varchar(45) DEFAULT NULL,
  `cod_localFK` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `cod_usuarioFKAnula` int(11) DEFAULT NULL,
  `fecha_anulado` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `idgastos` int(11) NOT NULL,
  `monto` double DEFAULT NULL,
  `motivo` varchar(150) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_usuario` int(11) NOT NULL,
  `personales` varchar(75) NOT NULL,
  `cod_local` int(11) NOT NULL DEFAULT 1,
  `tipo` varchar(45) DEFAULT NULL,
  `codCaja` varchar(45) NOT NULL,
  `codApertura` varchar(45) NOT NULL,
  `nrocuenta` varchar(45) DEFAULT NULL,
  `banco` varchar(75) DEFAULT NULL,
  `nroboleta` varchar(45) DEFAULT NULL,
  `arreglo` varchar(45) DEFAULT 'INTERNO',
  `cod_motivo` int(11) DEFAULT NULL,
  `confirmado` varchar(10) NOT NULL DEFAULT 'NO',
  `url` varchar(150) NOT NULL,
  `fechaDeposito` date DEFAULT NULL,
  `confirmadoArreglo` varchar(45) DEFAULT 'SI',
  `cod_categoriaGastoFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos_administrativo`
--

CREATE TABLE `gastos_administrativo` (
  `idgastos_administrativo` int(11) NOT NULL,
  `monto` double DEFAULT NULL,
  `motivo` varchar(150) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_usuario` int(11) NOT NULL,
  `personales` varchar(75) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `nrocuenta` varchar(45) DEFAULT NULL,
  `banco` varchar(75) DEFAULT NULL,
  `nroboleta` varchar(45) DEFAULT NULL,
  `arreglo` varchar(45) DEFAULT 'INTERNO',
  `cod_motivo_administrativo` int(11) DEFAULT NULL,
  `confirmado` varchar(10) NOT NULL DEFAULT 'NO',
  `url` varchar(150) NOT NULL,
  `fechaDeposito` date DEFAULT NULL,
  `confirmadoArreglo` varchar(45) DEFAULT 'SI',
  `cod_descripcion_local_gasto_administrativoFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos_cobrador`
--

CREATE TABLE `gastos_cobrador` (
  `idgastos_cobrador` int(11) NOT NULL,
  `monto` double DEFAULT NULL,
  `motivo` varchar(150) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `personales` varchar(75) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `codCaja` varchar(45) NOT NULL,
  `codApertura` varchar(45) NOT NULL,
  `nrocuenta` varchar(45) DEFAULT NULL,
  `banco` varchar(75) DEFAULT NULL,
  `nroboleta` varchar(45) DEFAULT NULL,
  `arreglo` varchar(45) DEFAULT 'INTERNO',
  `cod_motivo` int(11) DEFAULT NULL,
  `cod_cobradorFK` int(11) NOT NULL,
  `user_editadopor` int(11) DEFAULT NULL,
  `confirmado` varchar(45) DEFAULT 'NO',
  `url` varchar(150) DEFAULT NULL,
  `observacion` varchar(200) DEFAULT NULL,
  `confirmadoArreglo` varchar(45) DEFAULT 'SI'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos_fijos_empresa`
--

CREATE TABLE `gastos_fijos_empresa` (
  `idgasto_fijo_empresa` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `categoria` varchar(80) NOT NULL,
  `monto` decimal(18,2) NOT NULL DEFAULT 0.00,
  `frecuencia` varchar(30) NOT NULL,
  `dia_vencimiento` int(11) NOT NULL DEFAULT 1,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'Activo',
  `genera_cuenta_pagar` varchar(2) NOT NULL DEFAULT 'NO',
  `observacion` text DEFAULT NULL,
  `user_insert` varchar(45) DEFAULT NULL,
  `fecha_insert` datetime DEFAULT NULL,
  `user_edit` varchar(45) DEFAULT NULL,
  `fecha_edit` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos_juan`
--

CREATE TABLE `gastos_juan` (
  `idgastos_juan` int(11) NOT NULL,
  `monto` double DEFAULT NULL,
  `motivo` varchar(150) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_usuario` int(11) NOT NULL,
  `personales` varchar(75) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `nrocuenta` varchar(45) DEFAULT NULL,
  `banco` varchar(75) DEFAULT NULL,
  `nroboleta` varchar(45) DEFAULT NULL,
  `arreglo` varchar(45) DEFAULT 'INTERNO',
  `cod_motivo_juan` int(11) DEFAULT NULL,
  `confirmado` varchar(10) NOT NULL DEFAULT 'NO',
  `url` varchar(150) NOT NULL,
  `fechaDeposito` date DEFAULT NULL,
  `confirmadoArreglo` varchar(45) DEFAULT 'SI',
  `cod_descripcion_local_gasto_juanFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialactualizacion`
--

CREATE TABLE `historialactualizacion` (
  `idhistorialactualizacion` int(11) NOT NULL,
  `codigo` varchar(150) DEFAULT NULL,
  `detalles` varchar(250) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `historialactualizacion`
--

INSERT INTO `historialactualizacion` (`idhistorialactualizacion`, `codigo`, `detalles`, `fecha`, `estado`) VALUES
(2, 'X-GT-1-JMTG-V5.10', 'ACTUALIZACION DE Clientes morosos', '2022-06-22 04:00:00', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialactualizacionmobile`
--

CREATE TABLE `historialactualizacionmobile` (
  `idhistorialactualizacionmobile` int(11) NOT NULL,
  `codigo` varchar(150) DEFAULT NULL,
  `detalles` varchar(250) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `historialactualizacionmobile`
--

INSERT INTO `historialactualizacionmobile` (`idhistorialactualizacionmobile`, `codigo`, `detalles`, `fecha`, `estado`) VALUES
(4, 'X-GT-1-JMTG-MOBILE-V1.15', 'X-GT-1-JMTG-MOBILE-V1.15', '2025-03-28 19:24:38', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialdescargabd`
--

CREATE TABLE `historialdescargabd` (
  `idhistorialdescargabd` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `cod_usuario` int(11) DEFAULT NULL,
  `cod_local` int(11) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialdespacho`
--

CREATE TABLE `historialdespacho` (
  `idhistorialdespacho` int(11) NOT NULL,
  `stock` double DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cod_local_de` varchar(45) DEFAULT NULL,
  `cod_local_a` varchar(45) DEFAULT NULL,
  `cod_producto_fk` varchar(45) NOT NULL,
  `cod_usuario_fk` int(11) NOT NULL,
  `cod_ext` varchar(45) NOT NULL,
  `estado` varchar(15) NOT NULL DEFAULT 'Activo',
  `cod_anulado_por` varchar(45) NOT NULL,
  `fecha_anulacion` date NOT NULL,
  `FechaInser` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado_solicitud` varchar(45) DEFAULT NULL,
  `aceptado_por_userFK` int(11) DEFAULT NULL,
  `fecha_aceptado` date DEFAULT NULL,
  `stock_ant` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialsalidadeposito`
--

CREATE TABLE `historialsalidadeposito` (
  `idhistorialsalidadeposito` int(11) NOT NULL,
  `stock` double DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cod_local_deposito` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_anulado_por` varchar(45) DEFAULT NULL,
  `fecha_anulacion` datetime DEFAULT NULL,
  `cod_usuario_fk` int(11) NOT NULL,
  `cod_producto_fk` varchar(45) NOT NULL,
  `cod_ext` varchar(45) DEFAULT NULL,
  `stock_ant` int(11) DEFAULT NULL,
  `estado_stock` varchar(45) DEFAULT NULL,
  `idlista_controldepositoFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imprimir`
--

CREATE TABLE `imprimir` (
  `cod_imprimir` int(11) NOT NULL,
  `codigo` int(11) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `caja` varchar(45) DEFAULT NULL,
  `local` varchar(45) DEFAULT NULL,
  `diasa` varchar(45) DEFAULT NULL,
  `subtotal` varchar(45) DEFAULT NULL,
  `descuento` varchar(45) DEFAULT NULL,
  `totalpagado` varchar(45) DEFAULT NULL,
  `interespagado` varchar(45) DEFAULT NULL,
  `totalInteres` varchar(45) DEFAULT NULL,
  `saldointeres` varchar(45) DEFAULT NULL,
  `saldo` varchar(45) DEFAULT NULL,
  `NroCuotas` varchar(45) DEFAULT NULL,
  `cod_usuarioFK` int(11) DEFAULT NULL,
  `montopagado` varchar(45) DEFAULT NULL,
  `nrorecibopago` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `impuesto`
--

CREATE TABLE `impuesto` (
  `cod_Impuesto` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `monto_impuesto` double DEFAULT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `impuesto`
--

INSERT INTO `impuesto` (`cod_Impuesto`, `descripcion`, `monto_impuesto`, `Estado`) VALUES
(1, 'EXCENTAS', 1, 'Activo'),
(2, 'GRAVADAS 5%', 21, 'Activo'),
(3, 'GRAVADAS 10%', 11, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informconf`
--

CREATE TABLE `informconf` (
  `idinformconf` int(11) NOT NULL,
  `cod_clienteFK` int(11) DEFAULT NULL,
  `cod_ventaFK` int(11) DEFAULT NULL,
  `fecha_entrada` date DEFAULT NULL,
  `fecha_salida` date DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'ACTIVO',
  `user_insert` int(11) DEFAULT NULL,
  `user_update` int(11) DEFAULT NULL,
  `cod_usuarioFK` int(11) DEFAULT NULL,
  `Observacion` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `interesespagados`
--

CREATE TABLE `interesespagados` (
  `idinteresespagados` int(11) NOT NULL,
  `monto` int(11) DEFAULT NULL,
  `idcredito` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kilometraje`
--

CREATE TABLE `kilometraje` (
  `idkilometraje` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `nro` int(11) DEFAULT NULL,
  `cod_encargadoFK` varchar(45) DEFAULT NULL,
  `cod_vehiculoFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `liquidez`
--

CREATE TABLE `liquidez` (
  `idliquidez` int(11) NOT NULL,
  `monto` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `idbanco_liquidezFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listado`
--

CREATE TABLE `listado` (
  `idlistado` int(11) NOT NULL,
  `cant` double NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cod_producto` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cod_cobrador` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cantvendido` double NOT NULL,
  `visible` varchar(4) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'SI'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listadodeacceso`
--

CREATE TABLE `listadodeacceso` (
  `idlistadodeacceso` int(11) NOT NULL,
  `nro` double DEFAULT NULL,
  `formulario` varchar(75) DEFAULT NULL,
  `codigo` varchar(75) DEFAULT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `accion` varchar(45) DEFAULT NULL,
  `orden` varchar(15) DEFAULT NULL,
  `tipo` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `listadodeacceso`
--

INSERT INTO `listadodeacceso` (`idlistadodeacceso`, `nro`, `formulario`, `codigo`, `nombre`, `accion`, `orden`, `tipo`) VALUES
(3, 1, 'FORMULARIO USUARIO', 'VERLISTADOUSUARIO', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(4, 1, 'FORMULARIO USUARIO', 'BUSCARLISTADOUSUARIO', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(5, 1, 'FORMULARIO USUARIO', 'INSERTARLISTADOUSUARIO', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(6, 1, 'FORMULARIO USUARIO', 'EDITARLISTADOUSUARIO', 'EDITAR', 'NO', NULL, 'Administrativo'),
(7, 1, 'FORMULARIO USUARIO', 'VERACCESOSUARIOS', 'EDITAR ACCESOS DE USUARIOS', 'NO', NULL, 'Administrativo'),
(8, 2, 'FORMULARIO ACCESOS Y NIVELES', 'VERLISTADODEACCESO', 'EDITAR LISTADO DE ACCESOS', 'NO', NULL, 'Administrativo'),
(9, 2, 'FORMULARIO ACCESOS Y NIVELES', 'VERLISTADODENIVELES', 'EDITAR LISTADO DE NIVELES', 'NO', NULL, 'Administrativo'),
(10, 3, 'FORMULARIO SOLICITUD', 'VERINFORMESOLICITUD', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(11, 3, 'FORMULARIO SOLICITUD', 'BUSCARINFORMESOLICITUD', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(12, 3, 'FORMULARIO SOLICITUD', 'INSERTARINFORMESOLICITUD', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(13, 3, 'FORMULARIO SOLICITUD', 'EDITARINFORMESOLICITUD', 'EDITAR', 'NO', NULL, 'Administrativo'),
(14, 4, 'FORMULARIO PRODUCTOS EN GARANTIA', 'VERINFORMEGARANTIA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(15, 4, 'FORMULARIO PRODUCTOS EN GARANTIA', 'BUSCARINFORMEGARANTIA', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(16, 4, 'FORMULARIO PRODUCTOS EN GARANTIA', 'INSERTARINFORMEGARANTIA', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(17, 4, 'FORMULARIO PRODUCTOS EN GARANTIA', 'EDITARINFORMEGARANTIA', 'EDITAR', 'NO', NULL, 'Administrativo'),
(18, 5, 'FORMULARIO LISTADO DE FACTURAS HABILITADAS', 'VERFACTURASHABILITADAS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(19, 5, 'FORMULARIO LISTADO DE FACTURAS HABILITADAS', 'BUSCARFACTURASHABILITADAS', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(20, 5, 'FORMULARIO LISTADO DE FACTURAS HABILITADAS', 'INSERTARFACTURASHABILITADAS', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(21, 6, 'FORMULARIO PRODUCTOS DE BAJA', 'VERINFORMEPRODUCTOSDEBAJA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(22, 7, 'FORMULARIO LISTADO DE CAJA', 'VERLISTADODECAJA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(23, 7, 'FORMULARIO LISTADO DE CAJA', 'BUSCARLISTADODECAJA', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(24, 7, 'FORMULARIO LISTADO DE CAJA', 'INSERTARLISTADODECAJA', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(25, 7, 'FORMULARIO LISTADO DE CAJA', 'EDITARLISTADODECAJA', 'EDITAR', 'NO', NULL, 'Administrativo'),
(26, 8, 'FORMULARIO LISTADO DE VENDEDORES', 'VERLISTADOVENDEDORES', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(27, 8, 'FORMULARIO LISTADO DE VENDEDORES', 'BUSCARLISTADOVENDEDORES', 'BUSCAR', 'SI', NULL, 'Administrativo'),
(28, 8, 'FORMULARIO LISTADO DE VENDEDORES', 'INSERTARLISTADOVENDEDORES', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(29, 8, 'FORMULARIO LISTADO DE VENDEDORES', 'EDITARLISTADOVENDEDORES', 'EDITAR', 'NO', NULL, 'Administrativo'),
(30, 9, 'FORMULARIO LISTADO DE PROVEEDORES', 'VERLISTADOPROVEEDORES', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(31, 9, 'FORMULARIO LISTADO DE PROVEEDORES', 'BUSCARLISTADOPROVEEDORES', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(32, 9, 'FORMULARIO LISTADO DE PROVEEDORES', 'INSERTARLISTADOPROVEEDORES', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(33, 9, 'FORMULARIO LISTADO DE PROVEEDORES', 'EDITARLISTADOPROVEEDORES', 'EDITAR', 'NO', NULL, 'Administrativo'),
(34, 10, 'FORMULARIO LISTADO DE PRODUCTOS', 'VERLISTADOPRODUCTOS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(35, 10, 'FORMULARIO LISTADO DE PRODUCTOS', 'BUSCARLISTADOPRODUCTOS', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(36, 10, 'FORMULARIO LISTADO DE PRODUCTOS', 'INSERTARLISTADOPRODUCTOS', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(37, 10, 'FORMULARIO LISTADO DE PRODUCTOS', 'EDITARLISTADOPRODUCTOS', 'EDITAR', 'NO', NULL, 'Administrativo'),
(38, 10, 'FORMULARIO LISTADO DE PRODUCTOS', 'EDITARPRECIOSLISTADOPRODUCTOS', 'EDITAR PRECIOS', 'NO', NULL, 'Administrativo'),
(39, 11, 'FORMULARIO LISTADO DE CLIENTES', 'VERLISTADODECLIENTES', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(40, 11, 'FORMULARIO LISTADO DE CLIENTES', 'BUSCARLISTADODECLIENTES', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(41, 11, 'FORMULARIO LISTADO DE CLIENTES', 'INSERTARLISTADODECLIENTES', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(42, 11, 'FORMULARIO LISTADO DE CLIENTES', 'EDITARLISTADODECLIENTES', 'EDITAR', 'NO', NULL, 'Administrativo'),
(43, 12, 'FORMULARIO LISTADO DE COBRADORES', 'VERLISTADOCOBRADORES', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(44, 12, 'FORMULARIO LISTADO DE COBRADORES', 'BUSCARLISTADOCOBRADORES', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(45, 12, 'FORMULARIO LISTADO DE COBRADORES', 'INSERTARLISTADOCOBRADORES', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(46, 12, 'FORMULARIO LISTADO DE COBRADORES', 'EDITARLISTADOCOBRADORES', 'EDITAR', 'NO', NULL, 'Administrativo'),
(47, 13, 'FORMULARIO LISTADO DE ZONAS', 'VERLISTADODEZONAS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(48, 13, 'FORMULARIO LISTADO DE ZONAS', 'BUSCARLISTADODEZONAS', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(49, 13, 'FORMULARIO LISTADO DE ZONAS', 'INSERTARLISTADODEZONAS', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(50, 13, 'FORMULARIO LISTADO DE ZONAS', 'EDITARLISTADODEZONAS', 'EDITAR', 'NO', NULL, 'Administrativo'),
(51, 14, 'FORMULARIO LISTADO DE LOCALES', 'VERLISTADODELOCALES', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(52, 14, 'FORMULARIO LISTADO DE LOCALES', 'BUSCARLISTADODELOCALES', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(53, 14, 'FORMULARIO LISTADO DE LOCALES', 'INSERTARLISTADODELOCALES', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(54, 14, 'FORMULARIO LISTADO DE LOCALES', 'EDITARLISTADODELOCALES', 'EDITAR', 'NO', NULL, 'Administrativo'),
(55, 15, 'FORMULARIO DE INFORMES', 'VERINFORMECODIGOBARRA', 'VER IMPRIMIR PRECIOS', 'NO', NULL, 'Administrativo'),
(56, 15, 'FORMULARIO DE INFORMES', 'VERINFORMECAMBIOS', 'VER ICONO INFORME DE CAMBIOS', 'NO', NULL, 'Administrativo'),
(57, 15, 'FORMULARIO DE INFORMES', 'VERINFORMECUENTAGENERAL', 'VER ICONO INFORME DE CUENTAS GENERAL', 'NO', NULL, 'Administrativo'),
(58, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEEVALUACION', 'VER ICONO INFORME DE EVALUACION', 'NO', NULL, 'Administrativo'),
(59, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEDEINVENTARIO', 'VER ICONO INFORME DE INVENTARIO', 'NO', NULL, 'Administrativo'),
(60, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEDEGANANCIAPORVENTA', 'VER ICONO INFORME DE GANANCIA POR VENTA', 'NO', NULL, 'Administrativo'),
(61, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEDEPRODUCTOSCOMPRADOS', 'VER ICONO INFORME DE PRODUCTOS COMPRADOS', 'NO', NULL, 'Administrativo'),
(62, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEDEPRODUCTOSVENDIDOS', 'VER ICONO INFORME DE PRODUCTOS VENDIDOS', 'NO', NULL, 'Administrativo'),
(63, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEDEVENTASCANCELADAS', 'VER ICONO INFORME DE VENTAS CANCELADAS', 'NO', NULL, 'Administrativo'),
(64, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEDECOMISIONCOBRADOR', 'VER ICONO INFORME DE COMISION COBRADOR', 'NO', NULL, 'Administrativo'),
(65, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEDECOMISIONVENDEDOR', 'VER ICONO INFORME DE COMISION VENDEDOR', 'NO', NULL, 'Administrativo'),
(66, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEDEPAGOSELIMINADOS', 'VER ICONO INFORME DE PAGOS ELIMINADOS', 'NO', NULL, 'Administrativo'),
(67, 16, 'FORMULARIO DE EGRESO / INGRESO', 'VERLISTADOEGRESOINGRESO', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(68, 16, 'FORMULARIO DE EGRESO / INGRESO', 'BUSCARLISTADOEGRESOINGRESO', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(69, 16, 'FORMULARIO DE EGRESO / INGRESO', 'INSERTARLISTADOEGRESOINGRESO', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(70, 16, 'FORMULARIO DE EGRESO / INGRESO', 'EDITARLISTADOEGRESOINGRESO', 'EDITAR', 'NO', NULL, 'Administrativo'),
(71, 17, 'FORMULARIO DE EXPEDIENTE DEL CLIENTE', 'VEREXPEDIENTEDELCLIENTE', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(72, 18, 'FORMULARIO CONSULTAR CAJAS', 'VERCONSULTADECAJA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(73, 19, 'FORMULARIO CUENTAS A PAGAR', 'VERCUENTASAPAGAR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(74, 20, 'FORMULARIO CUENTAS A COBRAR', 'VERCUENTASACOBRAR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(75, 21, 'FORMULARIO COBROS REALIZADOS', 'VERCOBROSREALIZADOS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(76, 22, 'FORMULARIO CLIENTES INACTIVOS', 'VERCLIENTESINACTIVOS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(77, 23, 'FORMULARIO  CARGAR SUELDO', 'VERCARGARSUELDO', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(78, 23, 'FORMULARIO  CARGAR SUELDO', 'BUSCARCARGARSUELDO', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(79, 23, 'FORMULARIO  CARGAR SUELDO', 'INSERTARCARGARSUELDO', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(80, 23, 'FORMULARIO  CARGAR SUELDO', 'EDITARCARGARSUELDO', 'EDITAR', 'NO', NULL, 'Administrativo'),
(81, 24, 'FORMULARIO  CATALOGO', 'VERCATALOGO', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(82, 25, 'FORMULARIO  COMPRAS', 'VERCARGADECOMPRAS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(83, 25, 'FORMULARIO  COMPRAS', 'INSERTARCARGADECOMPRAS', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(84, 25, 'FORMULARIO  COMPRAS', 'EDITARCARGADECOMPRAS', 'EDITAR DETALLES', 'NO', NULL, 'Administrativo'),
(85, 25, 'FORMULARIO  COMPRAS', 'CARGARPAGOS', 'CARGAR PAGOS', 'NO', NULL, 'Administrativo'),
(86, 25, 'FORMULARIO  COMPRAS', 'EDITARPAGOS', 'EDITAR PAGOS', 'NO', NULL, 'Administrativo'),
(87, 25, 'FORMULARIO  COMPRAS', 'ELIMINARPAGOS', 'ELIMINAR PAGOS', 'NO', NULL, 'Administrativo'),
(88, 26, 'FORMULARIO  APERTURA CIERRE DE CAJA', 'VERCERRARCAJA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(89, 26, 'FORMULARIO  APERTURA CIERRE DE CAJA', 'ABRIRCERRARCAJA', 'ABRIR CAJA', 'NO', NULL, 'Administrativo'),
(90, 26, 'FORMULARIO  APERTURA CIERRE DE CAJA', 'CERRARCERRARCAJA', 'CERRAR CAJA', 'NO', NULL, 'Administrativo'),
(91, 27, 'FORMULARIO  VENTAS', 'VERVENTA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(92, 27, 'FORMULARIO  VENTAS', 'INSERTARVENTA', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(93, 27, 'FORMULARIO  VENTAS', 'INSERTARDETALLEVENTA', 'INSERTAR DETALLE VENTA', 'NO', NULL, 'Administrativo'),
(94, 27, 'FORMULARIO  VENTAS', 'ELIMINARDETALLEVENTA', 'ELIMINAR DETALLE VENTA', 'NO', NULL, 'Administrativo'),
(95, 27, 'FORMULARIO  VENTAS', 'ELIMINARVENTA', 'ELIMINAR VENTA', 'NO', NULL, 'Administrativo'),
(96, 27, 'FORMULARIO  VENTAS', 'ANULARVENTAS', 'ANULAR VENTA', 'NO', NULL, 'Administrativo'),
(97, 27, 'FORMULARIO  VENTAS', 'INSERTARPAGOSCONTADOVENTA', 'INSERTAR PAGO CONTADO', 'NO', NULL, 'Administrativo'),
(98, 27, 'FORMULARIO  VENTAS', 'INSERTARPAGOSCREDITO', 'INSERTAR PAGO CREDITO', 'NO', NULL, 'Administrativo'),
(99, 27, 'FORMULARIO  VENTAS', 'VERPAGOSCREDITO', 'VER CREDITO', 'NO', NULL, 'Administrativo'),
(100, 27, 'FORMULARIO  VENTAS', 'EDITARCREDITO', 'EDITAR CREDITO', 'NO', NULL, 'Administrativo'),
(101, 27, 'FORMULARIO  VENTAS', 'ELIMINARPAGOCREDITO', 'ELIMINAR PAGOS DE CREDITO', 'NO', NULL, 'Administrativo'),
(102, 27, 'FORMULARIO  VENTAS', 'VERHISTORIALVENTA', 'VER HISTORIAL VENTA', 'NO', NULL, 'Administrativo'),
(103, 25, 'FORMULARIO  COMPRAS', 'VERHISTORIALCOMPRA', 'VER HISTORIAL COMPRA', 'NO', NULL, 'Administrativo'),
(104, 27, 'FORMULARIO  VENTAS', 'CAMBIARCAJA', 'CAMBIAR CAJA', 'NO', NULL, 'Administrativo'),
(105, 14, 'FORMULARIO LISTADO DE LOCALES', 'CAMBIARLOCAL', 'VER DATOS DE OTROS LOCALES', 'NO', NULL, 'Administrativo'),
(107, 26, 'FORMULARIO  APERTURA CIERRE DE CAJA', 'CAMBIARMONTOAPERTURA', 'EDITAR MONTO APERTURA', 'NO', NULL, 'Administrativo'),
(109, 27, 'FORMULARIO  VENTAS', 'REFINANCIARVENTA', 'REFINANCIAR VENTA', 'SI', NULL, 'Administrativo'),
(110, 15, 'FORMULARIO DE INFORMES', 'VERDESPACHADOS', 'VER ICONO INFORME DESPACHADO', 'NO', NULL, 'Administrativo'),
(111, 25, 'FORMULARIO  COMPRAS', 'ELIMINARCOMPRA', 'ELIMINAR COMPRA', 'NO', NULL, 'Administrativo'),
(112, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEDECOMPRASELIMINADO', 'VER ICONO INFORME COMPRAS ELIMINADOS', 'NO', NULL, 'Administrativo'),
(113, 27, 'FORMULARIO  VENTAS', 'STOCK0', 'VENDER CON STOCK MENOR A 0', 'NO', NULL, 'Administrativo'),
(115, 10, 'FORMULARIO LISTADO DE PRODUCTOS', 'HACERDESPACHO', 'CARGAR DESPACHO', 'SI', NULL, 'Administrativo'),
(116, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEDEMETAS', 'VER ICONO INFORME DE METAS', 'SI', NULL, 'Administrativo'),
(117, 28, 'CONTROL DEPOSITO', 'VERCONTROLDEPOSITO', 'VER ICONO DEPOSITO', 'NO', NULL, 'Administrativo'),
(118, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEMOROSO', 'VER INFORME MOROSO', 'SI', NULL, 'Administrativo'),
(119, 20, 'APLICAR DESCUENTO', 'VERAPLICARDESCUENTO', 'VERAPLICARDESCUENTO', 'SI', NULL, 'Administrativo'),
(120, 20, 'APLICAR DESCUENTO', 'VERINFORMEDESCUENTO', 'VER INFORME DESCUENTO', 'SI', NULL, 'Administrativo'),
(121, 30, 'SOLICITUD CREDITO', 'AprobarCredito', 'APROBAR CREDITO', 'SI', NULL, 'Administrativo'),
(122, 30, 'SOLICITUD CREDITO', 'RechazarCredito', 'RECHAZAR CREDITO', 'SI', NULL, 'Administrativo'),
(123, 30, 'SOLICITUD CREDITO', 'RevisionCredito', 'REVISION CREDITO', 'SI', NULL, 'Administrativo'),
(124, 30, 'SOLICITUD CREDITO', 'ELIMINARCREDITO', 'ELIMINARCREDITO', 'SI', NULL, 'Administrativo'),
(125, 27, 'FORMULARIO  VENTAS', 'HACERDESCUENTO', 'HACER DESCUENTO', 'NO', NULL, 'Administrativo'),
(126, 31, 'FORMULARIO CHEQUE', 'VERICONOCHEQUE', 'VER ICONO CHEQUE', 'NO', NULL, 'Administrativo'),
(127, 50, 'COBROS REALIZADOS', 'VERTODOSCOBROS', 'VER TODOS COBROS', 'NO', NULL, 'Administrativo'),
(128, 10, 'FORMULARIO DESPACHO DE PRODUCTOS', 'CARGARDESPACHOPRODUCTO', 'CARGAR DESPACHO PRODUCTO', 'NO', NULL, 'Administrativo'),
(130, 15, 'INFORME DE STOCK', 'VERINFORMEDESTOCK', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(131, 15, 'INFORME DE DOCUMENTOS ENTREGADOS', 'VERINFORMEDOCUMENTOSENTREGADOS', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(132, 15, 'INFORME DE PRODUCTOS NO VENDIDOS', 'VERINFORMEDEPRODUCTOSNOVENDIDOS', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(133, 15, 'INFORME DE DESPACHOS', 'VERDESPACHADOS', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(134, 15, 'INFORME DE METAS DE VENDEDORES', 'VERINFORMEDEMETAS', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(135, 15, 'INFORME DE METAS DE VENDEDORES', 'VERINFORMEDEMETAS', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(136, 15, 'INFORME DE METAS DE VENDEDORES', 'VERINFORMEDEMETAS', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(137, 15, 'INFORME DE AUDITORIA DE PRODUCTOS', 'VERAUDITORIAPRODUCTO', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(138, 15, 'INFORME DE CUMPLEAÑOS CLIENTES', 'VERINFORMECUMPLECLIENTE', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(139, 15, 'INFORME AGENDA CLIENTE', 'VERINFORMECLIENTEIMPAGO', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(140, 15, 'INFORME DE CLIENTES INFIEL', 'VERINFORMECLIENTEFIEL', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(141, 15, 'INFORME DE CLIENTES INFIEL', 'VERINFORMECLIENTEFIEL', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(142, 15, 'INFORME DE CLIENTES INFIEL', 'VERINFORMECLIENTEFIEL', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(143, 15, 'INFORME DE SOLICITUD DE DESCUENTO', 'VERINFORMESOLICITUDESCUENTO', 'VER ICONO INFORME DE DESCUENTO VENTAS', 'SI', NULL, 'Administrativo'),
(144, 15, 'INFORME DE CONTABILIDAD', 'VERINFORMECONTABILIDAD', 'VER ICONO CONTABILIDAD VENTA', 'SI', NULL, 'Administrativo'),
(145, 15, 'INFORME DE CONTABILIDAD', 'VERINFORMECONTABILIDAD', 'VER ICONO NOSE', 'SI', NULL, 'Administrativo'),
(146, 15, 'INFORME DE CONTABILIDAD DE COMPRA', 'VERINFOMRECONTABILIDADCOMPRA', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(147, 15, 'CLASIFICACION MOROSO', 'VERINFORMECUENTASCLIENTEMOROSO', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(148, 32, 'LISTADO TIPO PAGO', 'VERLISTADOTIPOPAGO', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(149, 32, 'LISTADO TIPO PAGO', 'EDITARLISTADODECAJA', 'EDITAR', 'SI', NULL, 'Administrativo'),
(150, 32, 'LISTADO TIPO PAGO', 'INSERTARLISTADOTIPOPAGO', 'INSERTAR', 'SI', NULL, 'Administrativo'),
(151, 32, 'LISTADO TIPO PAGO', 'BUSCARLISTADOTIPOPAGO', 'BUSCAR', 'SI', NULL, 'Administrativo'),
(152, 33, 'LISTADO BANCO', 'VERLISTADODEBANCOS', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(153, 33, 'LISTADO BANCO', 'INSERTARLISTADODEBANCOS', 'INSERTAR', 'SI', NULL, 'Administrativo'),
(154, 33, 'LISTADO BANCO', 'EDITARLISTADODEBANCO', 'EDITAR', 'SI', NULL, 'Administrativo'),
(155, 33, 'LISTADO BANCO', 'BUSCARLISTADODEBANCOS', 'BUSCAR', 'SI', NULL, 'Administrativo'),
(156, 33, 'LISTADO MORACLIENTE', 'VERLISTADODEMORACLIENTE', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(157, 34, 'LISTADO MORACLIENTE', 'INSERTARLISTADODEMORACLIENTE', 'INSERTAR', 'SI', NULL, 'Administrativo'),
(158, 34, 'LISTADO MORACLIENTE', 'EDITARLISTADODEMORACLIENTE', 'EDITAR', 'SI', NULL, 'Administrativo'),
(159, 34, 'LISTADO MORACLIENTE', 'BUSCARLISTADODEMORACLIENTE', 'BUSCAR', 'SI', NULL, 'Administrativo'),
(160, 35, 'LISTADO DOCUMENTOS', 'VERLISTADODEDOCUMENTOS', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(161, 35, 'LISTADO DOCUMENTOS', 'INSERTARLISTADODEDOCUMENTOS', 'INSERTAR', 'SI', NULL, 'Administrativo'),
(162, 35, 'LISTADO DOCUMENTOS', 'INSERTARLISTADODEDOCUMENTOS', 'INSERTAR', 'SI', NULL, 'Administrativo'),
(163, 35, 'LISTADO DOCUMENTOS', 'EDITARLISTADODEDOCUMENTOS', 'EDITAR', 'SI', NULL, 'Administrativo'),
(164, 35, 'LISTADO DOCUMENTOS', 'BUSCARLISTADODEDOCUMENTOS', 'BUSCAR', 'SI', NULL, 'Administrativo'),
(165, 30, 'CREAR NUEVO MOTIVO EGRESO', 'CREARNUEVOMOTIVO', 'CREAR NUEVO MOTIVO EGRESO', 'NO', NULL, 'Administrativo'),
(166, 35, 'INFORME EGRESO INGRESO COBRADORES', 'VERINFORMEDEEGRESOINGRESOCOBRADORES', 'VER INFORME EGRESO INGRESO COBRADORES', 'NO', NULL, 'Administrativo'),
(167, 30, 'HISTORIAL DE VENTAS', 'CAMBIARCLIENTEVENTAESTADO', 'CAMBIAR CLIENTE VENTA ESTADO', 'NO', NULL, 'Administrativo'),
(168, 30, 'HISTORIAL DE VENTAS', 'ACTUALIZARFECHAPAGO', 'ACTUALIZAR FECHA PAGO', 'NO', NULL, 'Administrativo'),
(169, 15, 'FORMULARIO DE INFORMES', 'VERINFORMEGENERALCREDITOS', 'VER ICONO INFORME GENERAL DE CREDITOS', 'NO', NULL, 'Administrativo'),
(170, 15, 'INFORME GENEERAL DE PRODUCTOS', 'VERINFORMEGRALPRODUCTOS', 'VER ICONO', 'SI', NULL, 'Administrativo'),
(171, 15, 'EGRESO INGRESO COBRADORES', 'EDITAREGRESOINGRESOCOBRADORES', 'EDITAR EGRESO INGRESO COBRADORES', 'SI', NULL, 'Administrativo'),
(172, 35, 'INFORME', 'VERINFORMEDEPOSITO', 'VER INFORME DEPOSITO', 'NO', NULL, 'Administrativo'),
(173, 35, 'REVISION DOCUMENTOS', 'VERREVISIONDOCUMENTOS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(174, 15, 'INFORME DOCUMENTOS ENTREGADOS CLIENTE', 'VERINFORMEDOCUMENTOSENTREGADOSCLIENTE', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(175, 0, 'REVISION DE DOCUMENTOS CLIENTE', 'VERREVISIONDOCUMENTOSCLIENTE', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(176, 0, 'DOCUMENTOS CLIENTE', 'VERLISTADODEDOCUMENTOSCLIENTE', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(177, 0, 'DOCUMENTOS CLIENTE', 'INSERTARLISTADODEDOCUMENTOSCLIENTE', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(178, 0, 'DOCUMENTOS CLIENTE', 'EDITARLISTADODEDOCUMENTOSCLIENTE', 'EDITAR', 'NO', NULL, 'Administrativo'),
(179, 0, 'DOCUMENTOS CLIENTE', 'BUSCARLISTADODEDOCUMENTOSCLIENTE', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(180, 11, 'FORMULARIO LISTADO DE CLIENTES', 'CREARNUEVADESCRIPCIONUBICACION', 'INGRESAR NUEVA DESCRIPCION UBICACION', 'NO', NULL, 'Administrativo'),
(181, 0, 'CARGAR PDF', 'CARGARARCHIVOSCLIENTE', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(182, 0, 'CARGAR PDF', 'CREARNUEVADESCRIPCIONARCHIVOCLIENTE', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(183, 15, 'INFORME DESCUENTO INTERES', 'VERINFORMEDESCUENTOINTERES', 'VER ICONO ', 'NO', NULL, 'Administrativo'),
(184, 0, 'PAGO PROVEEDOR', 'VERPAGOPROVEEDOR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(185, 0, 'GENERAR PRESUPUESTO', 'VERGENERARPRESUPUESTO', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(186, 0, 'AGENDA CLIENTE', 'VERAGENDA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(187, 0, 'CARGAR IMAGENES', 'VERCARGARFOTOSCLIENTE', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(188, 0, 'CAJA APP', 'VERCAJAAPP', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(189, 0, 'RESPALDO BASE DE DATOS', 'VERHISTORIALDB', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(190, 0, 'RECIBIR CAJA', 'VERRECIBIRCAJA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(191, 0, 'MIGRAR CAJA', 'VERMIGRARCAJA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(192, 15, 'INFORME INFORCOMF', 'VERINFORMEDEINFORMCONF', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(193, 0, 'LISTADO CHEQUE', 'VERLISTADOCHEQUE', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(194, 0, 'SOLICITUD DE CREDITOS', 'VERSOLICITUCREDITO', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(195, 0, 'PRODUCTOS DE BAJA', 'VERPRODUCTOSBAJA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(196, 0, 'INFORME DE SOLICITUD DE CREDITO', 'VERINFORMESOLICITUDCREDITO', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(197, 0, 'EDITAR STOCK ACTUAL PRODUCTO', 'EDITARINSERTARSTOCKACTUALPRODUCTO', 'EDITAR STOCK ACTUAL', 'NO', NULL, 'Administrativo'),
(198, 0, 'FORMULARIO INGRESO EGRESO', 'CAMBIARFECHAINGRESOEGRESO', 'MODIFICAR FECHA INGRESO EGRESO', 'NO', NULL, 'Administrativo'),
(199, 0, 'FORMULARIO MOVIMIENTO STOCK', 'VERMOVIMIENTOSTOCK', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(200, 0, 'FORMULARIO MOVIMIENTO STOCK', 'CREARNUEVAMOTIVOMOVIMIENTOSTOCK', 'CREAR NUEVO MOTIVO', 'NO', NULL, 'Administrativo'),
(201, 0, 'INFORME MOVIMIENTOS STOCK', 'VERINFORMEMOVIMIENTOSTOCK', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(202, 0, 'INFORME UBICACIONES CLIENTE', 'VERINFORMEUBICACIONESCLIENTE', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(203, 0, 'INFORME TAREAS COBRADOR', 'VERINFORMETAREASCOBRADOR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(204, 0, 'INFORME TAREA COBRADOR', 'TAREACOBRADORFINALIZAR', 'FINALIZAR COBRO', 'NO', NULL, 'Administrativo'),
(205, 0, 'INFORME TAREA COBRADOR', 'TAREACOBRADORELIMINAR', 'ELIMINAR TAREA COBRADOR', 'NO', NULL, 'Administrativo'),
(206, 0, 'FORMULARIO LISTADO CLIENTE', 'CAMBIARTIPOCLIENTE', 'MODIFICAR TIPO CLIENTE FIJO O NO FIJO', 'NO', NULL, 'Administrativo'),
(207, 0, 'FORMULARIO LISTADO CLIENTE', 'MODIFICARNOMBREAPELLIDOCLIENTE', 'MODIFICAR NOMBRE APELLIDO', 'NO', NULL, 'Administrativo'),
(208, 0, 'FORMULARIO LISTADO CLIENTE', 'MODIFICARNRODOCUMENTOCLIENTE', 'MODIFICAR DOCUMENTO CLIENTE', 'NO', NULL, 'Administrativo'),
(210, 0, 'FORMULARIO LISTADO CLIENTE', 'MODIFICARNROTELEFONOCLIENTE', 'MODIFICAR NUMERO DE TELEFONO', 'NO', NULL, 'Administrativo'),
(211, 0, 'FORMULARIO GENERAR LISTA CALLCENTER', 'VERGENERARLISTACALLCENTER', 'GENERAR LISTA CALLCENTER', 'SI', NULL, 'Administrativo'),
(212, 0, 'FORMULARIO INFORMCONF', 'VERINFORMCONF', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(213, 0, 'INFORME DE CUENTAS GENERAL', 'INGRESARCLIENTEAINFORMCONF', 'INGRESAR CLIENTE A INFORMCONF DESDE INFORME CLIENTE GRAL', 'NO', NULL, 'Administrativo'),
(214, 0, 'FORMULARIO INFORME CALLCENTER', 'VERINFORMECALLCENTER', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(215, 0, 'FORMULARIO CALLCENTER', 'VERCALLCENTER', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(216, 0, 'INFORME GENERAL DE CREDITOS', 'CREARTAREACOBRADOR', 'CREAR TAREAS PARA COBRADOR', 'NO', NULL, 'Administrativo'),
(217, 0, 'FORMULARIO CALLCENTER', 'INGRESARCLIENTEINCOBRABLE', 'CAMBIAR ESTADO CLIENTE A INCOBRABLE', 'NO', NULL, 'Administrativo'),
(218, 0, 'FORMULARIO SOLICITUD DESPACHO', 'VERSOLICITUDDESPACHO', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(219, 0, 'FORMULARIO SOLICITUD DESPACHO', 'ACEPTARSOLICITUDDESPACHO', 'ACEPTAR DESPACHO', 'NO', NULL, 'Administrativo'),
(220, 0, 'FORMULARIO CALLCENTER VENTAS', 'VERCALLCENTERVENTAS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(221, 40, 'MENU PRINCIPAL', 'VERCENTROINFORMACION', 'VER CENTRO DE INFORMACION', 'NO', NULL, 'Administrativo'),
(222, 0, 'FORMULARIO CLIENTES FIEL', 'VERGENERARLISTACALLCENTERVENTAS', 'CREAR LISTA CALLCENTER VENTAS', 'NO', NULL, 'Administrativo'),
(223, 0, 'INFORME CALLCENTER VENTAS', 'VERINFORMECALLCENTERVENTA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(224, 45, 'LISTADO METAS COBRADORES', 'VERLISTADOMETASCOBRADORES', 'VER LISTADO METAS COBRADORES', 'NO', NULL, 'Administrativo'),
(225, 45, 'LISTADO METAS COBRADORES', 'INSERTARLISTADOMETASCOBRADORES', 'INSERTAR LISTADO METAS COBRADORES', 'NO', NULL, 'Administrativo'),
(226, 1, 'INFORME DE DEUDA CLIENTE', 'VERINFORMEDEUDACLIENTE', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(227, 0, 'LISTADO NUEVOS CLIENTES', 'VERLISTADONUEVOSCLIENTES', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(228, 0, 'INFORME DE DESCUENTO CREDITO', 'VERINFORMEDESCUENTOCREDITO', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(229, 0, 'CUENTAS A COBRAR', 'CREARSOLICITUDDESCUENTOCREDITO', 'CREAR SOLICITUD DE DESCUENTO DE CREDITO', 'NO', NULL, 'Administrativo'),
(230, 0, 'CUENTAS A COBRAR', 'VERAPLICARDESCUENTOCREDITO', 'APLICAR DESCUENTO DE CREDITO', 'NO', NULL, 'Administrativo'),
(231, 0, 'NUEVOS CARGO', 'VERLISTADONUEVOSCARGO', 'NUEVOS CARGO', 'NO', NULL, 'Administrativo'),
(232, 0, 'NUEVOS FUNCIONARIO', 'VERLISTADONUEVOSFUNCIONARIO', 'NUEVOS FUNCIONARIO', 'NO', NULL, 'Administrativo'),
(233, 0, 'INGRESO EGRESO', 'CONFIRMAREGRESOINGRESO', 'CONFIRMAR INGRESO/EGRESO', 'NO', NULL, 'Administrativo'),
(234, 0, 'INGRESO EGRESO COBRADORES', 'CONFIRMAREGRESOINGRESOCOBRADORES', 'CONFIRMAR INGRESO/EGRESO COBRADORES', 'NO', NULL, 'Administrativo'),
(235, 0, 'CALCULO SALARIO FUNCIONARIO', 'CALCULOSALARIOFUNCIONARIO', 'CALCULO SALARIO FUNCIONARIO', 'NO', NULL, 'Administrativo'),
(236, 0, 'SOLICITUD CREDITO', 'ABRIRVISTASOLICITUDCREDITO', 'VER SOLICITUD DE CREDITO', 'NO', NULL, 'Administrativo'),
(237, 0, 'SOLICITUD CREDITO', 'EDITARSOLICITUDCREDITO', 'EDITAR SOLICITUD DE CREDITO', 'NO', NULL, 'Administrativo'),
(238, 0, 'DATOSVEHICULOS', 'VERDETALLEDATOSVEHICULOS', 'VER DETALLE DATOS VEHICULOS', 'NO', NULL, 'Administrativo'),
(239, 0, 'LISTADO VEHICULOS', 'VERLISTADOVEHICULOS', 'VER LISTADO VEHICULOS', 'NO', NULL, 'Administrativo'),
(240, 0, 'LISTADO VEHICULOS', 'VERNOTIFICACIONESVEHICULOS', 'VER NOTIFICACIONES VEHICULOS', 'NO', NULL, 'Administrativo'),
(241, 0, 'INFORME MANTENIMIENTO VEHICULOS', 'VERINFORMEMANTENIMIENTOVEHICULOS', 'VERINFORMEMANTENIMIENTOVEHICULOS', 'NO', NULL, 'Administrativo'),
(242, 0, 'FORMULARIO  VENTAS', 'VENDERSINSOLICITUDCREDITO', 'VENDER SIN SOLICITUD DE CREDITO', 'NO', NULL, 'Administrativo'),
(243, 0, 'LISTADO DE MENSAJES', 'VERLISTADODEMENSAJES', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(244, 0, 'LISTADO PRODUCTOS', 'INGRESARPUNTOSPRODUCTO', 'INGRESAR PUNTOS PRODUCTO', 'NO', NULL, 'Administrativo'),
(245, 0, 'INFORME CAJA COBRADOR', 'VERINFORMECAJACOBRADOR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(246, 0, 'LISTADO CATEGORIA PRECIOS', 'VERLISTADOCATEGORIAPRECIOS', 'VER LISTADO CATEGORIA PRECIOS', 'NO', NULL, 'Administrativo'),
(247, 0, 'SOLICITUD ANULAR VENTA', 'VERSOLICITUDANULARVENTA', 'VER SOLICITUD ANULAR VENTA', 'NO', NULL, 'Administrativo'),
(248, 0, 'INFORME SOLICITUD ANULACION', 'VERINFORMESOLICITUDANULACION', 'VER INFORME SOLICITUD ANULACION', 'NO', NULL, 'Administrativo'),
(249, 0, 'ADMINISTRACION DE LOCALES', 'VERLISTADOADMINLOCALES', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(250, 0, 'ADMINISTRACION DE LOCALES', 'EDITARLISTADOADMINLOCALES', 'EDITAR', 'NO', NULL, 'Administrativo'),
(251, 0, 'ADMINISTRACION DE LOCALES', 'INSERTARLISTADOADMINLOCALES', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(252, 0, 'ADMINISTRACION DE LOCALES', 'BUSCARLISTADOADMINLOCALES', 'BUSCAR', 'NO', NULL, 'Administrativo'),
(253, 0, 'EDITAR METAS VENDEDOR', 'EDITARMETASVENDEDOR', 'EDITAR META VENDEDOR', 'NO', NULL, 'Administrativo'),
(254, 0, 'CATEGORIA GASTO', 'CREARCATEGORIAGASTO', 'CREAR CATEGORIA GASTO', 'NO', NULL, 'Administrativo'),
(255, 16, 'FORMULARIO DE EGRESO / INGRESO', 'VERTODOSEGRESOINGRESO', 'VER TODOS EGRESO INGRESO', 'NO', NULL, 'Administrativo'),
(256, 0, 'INFORME VENTA COMPLETADA', 'VERINFORMEVENTACOMPLETADA', 'VER INFORME VENTA COMPLETADA', 'NO', NULL, 'Administrativo'),
(257, 0, 'INFORME PAGOS A PROVEEDOR', 'VERINFORMEPAGOSAPROVEEDOR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(258, 0, 'SOLICITUD CREDITO', 'CREARNUEVOSOLICITUDCREDITO', 'NUEVO SOLICITUD DE CREDITO', 'NO', NULL, 'Administrativo'),
(259, 0, 'CLIENTES TRABAJADOS', 'VERCLIENTESTRABAJADOS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(260, 0, 'INFORME DE CLIENTES TRABAJADOS', 'VERINFORMECLIENTESTRABAJADOS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(261, 0, 'CLIENTE PARA INFORMCONF', 'VERCLIENTEINFORMCONF', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(262, 0, 'INFORCONF', 'ACTIVARFECHAINFORCONF', 'ACTIVAR FECHA INFORCONF', 'NO', NULL, 'Administrativo'),
(263, 0, 'STOCK MINIMO PRODUCTO', 'VERSTOCKMINIMOPRODUCTO', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(264, 0, 'SOLICITUD DE DESPACHO', 'VERTODOSSOLICITUDESDESPACHO', 'VER TODAS LAS SOLICITUDES DE DESPACHO', 'NO', NULL, 'Administrativo'),
(265, 0, 'BALANCE GENERAL', 'VERBALANCEGENERAL', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(266, 0, 'CALCULADORA DE PRECIOS', 'VERCALCULADORADEPRECIOS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(267, 0, 'CARGAR ARCHIVOS EXCEL PEDIDO PROVEEDOR', 'CARGARARCHIVOSEXCELPEDIDOPROVEEDOR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(268, 0, 'CREAR NUEVA DESCRIPCION EXCEL PEDIDO PROVEEDOR', 'CREARNUEVADESCRIPCIONPEDIDOPROVEEDOR', 'INSERTAR', 'NO', NULL, 'Administrativo'),
(269, 0, 'CARGAR EXCEL PEDIDOS PROVEEEDOR', 'ELIMINAREXCELPEDIDOSPROVEEDOR', 'ELIMINAR EXCEL PEDIDOS DE PROVEEDOR', 'NO', NULL, 'Administrativo'),
(270, 0, 'CHEQUES A COBRAR', 'VERLISTADOCHEQUEACOBRAR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(271, 0, 'CALIFICACION ENTREGA', 'VERCALIFICACIONENTREGA', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(272, 0, 'CALLCENTER COBROS', 'PASARANOCONCRETADOTODOSLOSCLIENTECALLCENTERCOBROS', 'LIMPIAR CLIENTES CALLCENTER COBROS', 'NO', NULL, 'Administrativo'),
(273, 0, 'CARGAR CALIFICACION ENTREGA', 'CREARNUEVADESCRIPCIONFOTOCALIFICACIONENTREGA', 'CREAR NUEVA DESCRIPCION CALIFICACION', 'NO', NULL, 'Administrativo'),
(274, 0, 'NUEVA DESCRIPCION ARREGLO EGRESO INGRESO', 'CREARNUEVADESCRIPCIONARREGLOEGRESOINGRESO', 'CREAR', 'NO', NULL, 'Administrativo'),
(275, 0, 'EGRESO INGRESO JUAN', 'VERLISTADOEGRESOINGRESOJUAN', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(276, 0, 'EGRESO INGRESO ADMINISTRATIVO', 'VERLISTADOEGRESOINGRESOADMINISTRATIVO', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(277, 0, 'EGRESO INGRESO JUAN', 'CAMBIARFECHAINGRESOEGRESOJUAN', 'CAMBIAR FECHA DE EGRESO/INGRESO JUAN', 'NO', NULL, 'Administrativo'),
(278, 0, 'EGRESO INGRESO JUAN', 'CONFIRMAREGRESOINGRESOJUAN', 'CONFIRMAR EGRESO/INGRESO', 'NO', NULL, 'Administrativo'),
(279, 0, 'EGRESO INGRESO JUAN', 'CREARNUEVADESCRIPCIONARREGLOEGRESOINGRESOJUAN', 'CREAR DESCRIPCION ARREGLO EGRESO/INGRESO', 'NO', NULL, 'Administrativo'),
(280, 0, 'EGRESO INGRESO JUAN', 'CREARNUEVOMOTIVOEGRESOINGRESOJUAN', 'CREAR DESCRIPCION MOTIVO EGRESO/INGRESO', 'NO', NULL, 'Administrativo'),
(281, 0, 'EGRESO INGRESO JUAN', 'CREARNUEVADESCRIPCIONLOCALEGRESOINGRESOJUAN', 'CREAR DESCRIPCION LOCAL EGRESO/INGRESO', 'NO', NULL, 'Administrativo'),
(282, 0, 'EGRESO INGRESO ADMINISTRATIVO', 'CAMBIARFECHAINGRESOEGRESOADMINISTRATIVO', 'CAMBIAR FECHA INGRESO EGRESO ADMINISTRATIVO', 'NO', NULL, 'Administrativo'),
(283, 0, 'EGRESO INGRESO ADMINISTRATIVO', 'CONFIRMAREGRESOINGRESOADMINISTRATIVO', 'CONFIRMAR INGRESO EGRESO ADMINISTRATIVO', 'NO', NULL, 'Administrativo'),
(284, 0, 'EGRESO INGRESO ADMINISTRATIVO', 'CREARNUEVADESCRIPCIONARREGLOEGRESOINGRESOADMINISTRATIVO', 'CREAR NUEVA DESCRIPCION ARREGLO ADMINISTRATIVO', 'NO', NULL, 'Administrativo'),
(285, 0, 'EGRESO INGRESO ADMINISTRATIVO', 'CREARNUEVOMOTIVOEGRESOINGRESOADMINISTRATIVO', 'CREAR NUEVA DESCRIPCION MOTIVO ADMINISTRATIVO', 'NO', NULL, 'Administrativo'),
(286, 0, 'EGRESO INGRESO ADMINISTRATIVO', 'CREARNUEVADESCRIPCIONLOCALEGRESOINGRESOADMINISTRATIVO', 'CREAR NUEVA DESCRIPCION LOCAL ADMINISTRATIVO', 'NO', NULL, 'Administrativo'),
(287, 0, 'INFORME CUMPLEAÑOS', 'CREARNUEVADESCRIPCIONESTADOINFORMECUMPLE', 'CREAR ESTADO INFORME DE CUMPLEÑOS', 'NO', NULL, 'Administrativo'),
(288, 0, 'VENTAS', 'SOLICITARDESCUENTODEPRODUCTOS', 'SOLICITAR DESCUENTO DE PRODUCTOS', 'NO', NULL, 'Administrativo'),
(289, 0, 'INFORME GENERAL DE CUENTAS DEL CLIENTE', 'VERINFORMEGENERALCUENTASCLIENTE', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(290, 0, 'LISTADO PARAMETRO SOLICITUD', 'VERLISTADOPARAMETROSOLICITUD', 'VER LISTADO PARAMETRO SOLICITUD', 'NO', NULL, 'Administrativo'),
(291, 0, 'INFORME CLIENTES NUEVOS', 'VERINFORMECLIENTESNUEVOS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(292, 0, 'SIN USAR', 'VERPARAMETROSOLICITUD', 'SIN USAR', 'NO', NULL, 'Administrativo'),
(293, 0, 'SOLICITUD DE CREDITOS PARA APROBAR', 'VERCREDITOSAPROBAR', 'VER SOLICITUD DE CREDITOS PARA APROBAR', 'NO', NULL, 'Administrativo'),
(294, 0, 'GESTIONAR EQUIFAX', 'VERGESTIONAREQUIFAX', 'VER GESTIONAR EQUIFAX', 'NO', NULL, 'Administrativo'),
(295, 0, 'REFERENCIA COMERCIAL', 'VERLISTADOREFERENCIACOMERCIAL', 'VER LISTADO REFERENCIA COMERCIAL', 'NO', NULL, 'Administrativo'),
(296, 0, 'LIQUIDEZ', 'VERCARGARLIQUIDEZ', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(297, 0, 'AGENDA PERSONAL', 'VERAGENDAPERSONAL', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(298, 0, 'CARGAR ARCHIVO', 'VERCARGAARCHIVOGENERAL', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(299, 0, 'COBRANZA', 'VERRESUMENCOBRADOR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(300, 0, 'CALIFICACION DE COBRADORES', 'VERCALIFICACIONCOBRADOR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(301, 0, 'SECCION PRINCIPAL COBRADOR', 'VERSECCIONPRINCIPALCOBRADOR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(302, 0, 'SECCION PRINCIPAL VENTAS', 'VERSECCIONPRINCIPALVENTAS', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(303, 0, 'SECCION PRINCIPAL GERENCIAL', 'VERSECCIONPRINCIPALGERENCIAL', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(304, 0, 'CALIFICACION DE VENDEDOR', 'VERCALIFICACIONVENDEDOR', 'VER ICONO', 'NO', NULL, 'Administrativo'),
(305, 0, 'PATRIMONIO EMPRESA', 'VERPATRIMONIOEMPRESA', 'VER PATRIMONIO EMPRESA', 'NO', NULL, 'Administrativo'),
(306, 0, 'GASTOS FIJOS EMPRESA', 'VERGASTOSFIJOSEMPRESA', 'VER GASTOS FIJOS EMPRESA', 'NO', NULL, 'Administrativo'),
(307, 30, 'BASE POSITIVA EQUIFAX', 'VERBASEPOSITIVAEQUIFAX', 'VER BASE POSITIVA EQUIFAX', 'NO', NULL, 'Administrativo'),
(308, 30, 'HISTORIAL DE VENTAS', 'VERHISTORIALVENTASOTROSUSUARIOS', 'VER HISTORIAL DE VENTAS DE OTROS USUARIOS', 'NO', NULL, 'Administrativo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listado_niveles`
--

CREATE TABLE `listado_niveles` (
  `cod_niveles` int(11) NOT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listapreciocategoria`
--

CREATE TABLE `listapreciocategoria` (
  `idlistapreciocategoria` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `cuota` int(11) DEFAULT NULL,
  `porcentaje` int(11) DEFAULT NULL,
  `descuento` int(11) DEFAULT NULL,
  `cod_categoriaFK` int(11) NOT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_controldeposito`
--

CREATE TABLE `lista_controldeposito` (
  `idlista_controldeposito` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `fecha_insert` date NOT NULL,
  `cod_localFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_precio_producto`
--

CREATE TABLE `lista_precio_producto` (
  `cod_lista_precio_producto` int(11) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `pr_desde` bigint(20) DEFAULT NULL,
  `pr_hasta` bigint(20) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `fecha_hasta` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `local`
--

CREATE TABLE `local` (
  `cod_local` int(11) NOT NULL,
  `Nombre` varchar(45) DEFAULT NULL,
  `estado` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `local`
--

INSERT INTO `local` (`cod_local`, `Nombre`, `estado`) VALUES
(1, 'CASA CENTRAL', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `local_lista_precio`
--

CREATE TABLE `local_lista_precio` (
  `cod_local_lista_precio` int(11) NOT NULL,
  `accion` varchar(45) DEFAULT NULL,
  `cod_lista_precio_productoFK` int(11) NOT NULL,
  `cod_localFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `descripcion` varchar(75) DEFAULT NULL,
  `cod_marcas` int(11) NOT NULL,
  `Estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`descripcion`, `cod_marcas`, `Estado`) VALUES
('GENERAL', 2, 'Activo');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajesenviados`
--

CREATE TABLE `mensajesenviados` (
  `id` int(11) NOT NULL,
  `idcliente` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` varchar(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metas`
--

CREATE TABLE `metas` (
  `idMetas` int(11) NOT NULL,
  `montoContado` int(11) DEFAULT NULL,
  `Estado` varchar(45) DEFAULT NULL,
  `cod_vendedorFK` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `montoCredito` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metas_salario`
--

CREATE TABLE `metas_salario` (
  `idmetas_salario` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `porcentaje` double DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_cargosFK` int(11) NOT NULL,
  `desde` double DEFAULT NULL,
  `hasta` double DEFAULT NULL,
  `comision_desde` varchar(45) NOT NULL,
  `agrupacion_comision` varchar(45) NOT NULL,
  `metodo` varchar(45) NOT NULL,
  `tipoVenta` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metas_venta`
--

CREATE TABLE `metas_venta` (
  `cod_metas_venta` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `contado` int(11) DEFAULT NULL,
  `credito` int(11) DEFAULT NULL,
  `cod_localFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `meta_cobrador`
--

CREATE TABLE `meta_cobrador` (
  `cod_meta_cobrador` int(11) NOT NULL,
  `monto` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `porcentaje` int(11) DEFAULT NULL,
  `monto_cobrado` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_cobradorFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migracion_casamario_cliente`
--

CREATE TABLE `migracion_casamario_cliente` (
  `source_person_id` int(11) NOT NULL,
  `target_cliente_id` int(11) NOT NULL,
  `estado_origen` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Estructura de tabla para la tabla `migracion_casamario_credito`
--

CREATE TABLE `migracion_casamario_credito` (
  `source_payment_id` int(11) NOT NULL,
  `target_credito_id` int(11) NOT NULL,
  `target_venta_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Estructura de tabla para la tabla `migracion_casamario_producto`
--

CREATE TABLE `migracion_casamario_producto` (
  `source_item_id` int(11) NOT NULL,
  `target_producto_id` varchar(45) NOT NULL,
  `estado_origen` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Estructura de tabla para la tabla `migracion_casamario_venta`
--

CREATE TABLE `migracion_casamario_venta` (
  `source_sale_id` int(11) NOT NULL,
  `target_venta_id` int(11) NOT NULL,
  `source_customer_id` int(11) DEFAULT NULL,
  `target_cliente_id` int(11) NOT NULL,
  `resolucion_cliente` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Estructura de tabla para la tabla `migrardeudas`
--

CREATE TABLE `migrardeudas` (
  `iddeudas` int(11) NOT NULL,
  `fecha` varchar(45) DEFAULT NULL,
  `cuenta` varchar(45) DEFAULT NULL,
  `cliente` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `importe` varchar(45) DEFAULT NULL,
  `saldo` varchar(45) DEFAULT NULL,
  `plazo` varchar(45) DEFAULT NULL,
  `transaccion` varchar(45) DEFAULT NULL,
  `comprobante` varchar(45) DEFAULT NULL,
  `condicion` varchar(45) DEFAULT NULL,
  `ultimopago` varchar(45) DEFAULT NULL,
  `cuotapendiente` varchar(45) DEFAULT NULL,
  `entrega` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrarpagos`
--

CREATE TABLE `migrarpagos` (
  `fechaPago` varchar(45) DEFAULT NULL,
  `cliente` varchar(45) DEFAULT NULL,
  `cuota` varchar(45) DEFAULT NULL,
  `vence` varchar(45) DEFAULT NULL,
  `monto` int(11) DEFAULT NULL,
  `interes` int(11) DEFAULT NULL,
  `sucursal` varchar(45) DEFAULT NULL,
  `comprobante` varchar(45) DEFAULT NULL,
  `idmigrarPagos` int(11) NOT NULL,
  `plazo` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrarpagos2`
--

CREATE TABLE `migrarpagos2` (
  `fechaPago` varchar(45) DEFAULT NULL,
  `cliente` varchar(45) DEFAULT NULL,
  `comprobante` varchar(45) DEFAULT NULL,
  `cuota` varchar(45) DEFAULT NULL,
  `vence` varchar(45) DEFAULT NULL,
  `monto` varchar(45) DEFAULT NULL,
  `interes` varchar(45) DEFAULT NULL,
  `plazo` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `idmigrarpagos2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrarproducto`
--

CREATE TABLE `migrarproducto` (
  `idmigrarproducto` int(11) NOT NULL,
  `barra` varchar(45) DEFAULT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `categoria` varchar(150) DEFAULT NULL,
  `marca` varchar(150) DEFAULT NULL,
  `proveedor` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrarstock`
--

CREATE TABLE `migrarstock` (
  `codigo` varchar(45) DEFAULT NULL,
  `sucursal` varchar(45) DEFAULT NULL,
  `stock` varchar(45) DEFAULT NULL,
  `precio` varchar(45) DEFAULT NULL,
  `idmigrarstock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrarventa`
--

CREATE TABLE `migrarventa` (
  `cliente` varchar(45) DEFAULT NULL,
  `fechaven` varchar(45) DEFAULT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `condicion` varchar(45) DEFAULT NULL,
  `importe` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `entrega` varchar(45) DEFAULT NULL,
  `plazo` varchar(45) DEFAULT NULL,
  `iniciopago` varchar(45) DEFAULT NULL,
  `comprobantenro` varchar(45) DEFAULT NULL,
  `factura` varchar(45) DEFAULT NULL,
  `cuenta` varchar(45) DEFAULT NULL,
  `documento` varchar(45) DEFAULT NULL,
  `establecimiento` varchar(45) DEFAULT NULL,
  `expedicion` varchar(45) DEFAULT NULL,
  `sucursal` varchar(45) DEFAULT NULL,
  `timbrado` varchar(45) DEFAULT NULL,
  `tipocomprobante` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `idmigrarventa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrar_caja`
--

CREATE TABLE `migrar_caja` (
  `idmigrar_caja` int(11) NOT NULL,
  `obs` varchar(150) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `monto` int(11) DEFAULT NULL,
  `cod_caja_desdeFK` int(11) DEFAULT NULL,
  `cod_caja_hastaFK` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `cod_usuRecibeFK` int(11) DEFAULT NULL,
  `cod_UsuEnviaFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mora_cliente`
--

CREATE TABLE `mora_cliente` (
  `nombre` varchar(45) DEFAULT NULL,
  `diadesde` varchar(45) DEFAULT NULL,
  `diahasta` varchar(45) DEFAULT NULL,
  `informe` varchar(45) DEFAULT NULL,
  `idmora_cliente` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `generar` varchar(20) NOT NULL DEFAULT 'SI',
  `cobrable` varchar(45) DEFAULT NULL,
  `puntaje` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motivo_e_i`
--

CREATE TABLE `motivo_e_i` (
  `idmotivo_e_i` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motivo_e_i_administrativo`
--

CREATE TABLE `motivo_e_i_administrativo` (
  `idmotivo_e_i_administrativo` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motivo_e_i_juan`
--

CREATE TABLE `motivo_e_i_juan` (
  `idmotivo_e_i_juan` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motivo_movimiento_stock`
--

CREATE TABLE `motivo_movimiento_stock` (
  `idmotivo_movimiento_stock` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento_stock`
--

CREATE TABLE `movimiento_stock` (
  `idmovimiento_stock` int(11) NOT NULL,
  `cod_user_insert` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `idmotivo_movimiento_stockFK` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `cod_productoFK` int(11) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_localFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota_credito`
--

CREATE TABLE `nota_credito` (
  `idnota_credito` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'Activo',
  `cod_usuario_insert` int(11) DEFAULT NULL,
  `monto` int(11) DEFAULT NULL,
  `cod_proveedorFK` int(11) DEFAULT NULL,
  `cod_compraFK` int(11) DEFAULT NULL,
  `nronotacredito` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `cod_notificaciones` int(11) NOT NULL,
  `mensaje` varchar(450) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` timestamp NULL DEFAULT current_timestamp(),
  `tipo` varchar(45) DEFAULT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `estado_mensaje` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nrofactura`
--

CREATE TABLE `nrofactura` (
  `Cod_Nro` int(11) NOT NULL,
  `nro` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cod_localfk` int(11) NOT NULL,
  `estado` varchar(15) NOT NULL,
  `cod_usuarioFk` int(11) NOT NULL,
  `nrocaja` varchar(45) DEFAULT NULL,
  `timbrado` varchar(20) NOT NULL,
  `ire` varchar(5) NOT NULL,
  `irp` varchar(5) NOT NULL,
  `iva` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nuevos_cliente`
--

CREATE TABLE `nuevos_cliente` (
  `idnuevos_cliente` int(11) NOT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `documento` varchar(45) DEFAULT NULL,
  `zona` varchar(100) DEFAULT NULL,
  `estado_asignado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observacion_calificacion_cobrador`
--

CREATE TABLE `observacion_calificacion_cobrador` (
  `idobservacion_calificacion_cobrador` int(11) NOT NULL,
  `descripicion` varchar(150) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cod_cobrador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observacion_calificacion_vendedor`
--

CREATE TABLE `observacion_calificacion_vendedor` (
  `idobservacion_calificacion_vendedor` int(11) NOT NULL,
  `descripicion` varchar(150) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cod_vendedor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `idPago` int(11) NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Monto` int(11) DEFAULT NULL,
  `cod_creditoFK` int(11) NOT NULL,
  `cod_cobradorFK` int(11) NOT NULL,
  `Tipo` varchar(45) DEFAULT 'Credito',
  `hora` datetime NOT NULL DEFAULT current_timestamp(),
  `cod_venta_fk` int(11) NOT NULL,
  `comision` int(11) NOT NULL DEFAULT 10,
  `lat` double NOT NULL,
  `lot` double NOT NULL,
  `nrofactura` varchar(14) NOT NULL DEFAULT '0000',
  `titulocuota` varchar(150) NOT NULL,
  `tipopago` varchar(45) DEFAULT 'Efectivo',
  `codApertura` varchar(45) NOT NULL,
  `codCaja` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `codAperturaApp` varchar(45) DEFAULT NULL,
  `cod_tipoPagoFK` int(11) NOT NULL,
  `nroventa` varchar(45) DEFAULT NULL,
  `anulado` varchar(45) DEFAULT NULL,
  `nrocuenta` varchar(75) DEFAULT NULL,
  `banco` varchar(45) DEFAULT NULL,
  `nroboleta` varchar(75) DEFAULT NULL,
  `cod_moracliente` int(11) DEFAULT NULL,
  `condi` varchar(45) NOT NULL,
  `desde` varchar(45) NOT NULL,
  `cod_tareaCobadorFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Estructura de tabla para la tabla `pagosdecompra`
--

CREATE TABLE `pagosdecompra` (
  `codpago` int(11) NOT NULL,
  `monto` int(11) DEFAULT NULL,
  `fechaapagar` date DEFAULT NULL,
  `fechadelpago` date DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_compraFk` int(11) NOT NULL,
  `nrocheque` varchar(45) DEFAULT NULL,
  `cod_user_insert` varchar(45) DEFAULT NULL,
  `cod_user_edit` varchar(45) DEFAULT NULL,
  `fecha_insert` datetime DEFAULT NULL,
  `fecha_edit` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagoseliminados`
--

CREATE TABLE `pagoseliminados` (
  `idpagoseliminados` int(11) NOT NULL,
  `motivo` varchar(150) DEFAULT NULL,
  `monto` varchar(35) DEFAULT NULL,
  `cuota` varchar(15) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `cod_usuario` int(11) NOT NULL,
  `nroventa` varchar(45) DEFAULT NULL,
  `cod_creditoFK` int(11) DEFAULT NULL,
  `cod_cobradorFK` int(11) DEFAULT NULL,
  `cod_ventaFK` int(11) DEFAULT NULL,
  `comision` int(11) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lot` double DEFAULT NULL,
  `nrofactura` varchar(25) DEFAULT NULL,
  `tipopago` varchar(45) DEFAULT NULL,
  `codApertura` varchar(45) DEFAULT NULL,
  `codCaja` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `codAperturaApp` varchar(45) DEFAULT NULL,
  `cod_tipoPagoFK` int(11) DEFAULT NULL,
  `nrocuenta` varchar(45) DEFAULT NULL,
  `banco` varchar(45) DEFAULT NULL,
  `nroboleta` varchar(45) DEFAULT NULL,
  `cod_moracliente` int(11) DEFAULT NULL,
  `cod_tareaCobadorFK` int(11) DEFAULT NULL,
  `idPago` int(11) DEFAULT NULL,
  `Tipo` varchar(45) DEFAULT NULL,
  `hora_pago` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagosproveedor`
--

CREATE TABLE `pagosproveedor` (
  `idpagosProveedor` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `monto` int(11) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `cod_usuarioFK` int(11) NOT NULL,
  `cod_proveedorFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago_total_compra`
--

CREATE TABLE `pago_total_compra` (
  `idpago_total_compra` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `monto` int(11) DEFAULT NULL,
  `user_insert` int(11) DEFAULT NULL,
  `url` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametros_credito`
--

CREATE TABLE `parametros_credito` (
  `id` int(11) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `minimo` int(11) DEFAULT NULL,
  `maximo` int(11) DEFAULT NULL,
  `valor_texto` varchar(50) DEFAULT NULL,
  `puntaje` int(11) DEFAULT 0,
  `tipo` enum('puntaje','rechazo','revision','aprobado') DEFAULT 'puntaje'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patrimonio_empresa`
--

CREATE TABLE `patrimonio_empresa` (
  `idpatrimonio_empresa` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `tipo` varchar(20) NOT NULL DEFAULT 'Activo',
  `valor` decimal(18,2) NOT NULL DEFAULT 0.00,
  `fecha` date NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'Activo',
  `observacion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idpedidos` int(11) NOT NULL,
  `cod_productoFK` varchar(24) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `costo` double NOT NULL,
  `cod_clienteFK` varchar(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `cod_persona` int(11) NOT NULL,
  `nombre_persona` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(25) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `apellido_persona` varchar(255) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`cod_persona`, `nombre_persona`, `direccion`, `telefono`, `email`, `apellido_persona`) VALUES
(1, 'GUSTAVO ACOSTA', 'X', 'X', 'X', ''),
(2, 'Good - Technology', 'X', 'X', 'X', ''),
(10, 'CLIENTE OCASIONAL', 'BARRIO ESTACION COSTA, CAMINO A CAUNDY., FELIX PEREZ CARDOZO', '0982874495', 'A 3 CUADRAS DEL ORATORIO 15 DE AGOSTO.', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `cod_producto` varchar(45) NOT NULL,
  `nombre_producto` varchar(255) NOT NULL,
  `descripcion_producto` varchar(255) DEFAULT NULL,
  `unidad_producto` varchar(20) NOT NULL,
  `precio_producto` bigint(20) NOT NULL,
  `precio_compra` bigint(20) NOT NULL,
  `stock_producto` double NOT NULL,
  `iva` int(11) DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `tamaño` varchar(45) DEFAULT NULL,
  `cod_localFK` int(11) NOT NULL DEFAULT 1,
  `comision` double NOT NULL,
  `estado` varchar(45) DEFAULT 'Activo',
  `cod_categoriaFK` int(11) NOT NULL,
  `cod_marcasFK` int(11) NOT NULL,
  `cod_ImpuestoFK` int(11) NOT NULL,
  `porcentaje` int(5) NOT NULL,
  `cod_barra` varchar(45) DEFAULT NULL,
  `tipo` varchar(15) NOT NULL DEFAULT 'VENTA DIRECTA',
  `CodProveedor` varchar(45) DEFAULT NULL,
  `cod_user_insert` varchar(45) DEFAULT NULL,
  `cod_user_edit` varchar(45) DEFAULT NULL,
  `fecha_insert` datetime DEFAULT NULL,
  `fecha_edit` datetime DEFAULT NULL,
  `codFabricaFK` varchar(45) NOT NULL,
  `link` varchar(500) NOT NULL,
  `promo` varchar(50) NOT NULL,
  `url` varchar(256) DEFAULT NULL,
  `tipo_producto` varchar(45) DEFAULT NULL,
  `condicion_precio` varchar(45) DEFAULT 'SI'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Estructura de tabla para la tabla `profesion`
--

CREATE TABLE `profesion` (
  `idprofesion` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `cod_proveedor` int(11) NOT NULL,
  `rut_proveedor` varchar(45) NOT NULL,
  `cod_user_insert` varchar(45) DEFAULT NULL,
  `cod_user_edit` varchar(45) DEFAULT NULL,
  `fecha_insert` datetime DEFAULT NULL,
  `fecha_edit` datetime DEFAULT NULL,
  `estado` varchar(15) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntos`
--

CREATE TABLE `puntos` (
  `idpuntos` int(11) NOT NULL,
  `punto` varchar(45) DEFAULT NULL,
  `cod_productoFK` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `referenciascliente`
--

CREATE TABLE `referenciascliente` (
  `idreferenciascliente` int(11) NOT NULL,
  `telef` varchar(45) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `referencias` varchar(150) DEFAULT NULL,
  `observacion` varchar(150) DEFAULT NULL,
  `cod_clienteFk` int(11) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `obs` varchar(250) NOT NULL,
  `calificacion` varchar(45) DEFAULT NULL,
  `monto` int(11) DEFAULT NULL,
  `imagen` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `referenciascomercialcliente`
--

CREATE TABLE `referenciascomercialcliente` (
  `idreferenciascomercialcliente` int(11) NOT NULL,
  `telef` varchar(50) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `referencias` varchar(150) NOT NULL,
  `observacion` varchar(150) NOT NULL,
  `cod_clienteFk` int(11) NOT NULL,
  `tipo` varchar(150) NOT NULL,
  `obs` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refinanciamentos`
--

CREATE TABLE `refinanciamentos` (
  `idrefinanciamentos` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `cod_venta` int(11) NOT NULL,
  `cod_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reglas_credito`
--

CREATE TABLE `reglas_credito` (
  `id` int(11) NOT NULL,
  `nombre_regla` varchar(50) NOT NULL,
  `puntaje_minimo` int(11) NOT NULL,
  `puntaje_maximo` int(11) NOT NULL,
  `resultado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reparacion_casamario_pago_original_20260824`
--

CREATE TABLE `reparacion_casamario_pago_original_20260824` (
  `idPago` int(11) NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Monto` int(11) DEFAULT NULL,
  `cod_creditoFK` int(11) NOT NULL,
  `cod_cobradorFK` int(11) NOT NULL,
  `Tipo` varchar(45) DEFAULT 'Credito',
  `hora` datetime NOT NULL DEFAULT current_timestamp(),
  `cod_venta_fk` int(11) NOT NULL,
  `comision` int(11) NOT NULL DEFAULT 10,
  `lat` double NOT NULL,
  `lot` double NOT NULL,
  `nrofactura` varchar(14) NOT NULL DEFAULT '0000',
  `titulocuota` varchar(150) NOT NULL,
  `tipopago` varchar(45) DEFAULT 'Efectivo',
  `codApertura` varchar(45) NOT NULL,
  `codCaja` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `codAperturaApp` varchar(45) DEFAULT NULL,
  `cod_tipoPagoFK` int(11) NOT NULL,
  `nroventa` varchar(45) DEFAULT NULL,
  `anulado` varchar(45) DEFAULT NULL,
  `nrocuenta` varchar(75) DEFAULT NULL,
  `banco` varchar(45) DEFAULT NULL,
  `nroboleta` varchar(75) DEFAULT NULL,
  `cod_moracliente` int(11) DEFAULT NULL,
  `condi` varchar(45) NOT NULL,
  `desde` varchar(45) NOT NULL,
  `cod_tareaCobadorFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Estructura de tabla para la tabla `respaldo_casamario_clientes_ocasionales_20260826`
--

CREATE TABLE `respaldo_casamario_clientes_ocasionales_20260826` (
  `source_sale_id` int(11) NOT NULL,
  `target_venta_id` int(11) NOT NULL,
  `source_customer_id_anterior` int(11) DEFAULT NULL,
  `target_cliente_id_anterior` int(11) NOT NULL,
  `resolucion_anterior` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cod_clienteFK_anterior` int(11) NOT NULL,
  `source_customer_id_correcto` int(10) DEFAULT 686,
  `target_cliente_id_correcto` int(11) NOT NULL,
  `fecha_respaldo` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Estructura de tabla para la tabla `respaldo_creditos_saldo_minimo_20260824`
--

CREATE TABLE `respaldo_creditos_saldo_minimo_20260824` (
  `plazo` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `fechapago` date DEFAULT NULL,
  `cod_venta` int(11) NOT NULL,
  `Monto` int(11) DEFAULT NULL,
  `idcredito` int(11) NOT NULL DEFAULT 0,
  `Esado` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Nro_recibo` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `dias` double NOT NULL,
  `interes` double NOT NULL,
  `totalinteres` int(11) NOT NULL,
  `totaldeuda` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `pagado` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `tipo` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'CUOTAS',
  `diasatrasados` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `deudaInteres` int(11) NOT NULL DEFAULT 0,
  `nroventa` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `anulado` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `condi` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `desde` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cod_tareaFK` int(11) DEFAULT NULL,
  `descuentoInteres` int(11) DEFAULT 0,
  `saldo_ajuste` decimal(33,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Estructura de tabla para la tabla `sector_vendedor`
--

CREATE TABLE `sector_vendedor` (
  `idsector_vendedor` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguridad`
--

CREATE TABLE `seguridad` (
  `id` int(11) NOT NULL,
  `id_usuario` varchar(45) DEFAULT NULL,
  `navegador` varchar(45) DEFAULT NULL,
  `pass` varchar(45) DEFAULT NULL,
  `desde` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `seguridad`
--

INSERT INTO `seguridad` (`id`, `id_usuario`, `navegador`, `pass`, `desde`) VALUES
(6, '2', 'chrome', 'MTk4Mw++', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sock_locales`
--

CREATE TABLE `sock_locales` (
  `idsock_locales` int(11) NOT NULL,
  `cant` double DEFAULT NULL,
  `cod_producto` varchar(45) NOT NULL,
  `cod_local` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `idsolicitud` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cant` double DEFAULT NULL,
  `cod_producto1` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cod_persona` int(11) NOT NULL,
  `local1` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `local2` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cod_producto2` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudcredito`
--

CREATE TABLE `solicitudcredito` (
  `idSolicitudCredito` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(50) NOT NULL,
  `cod_clienteFK` int(11) NOT NULL,
  `cod_codeudorFK` int(11) NOT NULL,
  `cod_cobradorFK` int(11) NOT NULL,
  `cod_localFK` int(11) NOT NULL,
  `detalleVenta` varchar(100) NOT NULL,
  `cod_usuarioFK` int(11) NOT NULL,
  `observacion` varchar(500) NOT NULL,
  `estado_entrega` varchar(45) DEFAULT 'NO',
  `fecha_entrega` date DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `lot` varchar(100) DEFAULT NULL,
  `entrega_cobradorFK` int(11) DEFAULT NULL,
  `estado_revision_documento` varchar(45) DEFAULT 'ACTIVO',
  `estado_revision_documento_pagare` varchar(45) DEFAULT 'ACTIVO',
  `observacion_general` varchar(500) DEFAULT NULL,
  `monto_ref_comercial` int(11) DEFAULT NULL,
  `estado_analisis` varchar(45) DEFAULT 'PENDIENTE',
  `obs_ia` varchar(150) DEFAULT NULL,
  `esteadoInforconf` varchar(45) DEFAULT 'PENDIENTE',
  `monto_referencia` int(11) DEFAULT NULL,
  `calificacion_inforconf` varchar(45) DEFAULT NULL,
  `estado_referencia` varchar(45) DEFAULT 'PENDIENTE',
  `entrega_inicial` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicituddescuendo`
--

CREATE TABLE `solicituddescuendo` (
  `idsolicituddescuendo` int(11) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `fecha` date NOT NULL,
  `cod_UsuAprobado` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precioDescuento` int(11) NOT NULL,
  `cod_usuarioFK` int(11) NOT NULL,
  `cod_productoFK` varchar(45) NOT NULL,
  `precio` int(11) DEFAULT NULL,
  `cod_clienteFK` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicituddescuentocredito`
--

CREATE TABLE `solicituddescuentocredito` (
  `idsolicituddescuentocredito` int(11) NOT NULL,
  `totalSolic` int(11) DEFAULT NULL,
  `totalaprobado` int(11) DEFAULT NULL,
  `fecha_solic` date DEFAULT NULL,
  `cod_UsuAprobado` int(11) DEFAULT NULL,
  `cod_usuarioFK` int(11) DEFAULT NULL,
  `cod_creditoFK` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_local` int(11) DEFAULT NULL,
  `detalle_cuota` varchar(45) DEFAULT NULL,
  `fecha_apro` date DEFAULT NULL,
  `motivo` varchar(200) DEFAULT NULL,
  `cod_clienteFK` int(11) NOT NULL,
  `monto_cuota` int(11) DEFAULT NULL,
  `tipo_solicitud` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicituddescuentointeres`
--

CREATE TABLE `solicituddescuentointeres` (
  `idsolicituddescuentointeres` int(11) NOT NULL,
  `totalSolic` int(11) DEFAULT NULL,
  `totalInteres` int(11) DEFAULT NULL,
  `totalaprobado` int(11) DEFAULT NULL,
  `fecha_solic` date DEFAULT NULL,
  `cod_UsuAprobado` int(11) DEFAULT NULL,
  `cod_usuarioFK` int(11) DEFAULT NULL,
  `cod_creditoFK` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_local` int(11) DEFAULT NULL,
  `detalle_cuota` varchar(45) DEFAULT NULL,
  `fecha_apro` date DEFAULT NULL,
  `estado_uso` varchar(45) DEFAULT NULL,
  `motivo` varchar(200) DEFAULT NULL,
  `tipo_pago` varchar(45) NOT NULL,
  `cod_clienteFK` int(11) NOT NULL,
  `diasatraso` varchar(45) DEFAULT NULL,
  `montocuota` int(11) DEFAULT NULL,
  `cod_ventaFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud_anulacion`
--

CREATE TABLE `solicitud_anulacion` (
  `idsolicitud_anulacion` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `motivo` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cod_ventaFK` int(11) DEFAULT NULL,
  `cod_usuarioFK` int(11) DEFAULT NULL,
  `estado` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `tipo` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cod_usuAprobado` varchar(45) DEFAULT NULL,
  `cod_usuConfirmado` int(11) DEFAULT NULL,
  `estado_confirmado` varchar(45) DEFAULT 'PENDIENTE'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stocklocales`
--

CREATE TABLE `stocklocales` (
  `idstocklocales` int(11) NOT NULL,
  `cantidad` double DEFAULT NULL,
  `cod_productofk` varchar(45) NOT NULL,
  `cod_localfk` int(11) NOT NULL,
  `precio` varchar(45) NOT NULL,
  `user_update` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Estructura de tabla para la tabla `stockminimo`
--

CREATE TABLE `stockminimo` (
  `idstockminimo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `cod_productoFK` int(11) NOT NULL,
  `cod_localFK` int(11) NOT NULL,
  `user_update` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock_producto`
--

CREATE TABLE `stock_producto` (
  `idstock_producto` int(11) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `operacion` varchar(45) DEFAULT NULL,
  `entero` int(11) DEFAULT NULL,
  `user_insert` int(11) DEFAULT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `lote` varchar(45) DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `cod_stocklocalesFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
--
-- Estructura de tabla para la tabla `sueldo`
--

CREATE TABLE `sueldo` (
  `idsueldo` int(11) NOT NULL,
  `comision` double DEFAULT NULL,
  `totalrecaudado` double DEFAULT NULL,
  `sueldo` double DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `codpersona` int(11) NOT NULL,
  `tipouser` varchar(45) DEFAULT NULL,
  `desde` varchar(45) DEFAULT NULL,
  `estado_registro` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipopago`
--

CREATE TABLE `tipopago` (
  `cod_tipoPago` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `datos` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `tipopago`
--

INSERT INTO `tipopago` (`cod_tipoPago`, `nombre`, `datos`, `estado`) VALUES
(1, 'Efectivo', '', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_detalle_vehiculo`
--

CREATE TABLE `tipo_detalle_vehiculo` (
  `idtipo_detalle_vehiculo` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `notificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `totalesdeudaventa`
--

CREATE TABLE `totalesdeudaventa` (
  `idtotalesdeudaventa` int(11) NOT NULL,
  `totalinteres` int(11) DEFAULT NULL,
  `acobrar` int(11) DEFAULT NULL,
  `deudaactual` int(11) DEFAULT NULL,
  `fechaactualizacion` date DEFAULT NULL,
  `cod_ventaFk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicaciones`
--

CREATE TABLE `ubicaciones` (
  `idubicaciones` int(11) NOT NULL,
  `lat` double NOT NULL,
  `lot` double NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `cod_clienteFk` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cod_cobradorFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidadmedida`
--

CREATE TABLE `unidadmedida` (
  `cod_Unidadmedida` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `simbolo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `cod_usuario` int(11) NOT NULL,
  `rut_usuario` varchar(20) NOT NULL,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `estado` varchar(8) NOT NULL,
  `acceso` varchar(15) NOT NULL DEFAULT 'Activo',
  `cod_localFK` int(11) NOT NULL DEFAULT 1,
  `tipo_usuario` varchar(45) NOT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`cod_usuario`, `rut_usuario`, `login`, `password`, `estado`, `acceso`, `cod_localFK`, `tipo_usuario`, `foto_perfil`) VALUES
(1, '5524793', 'GUSTAVO', 'GUSTAVO', 'Activo', '1', 1, 'NORMAL', NULL),
(2, '0', 'Jorge', '123', 'Activo', '1', 1, '', 'archivos/perfiles_usuarios/usuario_2_8eb113b2f1feb120.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `cod_vehiculo` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `chapa` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_localFK` int(11) NOT NULL,
  `url` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendedor`
--

CREATE TABLE `vendedor` (
  `idvendedor` int(11) NOT NULL,
  `nombre` varchar(75) DEFAULT NULL,
  `nrotelef` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_localfk` varchar(15) NOT NULL,
  `sector` varchar(100) NOT NULL,
  `url` varchar(150) NOT NULL,
  `control_vendedor` tinyint(1) DEFAULT 0,
  `cod_usuarioFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `cod_venta` int(11) NOT NULL,
  `fecha_venta` date NOT NULL,
  `total_venta` double NOT NULL,
  `cod_usuarioFK` int(11) NOT NULL,
  `cod_clienteFK` int(11) NOT NULL,
  `tipo_comprobante` varchar(15) NOT NULL,
  `puntoexpedicion` varchar(45) DEFAULT NULL,
  `num_factura` varchar(20) DEFAULT NULL,
  `pago` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cod_cobradorFK` int(11) NOT NULL,
  `TipoVenta` varchar(45) DEFAULT NULL,
  `TipoPago` varchar(45) DEFAULT NULL,
  `Vendedor1` varchar(55) DEFAULT NULL,
  `Vendedor2` varchar(55) DEFAULT NULL,
  `comision` double NOT NULL DEFAULT 10,
  `cod_local` int(11) NOT NULL DEFAULT 1,
  `idGaranteFk` varchar(15) NOT NULL,
  `codnrofactura` varchar(45) DEFAULT NULL,
  `cod_user_insert` varchar(45) DEFAULT NULL,
  `cod_user_edit` varchar(45) DEFAULT NULL,
  `fecha_insert` datetime DEFAULT NULL,
  `fecha_edit` datetime DEFAULT NULL,
  `entrega` int(11) DEFAULT NULL,
  `codSolicitudCreditoFK` int(11) NOT NULL,
  `anulado` varchar(45) DEFAULT NULL,
  `codmoracliente` int(11) DEFAULT NULL,
  `plazocuota` varchar(45) DEFAULT NULL,
  `iniciopago` varchar(45) DEFAULT NULL,
  `cuenta` varchar(45) NOT NULL,
  `estadorefinanciado` varchar(45) NOT NULL,
  `entrega_cobradorFK` int(11) DEFAULT NULL,
  `estado_entrega` varchar(45) DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Estructura de tabla para la tabla `ventaseliminadas`
--

CREATE TABLE `ventaseliminadas` (
  `idventaseliminadas` int(11) NOT NULL,
  `nrofactura` varchar(45) DEFAULT NULL,
  `motivo` varchar(200) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `detalles` varchar(500) DEFAULT NULL,
  `cod_user_insert` varchar(45) DEFAULT NULL,
  `cod_user_edit` varchar(45) DEFAULT NULL,
  `fecha_insert` datetime DEFAULT NULL,
  `fecha_edit` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas`
--

CREATE TABLE `visitas` (
  `idvisitas` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cod_venta` int(11) NOT NULL,
  `cod_cobrador` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitascliente`
--

CREATE TABLE `visitascliente` (
  `cod_VisitasCliente` int(11) NOT NULL,
  `fecha` timestamp NULL DEFAULT current_timestamp(),
  `Motivo` varchar(150) DEFAULT NULL,
  `cod_clienteFK` int(11) NOT NULL,
  `cod_cobradorFK` int(11) NOT NULL,
  `fechaCompro` date NOT NULL,
  `estado` varchar(45) DEFAULT 'Activo',
  `lat` int(11) DEFAULT NULL,
  `lot` int(11) DEFAULT NULL,
  `cod_iddetalle_callcenter` int(11) DEFAULT NULL,
  `segundaestado` varchar(45) DEFAULT NULL,
  `visitado` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zona`
--

CREATE TABLE `zona` (
  `idzona` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `estado` varchar(15) NOT NULL DEFAULT 'Activo',
  `cod_cobradorFK` varchar(75) NOT NULL,
  `encargado` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `zona`
--

INSERT INTO `zona` (`idzona`, `nombre`, `estado`, `cod_cobradorFK`, `encargado`) VALUES
(1, 'ZONA MIGRACION', 'Activo', '2', 'Jorge');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesosuser`
--
ALTER TABLE `accesosuser`
  ADD PRIMARY KEY (`idaccesosUser`),
  ADD KEY `fk_accesosuser_usuario1_idx` (`usuarios_idusario`);

--
-- Indices de la tabla `accesos_directos_usuario`
--
ALTER TABLE `accesos_directos_usuario`
  ADD PRIMARY KEY (`cod_usuario`,`clave_acceso`),
  ADD KEY `idx_accesos_directos_usuario_orden` (`cod_usuario`,`orden`);

--
-- Indices de la tabla `actividad_callcenter`
--
ALTER TABLE `actividad_callcenter`
  ADD PRIMARY KEY (`idactividad_callcenter`);

--
-- Indices de la tabla `actividad_callcenter_ventas`
--
ALTER TABLE `actividad_callcenter_ventas`
  ADD PRIMARY KEY (`idactividad_callcenter_ventas`);

--
-- Indices de la tabla `admin_local`
--
ALTER TABLE `admin_local`
  ADD PRIMARY KEY (`idadmin_local`);

--
-- Indices de la tabla `agenda_callcenterventas`
--
ALTER TABLE `agenda_callcenterventas`
  ADD PRIMARY KEY (`idagenda_callcenterventas`),
  ADD KEY `fk_agenda_callcenterventas_detalle_callcenterventas1_idx` (`iddetalle_callcenterventasFK`);

--
-- Indices de la tabla `agenda_personal`
--
ALTER TABLE `agenda_personal`
  ADD PRIMARY KEY (`idagenda_personal`);

--
-- Indices de la tabla `aperturacajaapp`
--
ALTER TABLE `aperturacajaapp`
  ADD PRIMARY KEY (`idaperturacajaapp`),
  ADD KEY `fk_aperturacajaapp_cobrador1_idx` (`cod_cobrador`);

--
-- Indices de la tabla `archivos_cliente`
--
ALTER TABLE `archivos_cliente`
  ADD PRIMARY KEY (`idarchivos_cliente`);

--
-- Indices de la tabla `archivos_funcionario`
--
ALTER TABLE `archivos_funcionario`
  ADD PRIMARY KEY (`idarchivos_funcionario`);

--
-- Indices de la tabla `archivos_general`
--
ALTER TABLE `archivos_general`
  ADD PRIMARY KEY (`idarchivos_general`);

--
-- Indices de la tabla `archivos_listacontroldeposito`
--
ALTER TABLE `archivos_listacontroldeposito`
  ADD PRIMARY KEY (`idarchivos_listacontroldeposito`),
  ADD KEY `fk_archivos_listacontroldeposito_lista_controldeposito1_idx` (`idlista_controldepositoFK`);

--
-- Indices de la tabla `archivos_pedido_proveedor`
--
ALTER TABLE `archivos_pedido_proveedor`
  ADD PRIMARY KEY (`idarchivos_pedido_proveedor`);

--
-- Indices de la tabla `arqueocaja`
--
ALTER TABLE `arqueocaja`
  ADD PRIMARY KEY (`idarqueocaja`),
  ADD KEY `fk_arqueocaja_local1_idx` (`cod_local`),
  ADD KEY `fk_arqueocaja_caja1_idx` (`caja_idcaja`);

--
-- Indices de la tabla `auditoriaproducto`
--
ALTER TABLE `auditoriaproducto`
  ADD PRIMARY KEY (`idauditoriaProducto`);

--
-- Indices de la tabla `auditoria_productos`
--
ALTER TABLE `auditoria_productos`
  ADD PRIMARY KEY (`idauditoria_productos`);

--
-- Indices de la tabla `auditoria_stock_locales`
--
ALTER TABLE `auditoria_stock_locales`
  ADD PRIMARY KEY (`idauditoria_stock_locales`);

--
-- Indices de la tabla `balance_general`
--
ALTER TABLE `balance_general`
  ADD PRIMARY KEY (`cod_balance_general`);

--
-- Indices de la tabla `banco`
--
ALTER TABLE `banco`
  ADD PRIMARY KEY (`idbanco`);

--
-- Indices de la tabla `banco_liquidez`
--
ALTER TABLE `banco_liquidez`
  ADD PRIMARY KEY (`idbanco_liquidez`);

--
-- Indices de la tabla `caja`
--
ALTER TABLE `caja`
  ADD PRIMARY KEY (`idcaja`),
  ADD KEY `fk_caja_local1_idx` (`cod_localFK`);

--
-- Indices de la tabla `calificacion_cobrador`
--
ALTER TABLE `calificacion_cobrador`
  ADD PRIMARY KEY (`cod_calificacion_cobrador`);

--
-- Indices de la tabla `calificacion_entrega`
--
ALTER TABLE `calificacion_entrega`
  ADD PRIMARY KEY (`idcalificacion_entrega`);

--
-- Indices de la tabla `calificacion_entrega_contado`
--
ALTER TABLE `calificacion_entrega_contado`
  ADD PRIMARY KEY (`idcalificacion_entrega_contado`);

--
-- Indices de la tabla `calificacion_vendedor`
--
ALTER TABLE `calificacion_vendedor`
  ADD PRIMARY KEY (`cod_calificacion_vendedor`);

--
-- Indices de la tabla `callcenter_ventas`
--
ALTER TABLE `callcenter_ventas`
  ADD PRIMARY KEY (`idcallcenter_ventas`);

--
-- Indices de la tabla `call_center`
--
ALTER TABLE `call_center`
  ADD PRIMARY KEY (`idcall_center`);

--
-- Indices de la tabla `cambiarproducto`
--
ALTER TABLE `cambiarproducto`
  ADD PRIMARY KEY (`idcambiarproducto`),
  ADD KEY `fk_cambiarproducto_producto1_idx` (`cod_productoFK`),
  ADD KEY `fk_cambiarproducto_venta1_idx` (`cod_ventaFK`),
  ADD KEY `fk_cambiarproducto_usuario1_idx` (`cod_usuarioFK`);

--
-- Indices de la tabla `cambios`
--
ALTER TABLE `cambios`
  ADD PRIMARY KEY (`idcambios`),
  ADD KEY `fk_cambios_producto1_idx` (`cod_producto`),
  ADD KEY `fk_cambios_detalle_venta1_idx` (`coddetalleventa`),
  ADD KEY `fk_cambios_venta1_idx` (`cod_venta`);

--
-- Indices de la tabla `cancelaciones`
--
ALTER TABLE `cancelaciones`
  ADD PRIMARY KEY (`idcancelaciones`),
  ADD KEY `fk_cancelaciones_venta1_idx` (`cod_venta`);

--
-- Indices de la tabla `cargar_calificacion_cobrador`
--
ALTER TABLE `cargar_calificacion_cobrador`
  ADD PRIMARY KEY (`cod_cargar_calificacion_cobrador`);

--
-- Indices de la tabla `cargar_calificacion_vendedor`
--
ALTER TABLE `cargar_calificacion_vendedor`
  ADD PRIMARY KEY (`cod_cargar_calificacion_vendedor`);

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`idcargos`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`cod_categoria`);

--
-- Indices de la tabla `categoriagasto`
--
ALTER TABLE `categoriagasto`
  ADD PRIMARY KEY (`cod_categoriaGasto`);

--
-- Indices de la tabla `categoria_lista_precio`
--
ALTER TABLE `categoria_lista_precio`
  ADD PRIMARY KEY (`idcategoria_lista_precio`),
  ADD KEY `fk_categoria_lista_precio_lista_precio_producto1_idx` (`cod_lista_precio_productoFK`),
  ADD KEY `fk_categoria_lista_precio_categoria1_idx` (`cod_categoriaFK`);

--
-- Indices de la tabla `cheque`
--
ALTER TABLE `cheque`
  ADD PRIMARY KEY (`idcheque`);

--
-- Indices de la tabla `chequeacobrar`
--
ALTER TABLE `chequeacobrar`
  ADD PRIMARY KEY (`idchequeacobrar`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`cod_cliente`),
  ADD KEY `fk_cliente_zona1_idx` (`idzonaFk`),
  ADD KEY `idx_cliente_tipo_persona_equifax` (`tipo_persona_equifax`);

--
-- Indices de la tabla `clientes_trabajados`
--
ALTER TABLE `clientes_trabajados`
  ADD PRIMARY KEY (`idclientes_trabajados`);

--
-- Indices de la tabla `cobrador`
--
ALTER TABLE `cobrador`
  ADD PRIMARY KEY (`cod_cobrador`),
  ADD KEY `fk_cobrador_zona1_idx` (`idzona`),
  ADD KEY `fk_cobrador_persona1_idx` (`cod_cobrador`);

--
-- Indices de la tabla `cobradorusuario`
--
ALTER TABLE `cobradorusuario`
  ADD PRIMARY KEY (`idCobradorUsuario`),
  ADD KEY `fk_CobradorUsuario_usuario1_idx` (`cod_usuarioFk`),
  ADD KEY `fk_CobradorUsuario_cobrador1_idx` (`cod_cobradorFk`);

--
-- Indices de la tabla `combo_producto`
--
ALTER TABLE `combo_producto`
  ADD PRIMARY KEY (`idcombo_producto`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`cod_compra`),
  ADD KEY `cod_proveedorFK_idx` (`cod_proveedorFK`),
  ADD KEY `fk_compra_local1_idx` (`cod_local`);

--
-- Indices de la tabla `concepto_cheque`
--
ALTER TABLE `concepto_cheque`
  ADD PRIMARY KEY (`idconcepto_cheque`);

--
-- Indices de la tabla `concepto_chequeacobrar`
--
ALTER TABLE `concepto_chequeacobrar`
  ADD PRIMARY KEY (`idconcepto_chequeacobrar`);

--
-- Indices de la tabla `controlcobrador`
--
ALTER TABLE `controlcobrador`
  ADD PRIMARY KEY (`cod_controlcobrador`);

--
-- Indices de la tabla `credito`
--
ALTER TABLE `credito`
  ADD PRIMARY KEY (`idcredito`),
  ADD KEY `fk_credito_venta1_idx` (`cod_venta`),
  ADD KEY `idx_credito_venta_fecha_id` (`cod_venta`,`fechapago`,`idcredito`);

--
-- Indices de la tabla `cuentas_funcionario`
--
ALTER TABLE `cuentas_funcionario`
  ADD PRIMARY KEY (`cod_cuentas_funcionario`),
  ADD KEY `fk_cuentas_funcionario_funcionarios1_idx` (`cod_funcionarios`);

--
-- Indices de la tabla `datos_empresa`
--
ALTER TABLE `datos_empresa`
  ADD PRIMARY KEY (`iddatos_empresa`);

--
-- Indices de la tabla `debaja`
--
ALTER TABLE `debaja`
  ADD PRIMARY KEY (`iddebaja`),
  ADD KEY `fk_debaja_producto1_idx` (`Cod_productoFK`),
  ADD KEY `fk_debaja_usuario1_idx` (`Cod_usuarioFK`);

--
-- Indices de la tabla `descripcionventa`
--
ALTER TABLE `descripcionventa`
  ADD PRIMARY KEY (`cod_descripcionventa`),
  ADD KEY `fk_descripcionventa_detalle_venta1_idx` (`cod_detalleFK`);

--
-- Indices de la tabla `descripcion_archivo`
--
ALTER TABLE `descripcion_archivo`
  ADD PRIMARY KEY (`iddescripcion_archivo`);

--
-- Indices de la tabla `descripcion_archivo_funcionario`
--
ALTER TABLE `descripcion_archivo_funcionario`
  ADD PRIMARY KEY (`iddescripcion_archivo_funcionario`);

--
-- Indices de la tabla `descripcion_archivo_pedido_proveedor`
--
ALTER TABLE `descripcion_archivo_pedido_proveedor`
  ADD PRIMARY KEY (`iddescripcion_archivo_pedido_proveedor`);

--
-- Indices de la tabla `descripcion_arreglo_gasto`
--
ALTER TABLE `descripcion_arreglo_gasto`
  ADD PRIMARY KEY (`cod_descripcion_arreglo_gasto`);

--
-- Indices de la tabla `descripcion_arreglo_gasto_administrativo`
--
ALTER TABLE `descripcion_arreglo_gasto_administrativo`
  ADD PRIMARY KEY (`cod_descripcion_arreglo_gasto_administrativo`);

--
-- Indices de la tabla `descripcion_arreglo_gasto_juan`
--
ALTER TABLE `descripcion_arreglo_gasto_juan`
  ADD PRIMARY KEY (`cod_descripcion_arreglo_gasto_juan`);

--
-- Indices de la tabla `descripcion_banco_gasto_administrativo`
--
ALTER TABLE `descripcion_banco_gasto_administrativo`
  ADD PRIMARY KEY (`cod_descripcion_banco_gasto_administrativo`);

--
-- Indices de la tabla `descripcion_banco_gasto_juan`
--
ALTER TABLE `descripcion_banco_gasto_juan`
  ADD PRIMARY KEY (`cod_descripcion_banco_gasto_juan`);

--
-- Indices de la tabla `descripcion_carga_archivo`
--
ALTER TABLE `descripcion_carga_archivo`
  ADD PRIMARY KEY (`cod_descripcion_carga_archivo`);

--
-- Indices de la tabla `descripcion_estado_cumple`
--
ALTER TABLE `descripcion_estado_cumple`
  ADD PRIMARY KEY (`cod_descripcion_estado_cumple`);

--
-- Indices de la tabla `descripcion_foto`
--
ALTER TABLE `descripcion_foto`
  ADD PRIMARY KEY (`iddescripcion_foto`);

--
-- Indices de la tabla `descripcion_foto_calificacion_entrega`
--
ALTER TABLE `descripcion_foto_calificacion_entrega`
  ADD PRIMARY KEY (`iddescripcion_foto_calificacion_entrega`);

--
-- Indices de la tabla `descripcion_local_gasto_administrativo`
--
ALTER TABLE `descripcion_local_gasto_administrativo`
  ADD PRIMARY KEY (`cod_descripcion_local_gasto_administrativo`);

--
-- Indices de la tabla `descripcion_local_gasto_juan`
--
ALTER TABLE `descripcion_local_gasto_juan`
  ADD PRIMARY KEY (`cod_descripcion_local_gasto_juan`);

--
-- Indices de la tabla `descripcion_tipo_agenda_personal`
--
ALTER TABLE `descripcion_tipo_agenda_personal`
  ADD PRIMARY KEY (`iddescripcion_tipo_agenda_personal`);

--
-- Indices de la tabla `descripcion_tipo_movimiento`
--
ALTER TABLE `descripcion_tipo_movimiento`
  ADD PRIMARY KEY (`cod_descripcion_tipo_movimiento`);

--
-- Indices de la tabla `descripcion_ubicacion`
--
ALTER TABLE `descripcion_ubicacion`
  ADD PRIMARY KEY (`iddescripcion_ubicacion`);

--
-- Indices de la tabla `detalleentregador_local`
--
ALTER TABLE `detalleentregador_local`
  ADD PRIMARY KEY (`iddetalleentregador_local`),
  ADD KEY `fk_detalleentregador_local_cobrador1_idx` (`cod_cobradorFK`),
  ADD KEY `fk_detalleentregador_local_local1_idx` (`cod_localFK`);

--
-- Indices de la tabla `detallescambio`
--
ALTER TABLE `detallescambio`
  ADD PRIMARY KEY (`iddetallescambio`),
  ADD KEY `fk_detallescambio_cambiarproducto1_idx` (`idcambiarproductoFK`),
  ADD KEY `fk_detallescambio_producto1_idx` (`cod_productoFK`);

--
-- Indices de la tabla `detallesniveles`
--
ALTER TABLE `detallesniveles`
  ADD PRIMARY KEY (`iddetallesniveles`),
  ADD KEY `fk_detallesniveles_listadodeacceso1_idx` (`idlistadodeacceso`),
  ADD KEY `fk_detallesniveles_listado_niveles1_idx` (`cod_nivelesfk`);

--
-- Indices de la tabla `detallesolicitud`
--
ALTER TABLE `detallesolicitud`
  ADD PRIMARY KEY (`iddetallesolicitud`);

--
-- Indices de la tabla `detallesprecio`
--
ALTER TABLE `detallesprecio`
  ADD PRIMARY KEY (`iddetallesprecio`),
  ADD KEY `fk_detallesprecio_producto1_idx` (`cod_producto`);

--
-- Indices de la tabla `detallesventaeliminado`
--
ALTER TABLE `detallesventaeliminado`
  ADD PRIMARY KEY (`iddetallesventaeliminado`),
  ADD KEY `fk_detallesventaeliminado_producto1_idx` (`cod_producto`);

--
-- Indices de la tabla `detalles_entrega`
--
ALTER TABLE `detalles_entrega`
  ADD PRIMARY KEY (`iddetalles_entrega`),
  ADD KEY `fk_detalles_entrega_venta1_idx` (`cod_ventaFK`),
  ADD KEY `fk_detalles_entrega_documentos1_idx` (`iddocumentosFK`);

--
-- Indices de la tabla `detalles_entrega_cliente`
--
ALTER TABLE `detalles_entrega_cliente`
  ADD PRIMARY KEY (`iddetalles_entrega_cliente`),
  ADD KEY `fk_detalles_entrega_venta1_idx` (`cod_ventaFK`),
  ADD KEY `fk_detalles_entrega_cliente_documentos_cliente1_idx` (`iddocumentos_clienteFK`);

--
-- Indices de la tabla `detalles_informconf`
--
ALTER TABLE `detalles_informconf`
  ADD PRIMARY KEY (`iddetalles_informconf`);

--
-- Indices de la tabla `detallevendedor`
--
ALTER TABLE `detallevendedor`
  ADD PRIMARY KEY (`iddetallevendedor`),
  ADD KEY `fk_detallevendedor_local1_idx` (`cod_localFK`),
  ADD KEY `fk_detallevendedor_vendedor1_idx` (`cod_vendedorFK`);

--
-- Indices de la tabla `detalle_admin_local`
--
ALTER TABLE `detalle_admin_local`
  ADD PRIMARY KEY (`iddetalle_admin_local`),
  ADD KEY `fk_detalle_admin_local_admin_local1_idx` (`idadmin_localFK`),
  ADD KEY `fk_detalle_admin_local_local1_idx` (`cod_localFK`);

--
-- Indices de la tabla `detalle_callcenter`
--
ALTER TABLE `detalle_callcenter`
  ADD PRIMARY KEY (`iddetalle_callcenter`);

--
-- Indices de la tabla `detalle_callcenterventas`
--
ALTER TABLE `detalle_callcenterventas`
  ADD PRIMARY KEY (`iddetalle_callcenterventas`),
  ADD KEY `fk_detalle_callcenterventas_callcenter_ventas1_idx` (`idcallcenter_ventasFK`);

--
-- Indices de la tabla `detalle_cliente_cumple`
--
ALTER TABLE `detalle_cliente_cumple`
  ADD PRIMARY KEY (`iddetalle_cliente_cumple`);

--
-- Indices de la tabla `detalle_combo_producto`
--
ALTER TABLE `detalle_combo_producto`
  ADD PRIMARY KEY (`iddetalle_combo_producto`);

--
-- Indices de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`cod_detalle_compra`,`cod_compraFK`),
  ADD KEY `cod_productoFK_idx` (`cod_productoFK`),
  ADD KEY `cod_compraFK_idx` (`cod_compraFK`);

--
-- Indices de la tabla `detalle_descuento`
--
ALTER TABLE `detalle_descuento`
  ADD PRIMARY KEY (`iddetalle_descuento`);

--
-- Indices de la tabla `detalle_listado_precio`
--
ALTER TABLE `detalle_listado_precio`
  ADD PRIMARY KEY (`cod_detalle_listado_precio`),
  ADD KEY `fk_detalle_listado_precio_lista_precio_producto1_idx` (`cod_lista_precio_productoFK`);

--
-- Indices de la tabla `detalle_listado_precio_producto`
--
ALTER TABLE `detalle_listado_precio_producto`
  ADD PRIMARY KEY (`cod_detalle_listado_precio_producto`);

--
-- Indices de la tabla `detalle_pago_cheque`
--
ALTER TABLE `detalle_pago_cheque`
  ADD PRIMARY KEY (`iddetalle_pago_cheque`),
  ADD KEY `fk_detalle_compra_cheque_cheque1_idx` (`idchequeFK`),
  ADD KEY `fk_detalle_compra_cheque_compra1_idx` (`cod_compraFK`),
  ADD KEY `fk_detalle_compra_cheque_proveedor1_idx` (`cod_proveedorFK`);

--
-- Indices de la tabla `detalle_pago_compra`
--
ALTER TABLE `detalle_pago_compra`
  ADD PRIMARY KEY (`iddetalle_pago_compra`);

--
-- Indices de la tabla `detalle_tarea_cobrador`
--
ALTER TABLE `detalle_tarea_cobrador`
  ADD PRIMARY KEY (`cod_detalle_tarea_cobrador`),
  ADD KEY `fk_detalle_tarea_cobrador_controlcobrador1_idx` (`cod_controlcobradorFK`),
  ADD KEY `fk_detalle_tarea_cobrador_credito1_idx` (`cod_creditoFK`);

--
-- Indices de la tabla `detalle_vehiculo`
--
ALTER TABLE `detalle_vehiculo`
  ADD PRIMARY KEY (`iddetalle_vehiculo`),
  ADD KEY `fk_detalle_vehiculo_vehiculo1_idx` (`cod_vehiculoFK`),
  ADD KEY `fk_detalle_vehiculo_tipo_detalle_vehiculo1_idx` (`cod_tipo_detalle_vehiculoFK`);

--
-- Indices de la tabla `detalle_vendedor_usuario`
--
ALTER TABLE `detalle_vendedor_usuario`
  ADD PRIMARY KEY (`iddetalle_vendedor_usuario`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`cod_detalle`),
  ADD KEY `detalle_productoFK_idx` (`cod_productoFK`),
  ADD KEY `detalle_ventaFK_idx` (`cod_ventaFK`),
  ADD KEY `idx_detalle_venta_venta_estado` (`cod_ventaFK`,`estado`);

--
-- Indices de la tabla `dispositivos`
--
ALTER TABLE `dispositivos`
  ADD PRIMARY KEY (`iddispositivos`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`iddocumentos`);

--
-- Indices de la tabla `documentos_cliente`
--
ALTER TABLE `documentos_cliente`
  ADD PRIMARY KEY (`iddocumentos_cliente`);

--
-- Indices de la tabla `entregacobrador`
--
ALTER TABLE `entregacobrador`
  ADD PRIMARY KEY (`cod_EntregaCobrador`),
  ADD KEY `fk_EntregaCobrador_usuario1_idx` (`cod_usuarioFK`),
  ADD KEY `fk_EntregaCobrador_cobrador1_idx` (`cod_cobradorFK`),
  ADD KEY `fk_EntregaCobrador_local1_idx` (`cod_localFK`);

--
-- Indices de la tabla `especificaciones`
--
ALTER TABLE `especificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estados_clientes_trabajados`
--
ALTER TABLE `estados_clientes_trabajados`
  ADD PRIMARY KEY (`idestados_clientes_trabajados`);

--
-- Indices de la tabla `estados_cliente_callcenter`
--
ALTER TABLE `estados_cliente_callcenter`
  ADD PRIMARY KEY (`idestados_cliente_callcenter`);

--
-- Indices de la tabla `estados_cliente_callcenter_venta`
--
ALTER TABLE `estados_cliente_callcenter_venta`
  ADD PRIMARY KEY (`idestados_cliente_callcenter_venta`);

--
-- Indices de la tabla `estado_diferencia`
--
ALTER TABLE `estado_diferencia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fotos_calificacion_entrega`
--
ALTER TABLE `fotos_calificacion_entrega`
  ADD PRIMARY KEY (`idfotos_calificacion_entrega`);

--
-- Indices de la tabla `fotos_calificacion_entrega_contado`
--
ALTER TABLE `fotos_calificacion_entrega_contado`
  ADD PRIMARY KEY (`idfotos_calificacion_entrega_contado`);

--
-- Indices de la tabla `fotos_cliente`
--
ALTER TABLE `fotos_cliente`
  ADD PRIMARY KEY (`idfotos_cliente`);

--
-- Indices de la tabla `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`idfuncionarios`),
  ADD KEY `fk_funcionarios_cargos1_idx` (`cod_cargosFK`);

--
-- Indices de la tabla `garantia`
--
ALTER TABLE `garantia`
  ADD PRIMARY KEY (`Cod_Garantia`),
  ADD KEY `fk_Garantia_detalle_venta1_idx` (`cod_detalleFK`);

--
-- Indices de la tabla `garantias`
--
ALTER TABLE `garantias`
  ADD PRIMARY KEY (`idgarantia`),
  ADD KEY `fk_garantia_producto1_idx` (`cod_productoFK`),
  ADD KEY `fk_garantia_venta1_idx` (`cod_ventaFK`);

--
-- Indices de la tabla `garantias_producto`
--
ALTER TABLE `garantias_producto`
  ADD PRIMARY KEY (`idgarantiaproducto`),
  ADD KEY `fk_garantias_producto_producto1_idx` (`cod_productoFK`);

--
-- Indices de la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`idgastos`),
  ADD KEY `fk_gastos_usuario1_idx` (`cod_usuario`),
  ADD KEY `fk_gastos_local1_idx` (`cod_local`),
  ADD KEY `fk_gastos_categoriaGasto1_idx` (`cod_categoriaGastoFK`);

--
-- Indices de la tabla `gastos_administrativo`
--
ALTER TABLE `gastos_administrativo`
  ADD PRIMARY KEY (`idgastos_administrativo`),
  ADD KEY `fk_gastos_administrativo_usuario1_idx` (`cod_usuario`);

--
-- Indices de la tabla `gastos_cobrador`
--
ALTER TABLE `gastos_cobrador`
  ADD PRIMARY KEY (`idgastos_cobrador`),
  ADD KEY `fk_gastos_cobrador_cobrador1_idx` (`cod_cobradorFK`);

--
-- Indices de la tabla `gastos_fijos_empresa`
--
ALTER TABLE `gastos_fijos_empresa`
  ADD PRIMARY KEY (`idgasto_fijo_empresa`);

--
-- Indices de la tabla `gastos_juan`
--
ALTER TABLE `gastos_juan`
  ADD PRIMARY KEY (`idgastos_juan`),
  ADD KEY `fk_gastos_juan_usuario1_idx` (`cod_usuario`);

--
-- Indices de la tabla `historialactualizacion`
--
ALTER TABLE `historialactualizacion`
  ADD PRIMARY KEY (`idhistorialactualizacion`);

--
-- Indices de la tabla `historialactualizacionmobile`
--
ALTER TABLE `historialactualizacionmobile`
  ADD PRIMARY KEY (`idhistorialactualizacionmobile`);

--
-- Indices de la tabla `historialdescargabd`
--
ALTER TABLE `historialdescargabd`
  ADD PRIMARY KEY (`idhistorialdescargabd`);

--
-- Indices de la tabla `historialdespacho`
--
ALTER TABLE `historialdespacho`
  ADD PRIMARY KEY (`idhistorialdespacho`),
  ADD KEY `fk_historialdespacho_producto1_idx` (`cod_producto_fk`),
  ADD KEY `fk_historialdespacho_usuario1_idx` (`cod_usuario_fk`);

--
-- Indices de la tabla `historialsalidadeposito`
--
ALTER TABLE `historialsalidadeposito`
  ADD PRIMARY KEY (`idhistorialsalidadeposito`);

--
-- Indices de la tabla `imprimir`
--
ALTER TABLE `imprimir`
  ADD PRIMARY KEY (`cod_imprimir`);

--
-- Indices de la tabla `impuesto`
--
ALTER TABLE `impuesto`
  ADD PRIMARY KEY (`cod_Impuesto`);

--
-- Indices de la tabla `informconf`
--
ALTER TABLE `informconf`
  ADD PRIMARY KEY (`idinformconf`);

--
-- Indices de la tabla `interesespagados`
--
ALTER TABLE `interesespagados`
  ADD PRIMARY KEY (`idinteresespagados`),
  ADD KEY `fk_interesespagados_credito1_idx` (`idcredito`);

--
-- Indices de la tabla `kilometraje`
--
ALTER TABLE `kilometraje`
  ADD PRIMARY KEY (`idkilometraje`),
  ADD KEY `fk_kilometraje_vehiculo1_idx` (`cod_vehiculoFK`);

--
-- Indices de la tabla `liquidez`
--
ALTER TABLE `liquidez`
  ADD PRIMARY KEY (`idliquidez`);

--
-- Indices de la tabla `listado`
--
ALTER TABLE `listado`
  ADD PRIMARY KEY (`idlistado`);

--
-- Indices de la tabla `listadodeacceso`
--
ALTER TABLE `listadodeacceso`
  ADD PRIMARY KEY (`idlistadodeacceso`);

--
-- Indices de la tabla `listado_niveles`
--
ALTER TABLE `listado_niveles`
  ADD PRIMARY KEY (`cod_niveles`);

--
-- Indices de la tabla `listapreciocategoria`
--
ALTER TABLE `listapreciocategoria`
  ADD PRIMARY KEY (`idlistapreciocategoria`),
  ADD KEY `fk_listaprecio_categoria1_idx` (`cod_categoriaFK`);

--
-- Indices de la tabla `lista_controldeposito`
--
ALTER TABLE `lista_controldeposito`
  ADD PRIMARY KEY (`idlista_controldeposito`);

--
-- Indices de la tabla `lista_precio_producto`
--
ALTER TABLE `lista_precio_producto`
  ADD PRIMARY KEY (`cod_lista_precio_producto`);

--
-- Indices de la tabla `local`
--
ALTER TABLE `local`
  ADD PRIMARY KEY (`cod_local`);

--
-- Indices de la tabla `local_lista_precio`
--
ALTER TABLE `local_lista_precio`
  ADD PRIMARY KEY (`cod_local_lista_precio`),
  ADD KEY `fk_local_lista_precio_lista_precio_producto1_idx` (`cod_lista_precio_productoFK`),
  ADD KEY `fk_local_lista_precio_local1_idx` (`cod_localFK`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`cod_marcas`);

--
-- Indices de la tabla `mensajesenviados`
--
ALTER TABLE `mensajesenviados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `metas`
--
ALTER TABLE `metas`
  ADD PRIMARY KEY (`idMetas`),
  ADD KEY `fk_metas_vendedor1_idx` (`cod_vendedorFK`);

--
-- Indices de la tabla `metas_salario`
--
ALTER TABLE `metas_salario`
  ADD PRIMARY KEY (`idmetas_salario`),
  ADD KEY `fk_metas_salario_cargos1_idx` (`cod_cargosFK`);

--
-- Indices de la tabla `metas_venta`
--
ALTER TABLE `metas_venta`
  ADD PRIMARY KEY (`cod_metas_venta`);

--
-- Indices de la tabla `meta_cobrador`
--
ALTER TABLE `meta_cobrador`
  ADD PRIMARY KEY (`cod_meta_cobrador`),
  ADD KEY `fk_meta_cobrador_cobrador1_idx` (`cod_cobradorFK`);

--
-- Indices de la tabla `migracion_casamario_cliente`
--
ALTER TABLE `migracion_casamario_cliente`
  ADD PRIMARY KEY (`source_person_id`),
  ADD UNIQUE KEY `uq_target_cliente` (`target_cliente_id`);

--
-- Indices de la tabla `migracion_casamario_credito`
--
ALTER TABLE `migracion_casamario_credito`
  ADD PRIMARY KEY (`source_payment_id`),
  ADD UNIQUE KEY `uq_target_credito` (`target_credito_id`);

--
-- Indices de la tabla `migracion_casamario_producto`
--
ALTER TABLE `migracion_casamario_producto`
  ADD PRIMARY KEY (`source_item_id`),
  ADD UNIQUE KEY `uq_target_producto` (`target_producto_id`);

--
-- Indices de la tabla `migracion_casamario_venta`
--
ALTER TABLE `migracion_casamario_venta`
  ADD PRIMARY KEY (`source_sale_id`),
  ADD UNIQUE KEY `uq_target_venta` (`target_venta_id`);

--
-- Indices de la tabla `migrarcliente`
--
ALTER TABLE `migrarcliente`
  ADD PRIMARY KEY (`idmigrarcliente`);

--
-- Indices de la tabla `migrardeudas`
--
ALTER TABLE `migrardeudas`
  ADD PRIMARY KEY (`iddeudas`);

--
-- Indices de la tabla `migrarpagos`
--
ALTER TABLE `migrarpagos`
  ADD PRIMARY KEY (`idmigrarPagos`);

--
-- Indices de la tabla `migrarpagos2`
--
ALTER TABLE `migrarpagos2`
  ADD PRIMARY KEY (`idmigrarpagos2`);

--
-- Indices de la tabla `migrarproducto`
--
ALTER TABLE `migrarproducto`
  ADD PRIMARY KEY (`idmigrarproducto`);

--
-- Indices de la tabla `migrarstock`
--
ALTER TABLE `migrarstock`
  ADD PRIMARY KEY (`idmigrarstock`);

--
-- Indices de la tabla `migrarventa`
--
ALTER TABLE `migrarventa`
  ADD PRIMARY KEY (`idmigrarventa`);

--
-- Indices de la tabla `migrar_caja`
--
ALTER TABLE `migrar_caja`
  ADD PRIMARY KEY (`idmigrar_caja`);

--
-- Indices de la tabla `mora_cliente`
--
ALTER TABLE `mora_cliente`
  ADD PRIMARY KEY (`idmora_cliente`);

--
-- Indices de la tabla `motivo_e_i`
--
ALTER TABLE `motivo_e_i`
  ADD PRIMARY KEY (`idmotivo_e_i`);

--
-- Indices de la tabla `motivo_e_i_administrativo`
--
ALTER TABLE `motivo_e_i_administrativo`
  ADD PRIMARY KEY (`idmotivo_e_i_administrativo`);

--
-- Indices de la tabla `motivo_e_i_juan`
--
ALTER TABLE `motivo_e_i_juan`
  ADD PRIMARY KEY (`idmotivo_e_i_juan`);

--
-- Indices de la tabla `motivo_movimiento_stock`
--
ALTER TABLE `motivo_movimiento_stock`
  ADD PRIMARY KEY (`idmotivo_movimiento_stock`);

--
-- Indices de la tabla `movimiento_stock`
--
ALTER TABLE `movimiento_stock`
  ADD PRIMARY KEY (`idmovimiento_stock`);

--
-- Indices de la tabla `nota_credito`
--
ALTER TABLE `nota_credito`
  ADD PRIMARY KEY (`idnota_credito`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`cod_notificaciones`);

--
-- Indices de la tabla `nrofactura`
--
ALTER TABLE `nrofactura`
  ADD PRIMARY KEY (`Cod_Nro`),
  ADD KEY `fk_nroorden_local1_idx` (`cod_localfk`),
  ADD KEY `fk_nrofactura_usuario1_idx` (`cod_usuarioFk`);

--
-- Indices de la tabla `nuevos_cliente`
--
ALTER TABLE `nuevos_cliente`
  ADD PRIMARY KEY (`idnuevos_cliente`);

--
-- Indices de la tabla `observacion_calificacion_cobrador`
--
ALTER TABLE `observacion_calificacion_cobrador`
  ADD PRIMARY KEY (`idobservacion_calificacion_cobrador`);

--
-- Indices de la tabla `observacion_calificacion_vendedor`
--
ALTER TABLE `observacion_calificacion_vendedor`
  ADD PRIMARY KEY (`idobservacion_calificacion_vendedor`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`idPago`),
  ADD KEY `fk_Pago_credito1_idx` (`cod_creditoFK`),
  ADD KEY `fk_Pago_cobrador1_idx` (`cod_cobradorFK`),
  ADD KEY `fk_pago_venta1_idx` (`cod_venta_fk`),
  ADD KEY `idx_pago_credito_tipo` (`cod_creditoFK`,`Tipo`),
  ADD KEY `idx_pago_venta_tipo_fecha_id` (`cod_venta_fk`,`Tipo`,`Fecha`,`idPago`),
  ADD KEY `idx_pago_fecha_cobrador_venta` (`Fecha`,`cod_cobradorFK`,`cod_venta_fk`);

--
-- Indices de la tabla `pagosdecompra`
--
ALTER TABLE `pagosdecompra`
  ADD PRIMARY KEY (`codpago`),
  ADD KEY `fk_pagosdecompra_compra1_idx` (`cod_compraFk`);

--
-- Indices de la tabla `pagoseliminados`
--
ALTER TABLE `pagoseliminados`
  ADD PRIMARY KEY (`idpagoseliminados`),
  ADD KEY `fk_pagoseliminados_usuario1_idx` (`cod_usuario`);

--
-- Indices de la tabla `pagosproveedor`
--
ALTER TABLE `pagosproveedor`
  ADD PRIMARY KEY (`idpagosProveedor`);

--
-- Indices de la tabla `pago_total_compra`
--
ALTER TABLE `pago_total_compra`
  ADD PRIMARY KEY (`idpago_total_compra`);

--
-- Indices de la tabla `parametros_credito`
--
ALTER TABLE `parametros_credito`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `patrimonio_empresa`
--
ALTER TABLE `patrimonio_empresa`
  ADD PRIMARY KEY (`idpatrimonio_empresa`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idpedidos`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`cod_persona`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`cod_producto`),
  ADD KEY `fk_producto_local1_idx` (`cod_localFK`),
  ADD KEY `fk_producto_Categoria1_idx` (`cod_categoriaFK`),
  ADD KEY `fk_producto_Marcas1_idx` (`cod_marcasFK`),
  ADD KEY `fk_producto_Impuesto1_idx` (`cod_ImpuestoFK`);

--
-- Indices de la tabla `profesion`
--
ALTER TABLE `profesion`
  ADD PRIMARY KEY (`idprofesion`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`cod_proveedor`);

--
-- Indices de la tabla `puntos`
--
ALTER TABLE `puntos`
  ADD PRIMARY KEY (`idpuntos`);

--
-- Indices de la tabla `referenciascliente`
--
ALTER TABLE `referenciascliente`
  ADD PRIMARY KEY (`idreferenciascliente`),
  ADD KEY `fk_referenciascliente_cliente1_idx` (`cod_clienteFk`);

--
-- Indices de la tabla `referenciascomercialcliente`
--
ALTER TABLE `referenciascomercialcliente`
  ADD PRIMARY KEY (`idreferenciascomercialcliente`);

--
-- Indices de la tabla `refinanciamentos`
--
ALTER TABLE `refinanciamentos`
  ADD PRIMARY KEY (`idrefinanciamentos`),
  ADD KEY `fk_refinanciamentos_venta1_idx` (`cod_venta`),
  ADD KEY `fk_refinanciamentos_usuario1_idx` (`cod_usuario`);

--
-- Indices de la tabla `reglas_credito`
--
ALTER TABLE `reglas_credito`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reparacion_casamario_pago_original_20260824`
--
ALTER TABLE `reparacion_casamario_pago_original_20260824`
  ADD PRIMARY KEY (`idPago`),
  ADD KEY `fk_Pago_credito1_idx` (`cod_creditoFK`),
  ADD KEY `fk_Pago_cobrador1_idx` (`cod_cobradorFK`),
  ADD KEY `fk_pago_venta1_idx` (`cod_venta_fk`),
  ADD KEY `idx_pago_credito_tipo` (`cod_creditoFK`,`Tipo`),
  ADD KEY `idx_pago_venta_tipo_fecha_id` (`cod_venta_fk`,`Tipo`,`Fecha`,`idPago`),
  ADD KEY `idx_pago_fecha_cobrador_venta` (`Fecha`,`cod_cobradorFK`,`cod_venta_fk`);

--
-- Indices de la tabla `respaldo_creditos_saldo_minimo_20260824`
--
ALTER TABLE `respaldo_creditos_saldo_minimo_20260824`
  ADD PRIMARY KEY (`idcredito`);

--
-- Indices de la tabla `sector_vendedor`
--
ALTER TABLE `sector_vendedor`
  ADD PRIMARY KEY (`idsector_vendedor`);

--
-- Indices de la tabla `seguridad`
--
ALTER TABLE `seguridad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sock_locales`
--
ALTER TABLE `sock_locales`
  ADD PRIMARY KEY (`idsock_locales`),
  ADD KEY `fk_sock_locales_producto1_idx` (`cod_producto`),
  ADD KEY `fk_sock_locales_local1_idx` (`cod_local`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`idsolicitud`),
  ADD KEY `fk_solicitud_producto1_idx` (`cod_producto1`),
  ADD KEY `fk_solicitud_usuario1_idx` (`cod_persona`);

--
-- Indices de la tabla `solicitudcredito`
--
ALTER TABLE `solicitudcredito`
  ADD PRIMARY KEY (`idSolicitudCredito`);

--
-- Indices de la tabla `solicituddescuendo`
--
ALTER TABLE `solicituddescuendo`
  ADD PRIMARY KEY (`idsolicituddescuendo`);

--
-- Indices de la tabla `solicituddescuentocredito`
--
ALTER TABLE `solicituddescuentocredito`
  ADD PRIMARY KEY (`idsolicituddescuentocredito`);

--
-- Indices de la tabla `solicituddescuentointeres`
--
ALTER TABLE `solicituddescuentointeres`
  ADD PRIMARY KEY (`idsolicituddescuentointeres`);

--
-- Indices de la tabla `solicitud_anulacion`
--
ALTER TABLE `solicitud_anulacion`
  ADD PRIMARY KEY (`idsolicitud_anulacion`);

--
-- Indices de la tabla `stocklocales`
--
ALTER TABLE `stocklocales`
  ADD PRIMARY KEY (`idstocklocales`),
  ADD KEY `fk_stocklocales_producto1_idx` (`cod_productofk`),
  ADD KEY `fk_stocklocales_local1_idx` (`cod_localfk`);

--
-- Indices de la tabla `stockminimo`
--
ALTER TABLE `stockminimo`
  ADD PRIMARY KEY (`idstockminimo`);

--
-- Indices de la tabla `stock_producto`
--
ALTER TABLE `stock_producto`
  ADD PRIMARY KEY (`idstock_producto`),
  ADD KEY `cod_stocklocales_idx` (`cod_stocklocalesFK`);

--
-- Indices de la tabla `sueldo`
--
ALTER TABLE `sueldo`
  ADD PRIMARY KEY (`idsueldo`);

--
-- Indices de la tabla `tipopago`
--
ALTER TABLE `tipopago`
  ADD PRIMARY KEY (`cod_tipoPago`);

--
-- Indices de la tabla `tipo_detalle_vehiculo`
--
ALTER TABLE `tipo_detalle_vehiculo`
  ADD PRIMARY KEY (`idtipo_detalle_vehiculo`);

--
-- Indices de la tabla `totalesdeudaventa`
--
ALTER TABLE `totalesdeudaventa`
  ADD PRIMARY KEY (`idtotalesdeudaventa`),
  ADD KEY `fk_totalesdeudaventa_venta1_idx` (`cod_ventaFk`);

--
-- Indices de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD PRIMARY KEY (`idubicaciones`);

--
-- Indices de la tabla `unidadmedida`
--
ALTER TABLE `unidadmedida`
  ADD PRIMARY KEY (`cod_Unidadmedida`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`cod_usuario`),
  ADD KEY `fk_usuario_local1_idx` (`cod_localFK`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`cod_vehiculo`),
  ADD KEY `fk_vehiculo_local1_idx` (`cod_localFK`);

--
-- Indices de la tabla `vendedor`
--
ALTER TABLE `vendedor`
  ADD PRIMARY KEY (`idvendedor`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`cod_venta`),
  ADD KEY `venta_usuarioFK_idx` (`cod_usuarioFK`),
  ADD KEY `venta_clienteFK_idx` (`cod_clienteFK`),
  ADD KEY `fk_venta_cobrador1_idx` (`cod_cobradorFK`),
  ADD KEY `fk_venta_local1_idx` (`cod_local`),
  ADD KEY `idx_venta_fecha_local_tipo` (`fecha_venta`,`cod_local`,`TipoVenta`),
  ADD KEY `idx_venta_estado_entrega_fecha_cobrador` (`estado_entrega`,`fecha_entrega`,`entrega_cobradorFK`);

--
-- Indices de la tabla `ventaseliminadas`
--
ALTER TABLE `ventaseliminadas`
  ADD PRIMARY KEY (`idventaseliminadas`);

--
-- Indices de la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD PRIMARY KEY (`idvisitas`),
  ADD KEY `fk_visitas_cobrador1` (`cod_cobrador`),
  ADD KEY `fk_visitas_venta1` (`cod_venta`);

--
-- Indices de la tabla `visitascliente`
--
ALTER TABLE `visitascliente`
  ADD PRIMARY KEY (`cod_VisitasCliente`),
  ADD KEY `fk_VisitasCliente_cliente1_idx` (`cod_clienteFK`),
  ADD KEY `fk_VisitasCliente_cobrador1_idx` (`cod_cobradorFK`);

--
-- Indices de la tabla `zona`
--
ALTER TABLE `zona`
  ADD PRIMARY KEY (`idzona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accesosuser`
--
ALTER TABLE `accesosuser`
  MODIFY `idaccesosUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24996;

--
-- AUTO_INCREMENT de la tabla `actividad_callcenter`
--
ALTER TABLE `actividad_callcenter`
  MODIFY `idactividad_callcenter` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `actividad_callcenter_ventas`
--
ALTER TABLE `actividad_callcenter_ventas`
  MODIFY `idactividad_callcenter_ventas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `admin_local`
--
ALTER TABLE `admin_local`
  MODIFY `idadmin_local` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `agenda_callcenterventas`
--
ALTER TABLE `agenda_callcenterventas`
  MODIFY `idagenda_callcenterventas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `agenda_personal`
--
ALTER TABLE `agenda_personal`
  MODIFY `idagenda_personal` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `aperturacajaapp`
--
ALTER TABLE `aperturacajaapp`
  MODIFY `idaperturacajaapp` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `archivos_cliente`
--
ALTER TABLE `archivos_cliente`
  MODIFY `idarchivos_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `archivos_funcionario`
--
ALTER TABLE `archivos_funcionario`
  MODIFY `idarchivos_funcionario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `archivos_general`
--
ALTER TABLE `archivos_general`
  MODIFY `idarchivos_general` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `archivos_listacontroldeposito`
--
ALTER TABLE `archivos_listacontroldeposito`
  MODIFY `idarchivos_listacontroldeposito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `archivos_pedido_proveedor`
--
ALTER TABLE `archivos_pedido_proveedor`
  MODIFY `idarchivos_pedido_proveedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `arqueocaja`
--
ALTER TABLE `arqueocaja`
  MODIFY `idarqueocaja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `auditoriaproducto`
--
ALTER TABLE `auditoriaproducto`
  MODIFY `idauditoriaProducto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auditoria_productos`
--
ALTER TABLE `auditoria_productos`
  MODIFY `idauditoria_productos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auditoria_stock_locales`
--
ALTER TABLE `auditoria_stock_locales`
  MODIFY `idauditoria_stock_locales` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `balance_general`
--
ALTER TABLE `balance_general`
  MODIFY `cod_balance_general` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `banco`
--
ALTER TABLE `banco`
  MODIFY `idbanco` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `banco_liquidez`
--
ALTER TABLE `banco_liquidez`
  MODIFY `idbanco_liquidez` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `caja`
--
ALTER TABLE `caja`
  MODIFY `idcaja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `calificacion_cobrador`
--
ALTER TABLE `calificacion_cobrador`
  MODIFY `cod_calificacion_cobrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `calificacion_entrega`
--
ALTER TABLE `calificacion_entrega`
  MODIFY `idcalificacion_entrega` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `calificacion_entrega_contado`
--
ALTER TABLE `calificacion_entrega_contado`
  MODIFY `idcalificacion_entrega_contado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `calificacion_vendedor`
--
ALTER TABLE `calificacion_vendedor`
  MODIFY `cod_calificacion_vendedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `callcenter_ventas`
--
ALTER TABLE `callcenter_ventas`
  MODIFY `idcallcenter_ventas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `call_center`
--
ALTER TABLE `call_center`
  MODIFY `idcall_center` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cambiarproducto`
--
ALTER TABLE `cambiarproducto`
  MODIFY `idcambiarproducto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cambios`
--
ALTER TABLE `cambios`
  MODIFY `idcambios` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cancelaciones`
--
ALTER TABLE `cancelaciones`
  MODIFY `idcancelaciones` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cargar_calificacion_cobrador`
--
ALTER TABLE `cargar_calificacion_cobrador`
  MODIFY `cod_cargar_calificacion_cobrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cargar_calificacion_vendedor`
--
ALTER TABLE `cargar_calificacion_vendedor`
  MODIFY `cod_cargar_calificacion_vendedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `idcargos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `cod_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- AUTO_INCREMENT de la tabla `categoriagasto`
--
ALTER TABLE `categoriagasto`
  MODIFY `cod_categoriaGasto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria_lista_precio`
--
ALTER TABLE `categoria_lista_precio`
  MODIFY `idcategoria_lista_precio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cheque`
--
ALTER TABLE `cheque`
  MODIFY `idcheque` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `chequeacobrar`
--
ALTER TABLE `chequeacobrar`
  MODIFY `idchequeacobrar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes_trabajados`
--
ALTER TABLE `clientes_trabajados`
  MODIFY `idclientes_trabajados` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cobradorusuario`
--
ALTER TABLE `cobradorusuario`
  MODIFY `idCobradorUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `combo_producto`
--
ALTER TABLE `combo_producto`
  MODIFY `idcombo_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `cod_compra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `concepto_cheque`
--
ALTER TABLE `concepto_cheque`
  MODIFY `idconcepto_cheque` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `concepto_chequeacobrar`
--
ALTER TABLE `concepto_chequeacobrar`
  MODIFY `idconcepto_chequeacobrar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `controlcobrador`
--
ALTER TABLE `controlcobrador`
  MODIFY `cod_controlcobrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `credito`
--
ALTER TABLE `credito`
  MODIFY `idcredito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1046803;

--
-- AUTO_INCREMENT de la tabla `cuentas_funcionario`
--
ALTER TABLE `cuentas_funcionario`
  MODIFY `cod_cuentas_funcionario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `datos_empresa`
--
ALTER TABLE `datos_empresa`
  MODIFY `iddatos_empresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `debaja`
--
ALTER TABLE `debaja`
  MODIFY `iddebaja` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcionventa`
--
ALTER TABLE `descripcionventa`
  MODIFY `cod_descripcionventa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_archivo`
--
ALTER TABLE `descripcion_archivo`
  MODIFY `iddescripcion_archivo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_archivo_funcionario`
--
ALTER TABLE `descripcion_archivo_funcionario`
  MODIFY `iddescripcion_archivo_funcionario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_archivo_pedido_proveedor`
--
ALTER TABLE `descripcion_archivo_pedido_proveedor`
  MODIFY `iddescripcion_archivo_pedido_proveedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_arreglo_gasto`
--
ALTER TABLE `descripcion_arreglo_gasto`
  MODIFY `cod_descripcion_arreglo_gasto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_arreglo_gasto_administrativo`
--
ALTER TABLE `descripcion_arreglo_gasto_administrativo`
  MODIFY `cod_descripcion_arreglo_gasto_administrativo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_arreglo_gasto_juan`
--
ALTER TABLE `descripcion_arreglo_gasto_juan`
  MODIFY `cod_descripcion_arreglo_gasto_juan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_banco_gasto_administrativo`
--
ALTER TABLE `descripcion_banco_gasto_administrativo`
  MODIFY `cod_descripcion_banco_gasto_administrativo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_banco_gasto_juan`
--
ALTER TABLE `descripcion_banco_gasto_juan`
  MODIFY `cod_descripcion_banco_gasto_juan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_carga_archivo`
--
ALTER TABLE `descripcion_carga_archivo`
  MODIFY `cod_descripcion_carga_archivo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_estado_cumple`
--
ALTER TABLE `descripcion_estado_cumple`
  MODIFY `cod_descripcion_estado_cumple` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_foto`
--
ALTER TABLE `descripcion_foto`
  MODIFY `iddescripcion_foto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_foto_calificacion_entrega`
--
ALTER TABLE `descripcion_foto_calificacion_entrega`
  MODIFY `iddescripcion_foto_calificacion_entrega` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_local_gasto_administrativo`
--
ALTER TABLE `descripcion_local_gasto_administrativo`
  MODIFY `cod_descripcion_local_gasto_administrativo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_local_gasto_juan`
--
ALTER TABLE `descripcion_local_gasto_juan`
  MODIFY `cod_descripcion_local_gasto_juan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_tipo_agenda_personal`
--
ALTER TABLE `descripcion_tipo_agenda_personal`
  MODIFY `iddescripcion_tipo_agenda_personal` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_tipo_movimiento`
--
ALTER TABLE `descripcion_tipo_movimiento`
  MODIFY `cod_descripcion_tipo_movimiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descripcion_ubicacion`
--
ALTER TABLE `descripcion_ubicacion`
  MODIFY `iddescripcion_ubicacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalleentregador_local`
--
ALTER TABLE `detalleentregador_local`
  MODIFY `iddetalleentregador_local` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detallescambio`
--
ALTER TABLE `detallescambio`
  MODIFY `iddetallescambio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detallesniveles`
--
ALTER TABLE `detallesniveles`
  MODIFY `iddetallesniveles` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detallesolicitud`
--
ALTER TABLE `detallesolicitud`
  MODIFY `iddetallesolicitud` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detallesprecio`
--
ALTER TABLE `detallesprecio`
  MODIFY `iddetallesprecio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18431;

--
-- AUTO_INCREMENT de la tabla `detallesventaeliminado`
--
ALTER TABLE `detallesventaeliminado`
  MODIFY `iddetallesventaeliminado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalles_entrega`
--
ALTER TABLE `detalles_entrega`
  MODIFY `iddetalles_entrega` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalles_entrega_cliente`
--
ALTER TABLE `detalles_entrega_cliente`
  MODIFY `iddetalles_entrega_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalles_informconf`
--
ALTER TABLE `detalles_informconf`
  MODIFY `iddetalles_informconf` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detallevendedor`
--
ALTER TABLE `detallevendedor`
  MODIFY `iddetallevendedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_admin_local`
--
ALTER TABLE `detalle_admin_local`
  MODIFY `iddetalle_admin_local` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_callcenter`
--
ALTER TABLE `detalle_callcenter`
  MODIFY `iddetalle_callcenter` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_callcenterventas`
--
ALTER TABLE `detalle_callcenterventas`
  MODIFY `iddetalle_callcenterventas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_cliente_cumple`
--
ALTER TABLE `detalle_cliente_cumple`
  MODIFY `iddetalle_cliente_cumple` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_combo_producto`
--
ALTER TABLE `detalle_combo_producto`
  MODIFY `iddetalle_combo_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  MODIFY `cod_detalle_compra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_descuento`
--
ALTER TABLE `detalle_descuento`
  MODIFY `iddetalle_descuento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_listado_precio`
--
ALTER TABLE `detalle_listado_precio`
  MODIFY `cod_detalle_listado_precio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_listado_precio_producto`
--
ALTER TABLE `detalle_listado_precio_producto`
  MODIFY `cod_detalle_listado_precio_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_pago_cheque`
--
ALTER TABLE `detalle_pago_cheque`
  MODIFY `iddetalle_pago_cheque` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_pago_compra`
--
ALTER TABLE `detalle_pago_compra`
  MODIFY `iddetalle_pago_compra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_tarea_cobrador`
--
ALTER TABLE `detalle_tarea_cobrador`
  MODIFY `cod_detalle_tarea_cobrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_vehiculo`
--
ALTER TABLE `detalle_vehiculo`
  MODIFY `iddetalle_vehiculo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_vendedor_usuario`
--
ALTER TABLE `detalle_vendedor_usuario`
  MODIFY `iddetalle_vendedor_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `cod_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18002;

--
-- AUTO_INCREMENT de la tabla `dispositivos`
--
ALTER TABLE `dispositivos`
  MODIFY `iddispositivos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `iddocumentos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `documentos_cliente`
--
ALTER TABLE `documentos_cliente`
  MODIFY `iddocumentos_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `entregacobrador`
--
ALTER TABLE `entregacobrador`
  MODIFY `cod_EntregaCobrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especificaciones`
--
ALTER TABLE `especificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estados_clientes_trabajados`
--
ALTER TABLE `estados_clientes_trabajados`
  MODIFY `idestados_clientes_trabajados` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estados_cliente_callcenter`
--
ALTER TABLE `estados_cliente_callcenter`
  MODIFY `idestados_cliente_callcenter` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estados_cliente_callcenter_venta`
--
ALTER TABLE `estados_cliente_callcenter_venta`
  MODIFY `idestados_cliente_callcenter_venta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado_diferencia`
--
ALTER TABLE `estado_diferencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotos_calificacion_entrega`
--
ALTER TABLE `fotos_calificacion_entrega`
  MODIFY `idfotos_calificacion_entrega` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotos_calificacion_entrega_contado`
--
ALTER TABLE `fotos_calificacion_entrega_contado`
  MODIFY `idfotos_calificacion_entrega_contado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotos_cliente`
--
ALTER TABLE `fotos_cliente`
  MODIFY `idfotos_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `idfuncionarios` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `garantia`
--
ALTER TABLE `garantia`
  MODIFY `Cod_Garantia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `garantias`
--
ALTER TABLE `garantias`
  MODIFY `idgarantia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `garantias_producto`
--
ALTER TABLE `garantias_producto`
  MODIFY `idgarantiaproducto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `idgastos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gastos_administrativo`
--
ALTER TABLE `gastos_administrativo`
  MODIFY `idgastos_administrativo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gastos_cobrador`
--
ALTER TABLE `gastos_cobrador`
  MODIFY `idgastos_cobrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gastos_fijos_empresa`
--
ALTER TABLE `gastos_fijos_empresa`
  MODIFY `idgasto_fijo_empresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gastos_juan`
--
ALTER TABLE `gastos_juan`
  MODIFY `idgastos_juan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historialactualizacion`
--
ALTER TABLE `historialactualizacion`
  MODIFY `idhistorialactualizacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `historialactualizacionmobile`
--
ALTER TABLE `historialactualizacionmobile`
  MODIFY `idhistorialactualizacionmobile` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `historialdescargabd`
--
ALTER TABLE `historialdescargabd`
  MODIFY `idhistorialdescargabd` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historialdespacho`
--
ALTER TABLE `historialdespacho`
  MODIFY `idhistorialdespacho` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historialsalidadeposito`
--
ALTER TABLE `historialsalidadeposito`
  MODIFY `idhistorialsalidadeposito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imprimir`
--
ALTER TABLE `imprimir`
  MODIFY `cod_imprimir` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `impuesto`
--
ALTER TABLE `impuesto`
  MODIFY `cod_Impuesto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `informconf`
--
ALTER TABLE `informconf`
  MODIFY `idinformconf` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `interesespagados`
--
ALTER TABLE `interesespagados`
  MODIFY `idinteresespagados` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `kilometraje`
--
ALTER TABLE `kilometraje`
  MODIFY `idkilometraje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `liquidez`
--
ALTER TABLE `liquidez`
  MODIFY `idliquidez` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `listado`
--
ALTER TABLE `listado`
  MODIFY `idlistado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `listadodeacceso`
--
ALTER TABLE `listadodeacceso`
  MODIFY `idlistadodeacceso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=309;

--
-- AUTO_INCREMENT de la tabla `listado_niveles`
--
ALTER TABLE `listado_niveles`
  MODIFY `cod_niveles` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `listapreciocategoria`
--
ALTER TABLE `listapreciocategoria`
  MODIFY `idlistapreciocategoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lista_controldeposito`
--
ALTER TABLE `lista_controldeposito`
  MODIFY `idlista_controldeposito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lista_precio_producto`
--
ALTER TABLE `lista_precio_producto`
  MODIFY `cod_lista_precio_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `local`
--
ALTER TABLE `local`
  MODIFY `cod_local` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `local_lista_precio`
--
ALTER TABLE `local_lista_precio`
  MODIFY `cod_local_lista_precio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `cod_marcas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- AUTO_INCREMENT de la tabla `mensajesenviados`
--
ALTER TABLE `mensajesenviados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metas`
--
ALTER TABLE `metas`
  MODIFY `idMetas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metas_salario`
--
ALTER TABLE `metas_salario`
  MODIFY `idmetas_salario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metas_venta`
--
ALTER TABLE `metas_venta`
  MODIFY `cod_metas_venta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `meta_cobrador`
--
ALTER TABLE `meta_cobrador`
  MODIFY `cod_meta_cobrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrarcliente`
--
ALTER TABLE `migrarcliente`
  MODIFY `idmigrarcliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrardeudas`
--
ALTER TABLE `migrardeudas`
  MODIFY `iddeudas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrarpagos`
--
ALTER TABLE `migrarpagos`
  MODIFY `idmigrarPagos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrarpagos2`
--
ALTER TABLE `migrarpagos2`
  MODIFY `idmigrarpagos2` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrarproducto`
--
ALTER TABLE `migrarproducto`
  MODIFY `idmigrarproducto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrarstock`
--
ALTER TABLE `migrarstock`
  MODIFY `idmigrarstock` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrarventa`
--
ALTER TABLE `migrarventa`
  MODIFY `idmigrarventa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrar_caja`
--
ALTER TABLE `migrar_caja`
  MODIFY `idmigrar_caja` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mora_cliente`
--
ALTER TABLE `mora_cliente`
  MODIFY `idmora_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `motivo_e_i`
--
ALTER TABLE `motivo_e_i`
  MODIFY `idmotivo_e_i` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `motivo_e_i_administrativo`
--
ALTER TABLE `motivo_e_i_administrativo`
  MODIFY `idmotivo_e_i_administrativo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `motivo_e_i_juan`
--
ALTER TABLE `motivo_e_i_juan`
  MODIFY `idmotivo_e_i_juan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `motivo_movimiento_stock`
--
ALTER TABLE `motivo_movimiento_stock`
  MODIFY `idmotivo_movimiento_stock` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `movimiento_stock`
--
ALTER TABLE `movimiento_stock`
  MODIFY `idmovimiento_stock` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nota_credito`
--
ALTER TABLE `nota_credito`
  MODIFY `idnota_credito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `cod_notificaciones` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nrofactura`
--
ALTER TABLE `nrofactura`
  MODIFY `Cod_Nro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nuevos_cliente`
--
ALTER TABLE `nuevos_cliente`
  MODIFY `idnuevos_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `observacion_calificacion_cobrador`
--
ALTER TABLE `observacion_calificacion_cobrador`
  MODIFY `idobservacion_calificacion_cobrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `observacion_calificacion_vendedor`
--
ALTER TABLE `observacion_calificacion_vendedor`
  MODIFY `idobservacion_calificacion_vendedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `idPago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36370;

--
-- AUTO_INCREMENT de la tabla `pagosdecompra`
--
ALTER TABLE `pagosdecompra`
  MODIFY `codpago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pagoseliminados`
--
ALTER TABLE `pagoseliminados`
  MODIFY `idpagoseliminados` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pagosproveedor`
--
ALTER TABLE `pagosproveedor`
  MODIFY `idpagosProveedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pago_total_compra`
--
ALTER TABLE `pago_total_compra`
  MODIFY `idpago_total_compra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `parametros_credito`
--
ALTER TABLE `parametros_credito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `patrimonio_empresa`
--
ALTER TABLE `patrimonio_empresa`
  MODIFY `idpatrimonio_empresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `cod_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1002275;

--
-- AUTO_INCREMENT de la tabla `profesion`
--
ALTER TABLE `profesion`
  MODIFY `idprofesion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `puntos`
--
ALTER TABLE `puntos`
  MODIFY `idpuntos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `referenciascliente`
--
ALTER TABLE `referenciascliente`
  MODIFY `idreferenciascliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `referenciascomercialcliente`
--
ALTER TABLE `referenciascomercialcliente`
  MODIFY `idreferenciascomercialcliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `refinanciamentos`
--
ALTER TABLE `refinanciamentos`
  MODIFY `idrefinanciamentos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reglas_credito`
--
ALTER TABLE `reglas_credito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reparacion_casamario_pago_original_20260824`
--
ALTER TABLE `reparacion_casamario_pago_original_20260824`
  MODIFY `idPago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33216;

--
-- AUTO_INCREMENT de la tabla `sector_vendedor`
--
ALTER TABLE `sector_vendedor`
  MODIFY `idsector_vendedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `seguridad`
--
ALTER TABLE `seguridad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `sock_locales`
--
ALTER TABLE `sock_locales`
  MODIFY `idsock_locales` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `idsolicitud` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudcredito`
--
ALTER TABLE `solicitudcredito`
  MODIFY `idSolicitudCredito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicituddescuendo`
--
ALTER TABLE `solicituddescuendo`
  MODIFY `idsolicituddescuendo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicituddescuentocredito`
--
ALTER TABLE `solicituddescuentocredito`
  MODIFY `idsolicituddescuentocredito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicituddescuentointeres`
--
ALTER TABLE `solicituddescuentointeres`
  MODIFY `idsolicituddescuentointeres` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitud_anulacion`
--
ALTER TABLE `solicitud_anulacion`
  MODIFY `idsolicitud_anulacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `stocklocales`
--
ALTER TABLE `stocklocales`
  MODIFY `idstocklocales` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2049;

--
-- AUTO_INCREMENT de la tabla `stockminimo`
--
ALTER TABLE `stockminimo`
  MODIFY `idstockminimo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `stock_producto`
--
ALTER TABLE `stock_producto`
  MODIFY `idstock_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1024;

--
-- AUTO_INCREMENT de la tabla `sueldo`
--
ALTER TABLE `sueldo`
  MODIFY `idsueldo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipopago`
--
ALTER TABLE `tipopago`
  MODIFY `cod_tipoPago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipo_detalle_vehiculo`
--
ALTER TABLE `tipo_detalle_vehiculo`
  MODIFY `idtipo_detalle_vehiculo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `totalesdeudaventa`
--
ALTER TABLE `totalesdeudaventa`
  MODIFY `idtotalesdeudaventa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `idubicaciones` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `unidadmedida`
--
ALTER TABLE `unidadmedida`
  MODIFY `cod_Unidadmedida` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `cod_vehiculo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vendedor`
--
ALTER TABLE `vendedor`
  MODIFY `idvendedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `cod_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1009783;

--
-- AUTO_INCREMENT de la tabla `ventaseliminadas`
--
ALTER TABLE `ventaseliminadas`
  MODIFY `idventaseliminadas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `visitas`
--
ALTER TABLE `visitas`
  MODIFY `idvisitas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `visitascliente`
--
ALTER TABLE `visitascliente`
  MODIFY `cod_VisitasCliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `zona`
--
ALTER TABLE `zona`
  MODIFY `idzona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accesos_directos_usuario`
--
ALTER TABLE `accesos_directos_usuario`
  ADD CONSTRAINT `fk_accesos_directos_usuario` FOREIGN KEY (`cod_usuario`) REFERENCES `usuario` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `agenda_callcenterventas`
--
ALTER TABLE `agenda_callcenterventas`
  ADD CONSTRAINT `fk_agenda_callcenterventas_detalle_callcenterventas1` FOREIGN KEY (`iddetalle_callcenterventasFK`) REFERENCES `detalle_callcenterventas` (`iddetalle_callcenterventas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `aperturacajaapp`
--
ALTER TABLE `aperturacajaapp`
  ADD CONSTRAINT `fk_aperturacajaapp_cobrador1` FOREIGN KEY (`cod_cobrador`) REFERENCES `cobrador` (`cod_cobrador`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `archivos_listacontroldeposito`
--
ALTER TABLE `archivos_listacontroldeposito`
  ADD CONSTRAINT `fk_archivos_listacontroldeposito_lista_controldeposito1` FOREIGN KEY (`idlista_controldepositoFK`) REFERENCES `lista_controldeposito` (`idlista_controldeposito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `arqueocaja`
--
ALTER TABLE `arqueocaja`
  ADD CONSTRAINT `fk_arqueocaja_caja1` FOREIGN KEY (`caja_idcaja`) REFERENCES `caja` (`idcaja`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_arqueocaja_local1` FOREIGN KEY (`cod_local`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `caja`
--
ALTER TABLE `caja`
  ADD CONSTRAINT `fk_caja_local1` FOREIGN KEY (`cod_localFK`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cambiarproducto`
--
ALTER TABLE `cambiarproducto`
  ADD CONSTRAINT `fk_cambiarproducto_producto1` FOREIGN KEY (`cod_productoFK`) REFERENCES `producto` (`cod_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cambiarproducto_usuario1` FOREIGN KEY (`cod_usuarioFK`) REFERENCES `usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cambiarproducto_venta1` FOREIGN KEY (`cod_ventaFK`) REFERENCES `venta` (`cod_venta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cambios`
--
ALTER TABLE `cambios`
  ADD CONSTRAINT `fk_cambios_detalle_venta1` FOREIGN KEY (`coddetalleventa`) REFERENCES `detalle_venta` (`cod_detalle`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cambios_producto1` FOREIGN KEY (`cod_producto`) REFERENCES `producto` (`cod_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cambios_venta1` FOREIGN KEY (`cod_venta`) REFERENCES `venta` (`cod_venta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `categoria_lista_precio`
--
ALTER TABLE `categoria_lista_precio`
  ADD CONSTRAINT `fk_categoria_lista_precio_categoria1` FOREIGN KEY (`cod_categoriaFK`) REFERENCES `categoria` (`cod_categoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_categoria_lista_precio_lista_precio_producto1` FOREIGN KEY (`cod_lista_precio_productoFK`) REFERENCES `lista_precio_producto` (`cod_lista_precio_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cobrador`
--
ALTER TABLE `cobrador`
  ADD CONSTRAINT `fk_cobrador_persona1` FOREIGN KEY (`cod_cobrador`) REFERENCES `persona` (`cod_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cobrador_zona1` FOREIGN KEY (`idzona`) REFERENCES `zona` (`idzona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cobradorusuario`
--
ALTER TABLE `cobradorusuario`
  ADD CONSTRAINT `fk_CobradorUsuario_cobrador1` FOREIGN KEY (`cod_cobradorFk`) REFERENCES `cobrador` (`cod_cobrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_CobradorUsuario_usuario1` FOREIGN KEY (`cod_usuarioFk`) REFERENCES `usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `cod_proveedorFK` FOREIGN KEY (`cod_proveedorFK`) REFERENCES `proveedor` (`cod_proveedor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_compra_local1` FOREIGN KEY (`cod_local`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cuentas_funcionario`
--
ALTER TABLE `cuentas_funcionario`
  ADD CONSTRAINT `fk_cuentas_funcionario_funcionarios1` FOREIGN KEY (`cod_funcionarios`) REFERENCES `funcionarios` (`idfuncionarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `debaja`
--
ALTER TABLE `debaja`
  ADD CONSTRAINT `fk_debaja_producto1` FOREIGN KEY (`Cod_productoFK`) REFERENCES `producto` (`cod_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_debaja_usuario1` FOREIGN KEY (`Cod_usuarioFK`) REFERENCES `usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `descripcionventa`
--
ALTER TABLE `descripcionventa`
  ADD CONSTRAINT `fk_descripcionventa_detalle_venta1` FOREIGN KEY (`cod_detalleFK`) REFERENCES `detalle_venta` (`cod_detalle`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalleentregador_local`
--
ALTER TABLE `detalleentregador_local`
  ADD CONSTRAINT `fk_detalleentregador_local_cobrador1` FOREIGN KEY (`cod_cobradorFK`) REFERENCES `cobrador` (`cod_cobrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detalleentregador_local_local1` FOREIGN KEY (`cod_localFK`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detallescambio`
--
ALTER TABLE `detallescambio`
  ADD CONSTRAINT `fk_detallescambio_cambiarproducto1` FOREIGN KEY (`idcambiarproductoFK`) REFERENCES `cambiarproducto` (`idcambiarproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detallescambio_producto1` FOREIGN KEY (`cod_productoFK`) REFERENCES `producto` (`cod_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detallesniveles`
--
ALTER TABLE `detallesniveles`
  ADD CONSTRAINT `fk_detallesniveles_listado_niveles1` FOREIGN KEY (`cod_nivelesfk`) REFERENCES `listado_niveles` (`cod_niveles`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detallesniveles_listadodeacceso1` FOREIGN KEY (`idlistadodeacceso`) REFERENCES `listadodeacceso` (`idlistadodeacceso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detallesprecio`
--
ALTER TABLE `detallesprecio`
  ADD CONSTRAINT `fk_detallesprecio_producto1` FOREIGN KEY (`cod_producto`) REFERENCES `producto` (`cod_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detallesventaeliminado`
--
ALTER TABLE `detallesventaeliminado`
  ADD CONSTRAINT `fk_detallesventaeliminado_producto1` FOREIGN KEY (`cod_producto`) REFERENCES `producto` (`cod_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalles_entrega`
--
ALTER TABLE `detalles_entrega`
  ADD CONSTRAINT `fk_detalles_entrega_documentos1` FOREIGN KEY (`iddocumentosFK`) REFERENCES `documentos` (`iddocumentos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detalles_entrega_venta1` FOREIGN KEY (`cod_ventaFK`) REFERENCES `venta` (`cod_venta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalles_entrega_cliente`
--
ALTER TABLE `detalles_entrega_cliente`
  ADD CONSTRAINT `fk_detalles_entrega_cliente_documentos_cliente1` FOREIGN KEY (`iddocumentos_clienteFK`) REFERENCES `documentos_cliente` (`iddocumentos_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detalles_entrega_venta10` FOREIGN KEY (`cod_ventaFK`) REFERENCES `venta` (`cod_venta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detallevendedor`
--
ALTER TABLE `detallevendedor`
  ADD CONSTRAINT `fk_detallevendedor_local1` FOREIGN KEY (`cod_localFK`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detallevendedor_vendedor1` FOREIGN KEY (`cod_vendedorFK`) REFERENCES `vendedor` (`idvendedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalle_admin_local`
--
ALTER TABLE `detalle_admin_local`
  ADD CONSTRAINT `fk_detalle_admin_local_admin_local1` FOREIGN KEY (`idadmin_localFK`) REFERENCES `admin_local` (`idadmin_local`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detalle_admin_local_local1` FOREIGN KEY (`cod_localFK`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD CONSTRAINT `cod_compraFK` FOREIGN KEY (`cod_compraFK`) REFERENCES `compra` (`cod_compra`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cod_productoFK` FOREIGN KEY (`cod_productoFK`) REFERENCES `producto` (`cod_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_listado_precio`
--
ALTER TABLE `detalle_listado_precio`
  ADD CONSTRAINT `fk_detalle_listado_precio_lista_precio_producto1` FOREIGN KEY (`cod_lista_precio_productoFK`) REFERENCES `lista_precio_producto` (`cod_lista_precio_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalle_pago_cheque`
--
ALTER TABLE `detalle_pago_cheque`
  ADD CONSTRAINT `fk_detalle_compra_cheque_cheque1` FOREIGN KEY (`idchequeFK`) REFERENCES `cheque` (`idcheque`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detalle_compra_cheque_compra1` FOREIGN KEY (`cod_compraFK`) REFERENCES `compra` (`cod_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detalle_compra_cheque_proveedor1` FOREIGN KEY (`cod_proveedorFK`) REFERENCES `proveedor` (`cod_proveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalle_tarea_cobrador`
--
ALTER TABLE `detalle_tarea_cobrador`
  ADD CONSTRAINT `fk_detalle_tarea_cobrador_controlcobrador1` FOREIGN KEY (`cod_controlcobradorFK`) REFERENCES `controlcobrador` (`cod_controlcobrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detalle_tarea_cobrador_credito1` FOREIGN KEY (`cod_creditoFK`) REFERENCES `credito` (`idcredito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalle_vehiculo`
--
ALTER TABLE `detalle_vehiculo`
  ADD CONSTRAINT `fk_detalle_vehiculo_tipo_detalle_vehiculo1` FOREIGN KEY (`cod_tipo_detalle_vehiculoFK`) REFERENCES `tipo_detalle_vehiculo` (`idtipo_detalle_vehiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detalle_vehiculo_vehiculo1` FOREIGN KEY (`cod_vehiculoFK`) REFERENCES `vehiculo` (`cod_vehiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `entregacobrador`
--
ALTER TABLE `entregacobrador`
  ADD CONSTRAINT `fk_EntregaCobrador_cobrador1` FOREIGN KEY (`cod_cobradorFK`) REFERENCES `cobrador` (`cod_cobrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_EntregaCobrador_local1` FOREIGN KEY (`cod_localFK`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_EntregaCobrador_usuario1` FOREIGN KEY (`cod_usuarioFK`) REFERENCES `usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD CONSTRAINT `fk_funcionarios_cargos1` FOREIGN KEY (`cod_cargosFK`) REFERENCES `cargos` (`idcargos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `garantia`
--
ALTER TABLE `garantia`
  ADD CONSTRAINT `fk_Garantia_detalle_venta1` FOREIGN KEY (`cod_detalleFK`) REFERENCES `detalle_venta` (`cod_detalle`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `garantias`
--
ALTER TABLE `garantias`
  ADD CONSTRAINT `fk_garantia_producto1` FOREIGN KEY (`cod_productoFK`) REFERENCES `producto` (`cod_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_garantia_venta1` FOREIGN KEY (`cod_ventaFK`) REFERENCES `venta` (`cod_venta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD CONSTRAINT `fk_gastos_local1` FOREIGN KEY (`cod_local`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_gastos_usuario1` FOREIGN KEY (`cod_usuario`) REFERENCES `usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `gastos_administrativo`
--
ALTER TABLE `gastos_administrativo`
  ADD CONSTRAINT `fk_gastos_administrativo_usuario1` FOREIGN KEY (`cod_usuario`) REFERENCES `usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `gastos_cobrador`
--
ALTER TABLE `gastos_cobrador`
  ADD CONSTRAINT `fk_gastos_cobrador_cobrador1` FOREIGN KEY (`cod_cobradorFK`) REFERENCES `cobrador` (`cod_cobrador`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `gastos_juan`
--
ALTER TABLE `gastos_juan`
  ADD CONSTRAINT `fk_gastos_juan_usuario1` FOREIGN KEY (`cod_usuario`) REFERENCES `usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `historialdespacho`
--
ALTER TABLE `historialdespacho`
  ADD CONSTRAINT `fk_historialdespacho_producto1` FOREIGN KEY (`cod_producto_fk`) REFERENCES `producto` (`cod_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_historialdespacho_usuario1` FOREIGN KEY (`cod_usuario_fk`) REFERENCES `usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `interesespagados`
--
ALTER TABLE `interesespagados`
  ADD CONSTRAINT `fk_interesespagados_credito1` FOREIGN KEY (`idcredito`) REFERENCES `credito` (`idcredito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `kilometraje`
--
ALTER TABLE `kilometraje`
  ADD CONSTRAINT `fk_kilometraje_vehiculo1` FOREIGN KEY (`cod_vehiculoFK`) REFERENCES `vehiculo` (`cod_vehiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `listapreciocategoria`
--
ALTER TABLE `listapreciocategoria`
  ADD CONSTRAINT `fk_listaprecio_categoria1` FOREIGN KEY (`cod_categoriaFK`) REFERENCES `categoria` (`cod_categoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `local_lista_precio`
--
ALTER TABLE `local_lista_precio`
  ADD CONSTRAINT `fk_local_lista_precio_lista_precio_producto1` FOREIGN KEY (`cod_lista_precio_productoFK`) REFERENCES `lista_precio_producto` (`cod_lista_precio_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_local_lista_precio_local1` FOREIGN KEY (`cod_localFK`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `metas`
--
ALTER TABLE `metas`
  ADD CONSTRAINT `fk_metas_vendedor1` FOREIGN KEY (`cod_vendedorFK`) REFERENCES `vendedor` (`idvendedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `metas_salario`
--
ALTER TABLE `metas_salario`
  ADD CONSTRAINT `fk_metas_salario_cargos1` FOREIGN KEY (`cod_cargosFK`) REFERENCES `cargos` (`idcargos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `meta_cobrador`
--
ALTER TABLE `meta_cobrador`
  ADD CONSTRAINT `fk_meta_cobrador_cobrador1` FOREIGN KEY (`cod_cobradorFK`) REFERENCES `cobrador` (`cod_cobrador`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `nrofactura`
--
ALTER TABLE `nrofactura`
  ADD CONSTRAINT `fk_nrofactura_usuario1` FOREIGN KEY (`cod_usuarioFk`) REFERENCES `usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_nroorden_local1` FOREIGN KEY (`cod_localfk`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `fk_Pago_cobrador1` FOREIGN KEY (`cod_cobradorFK`) REFERENCES `cobrador` (`cod_cobrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Pago_credito1` FOREIGN KEY (`cod_creditoFK`) REFERENCES `credito` (`idcredito`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pago_venta1` FOREIGN KEY (`cod_venta_fk`) REFERENCES `venta` (`cod_venta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pagosdecompra`
--
ALTER TABLE `pagosdecompra`
  ADD CONSTRAINT `fk_pagosdecompra_compra1` FOREIGN KEY (`cod_compraFk`) REFERENCES `compra` (`cod_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pagoseliminados`
--
ALTER TABLE `pagoseliminados`
  ADD CONSTRAINT `fk_pagoseliminados_usuario1` FOREIGN KEY (`cod_usuario`) REFERENCES `usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_Categoria1` FOREIGN KEY (`cod_categoriaFK`) REFERENCES `categoria` (`cod_categoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_producto_Impuesto1` FOREIGN KEY (`cod_ImpuestoFK`) REFERENCES `impuesto` (`cod_Impuesto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_producto_Marcas1` FOREIGN KEY (`cod_marcasFK`) REFERENCES `marcas` (`cod_marcas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_producto_local1` FOREIGN KEY (`cod_localFK`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD CONSTRAINT `cod_proveedor` FOREIGN KEY (`cod_proveedor`) REFERENCES `persona` (`cod_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `referenciascliente`
--
ALTER TABLE `referenciascliente`
  ADD CONSTRAINT `fk_referenciascliente_cliente1` FOREIGN KEY (`cod_clienteFk`) REFERENCES `cliente` (`cod_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sock_locales`
--
ALTER TABLE `sock_locales`
  ADD CONSTRAINT `fk_sock_locales_local1` FOREIGN KEY (`cod_local`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sock_locales_producto1` FOREIGN KEY (`cod_producto`) REFERENCES `producto` (`cod_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `stock_producto`
--
ALTER TABLE `stock_producto`
  ADD CONSTRAINT `cod_stocklocales` FOREIGN KEY (`cod_stocklocalesFK`) REFERENCES `stocklocales` (`idstocklocales`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `totalesdeudaventa`
--
ALTER TABLE `totalesdeudaventa`
  ADD CONSTRAINT `fk_totalesdeudaventa_venta1` FOREIGN KEY (`cod_ventaFk`) REFERENCES `venta` (`cod_venta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_local1` FOREIGN KEY (`cod_localFK`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `usuario_personaFK` FOREIGN KEY (`cod_usuario`) REFERENCES `persona` (`cod_persona`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `fk_vehiculo_local1` FOREIGN KEY (`cod_localFK`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `fk_venta_cobrador1` FOREIGN KEY (`cod_cobradorFK`) REFERENCES `cobrador` (`cod_cobrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_venta_local1` FOREIGN KEY (`cod_local`) REFERENCES `local` (`cod_local`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `venta_clienteFK` FOREIGN KEY (`cod_clienteFK`) REFERENCES `cliente` (`cod_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `venta_usuarioFK` FOREIGN KEY (`cod_usuarioFK`) REFERENCES `usuario` (`cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `visitascliente`
--
ALTER TABLE `visitascliente`
  ADD CONSTRAINT `fk_VisitasCliente_cliente1` FOREIGN KEY (`cod_clienteFK`) REFERENCES `cliente` (`cod_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_VisitasCliente_cobrador1` FOREIGN KEY (`cod_cobradorFK`) REFERENCES `cobrador` (`cod_cobrador`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
