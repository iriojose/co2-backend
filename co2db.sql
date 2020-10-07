-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.1.26-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para co2db
CREATE DATABASE IF NOT EXISTS `co2db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `co2db`;

-- Volcando estructura para tabla co2db.medio_transporte
CREATE TABLE IF NOT EXISTS `medio_transporte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `factor_emision` decimal(12,3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COMMENT='tablas para los tipos de vehiculos y sus gastos de co2 ';

-- Volcando datos para la tabla co2db.medio_transporte: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `medio_transporte` DISABLE KEYS */;
INSERT INTO `medio_transporte` (`id`, `nombre`, `descripcion`, `factor_emision`, `created_at`, `updated_at`) VALUES
	(1, 'Metro', 'Tren, Subway, Subterráneo', 0.033, '2020-10-06 19:44:55', '2020-10-06 19:45:09');
INSERT INTO `medio_transporte` (`id`, `nombre`, `descripcion`, `factor_emision`, `created_at`, `updated_at`) VALUES
	(2, 'Auto', 'Gasolina', 0.210, '2020-10-06 19:44:59', '2020-10-06 19:45:06');
INSERT INTO `medio_transporte` (`id`, `nombre`, `descripcion`, `factor_emision`, `created_at`, `updated_at`) VALUES
	(3, 'Camioneta', 'Diesel', 0.249, '2020-10-06 19:45:00', '2020-10-06 19:45:05');
INSERT INTO `medio_transporte` (`id`, `nombre`, `descripcion`, `factor_emision`, `created_at`, `updated_at`) VALUES
	(4, 'Motocicleta', 'Gasoline', 0.092, '2020-10-06 19:44:58', '2020-10-06 19:45:07');
INSERT INTO `medio_transporte` (`id`, `nombre`, `descripcion`, `factor_emision`, `created_at`, `updated_at`) VALUES
	(5, 'Bus transantiago', 'Transporte público', 0.039, '2020-10-06 19:44:56', '2020-10-06 19:45:08');
INSERT INTO `medio_transporte` (`id`, `nombre`, `descripcion`, `factor_emision`, `created_at`, `updated_at`) VALUES
	(6, 'Bus', 'Transporte privado', 0.012, '2020-10-06 19:44:54', '2020-10-06 19:45:09');
INSERT INTO `medio_transporte` (`id`, `nombre`, `descripcion`, `factor_emision`, `created_at`, `updated_at`) VALUES
	(7, 'Avion', 'Chile', 0.279, '2020-10-06 19:45:01', '2020-10-06 19:45:04');
INSERT INTO `medio_transporte` (`id`, `nombre`, `descripcion`, `factor_emision`, `created_at`, `updated_at`) VALUES
	(8, 'Avion', 'Internacional', 0.179, '2020-10-06 19:44:59', '2020-10-06 19:45:11');
INSERT INTO `medio_transporte` (`id`, `nombre`, `descripcion`, `factor_emision`, `created_at`, `updated_at`) VALUES
	(9, 'Caminando', 'Paso a paso', 0.000, '2020-10-06 19:44:50', '2020-10-06 19:45:10');
/*!40000 ALTER TABLE `medio_transporte` ENABLE KEYS */;

-- Volcando estructura para tabla co2db.transportistas
CREATE TABLE IF NOT EXISTS `transportistas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `viaje_id` int(11) NOT NULL DEFAULT '0',
  `usuario_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='tabla pivote para los usuarios que van en un viaje\r\n';

-- Volcando datos para la tabla co2db.transportistas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `transportistas` DISABLE KEYS */;
/*!40000 ALTER TABLE `transportistas` ENABLE KEYS */;

-- Volcando estructura para tabla co2db.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `imagen` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `recoverydate` datetime DEFAULT NULL,
  `recovery` varchar(150) DEFAULT NULL,
  `fecha_nac` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla co2db.usuarios: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

-- Volcando estructura para tabla co2db.viajes
CREATE TABLE IF NOT EXISTS `viajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `punto_inicio` varchar(255) DEFAULT NULL,
  `punto_fin` varchar(255) DEFAULT NULL,
  `kilometros` int(11) NOT NULL DEFAULT '0',
  `medio_transporte_id` int(11) NOT NULL DEFAULT '0',
  `idayvuelta` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 es ida y vuelta, 1 es solo ida',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medio_transporte_id` (`medio_transporte_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='tabla para el registro de los viajes';

-- Volcando datos para la tabla co2db.viajes: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `viajes` DISABLE KEYS */;
/*!40000 ALTER TABLE `viajes` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
