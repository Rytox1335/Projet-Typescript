-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 31 mars 2023 à 13:10
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `culturequizz`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `categorie` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `parties`
--

DROP TABLE IF EXISTS `parties`;
CREATE TABLE IF NOT EXISTS `parties` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `idjoueur` int NOT NULL,
  `score` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `categorie` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse3` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse4` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse5` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse6` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse7` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse8` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse9` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reponse10` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


-- Données pédagogiques Culture Quiz : reponse1 est toujours correcte.
SET NAMES utf8mb4;
START TRANSACTION;
INSERT INTO categories (categorie) VALUES
('Histoire'),
('Géographie'),
('Cinéma');
INSERT INTO questions (categorie, question, reponse1, reponse2, reponse3, reponse4, reponse5, reponse6, reponse7, reponse8, reponse9, reponse10) VALUES
('Histoire', 'En quelle année a eu lieu la prise de la Bastille ?', '1789', '1492', '1804', '1914', '1945', '1989', '1969', '1958', '1515', '1815'),
('Histoire', 'En quelle année Christophe Colomb arrive-t-il en Amérique ?', '1492', '1789', '1804', '1914', '1945', '1989', '1969', '1958', '1515', '1815'),
('Histoire', 'En quelle année Napoléon Ier a-t-il été sacré empereur ?', '1804', '1789', '1492', '1914', '1945', '1989', '1969', '1958', '1515', '1815'),
('Histoire', 'En quelle année la Première Guerre mondiale a-t-elle commencé ?', '1914', '1789', '1492', '1804', '1945', '1989', '1969', '1958', '1515', '1815'),
('Histoire', 'En quelle année la Seconde Guerre mondiale s’est-elle terminée ?', '1945', '1789', '1492', '1804', '1914', '1989', '1969', '1958', '1515', '1815'),
('Histoire', 'En quelle année le mur de Berlin est-il tombé ?', '1989', '1789', '1492', '1804', '1914', '1945', '1969', '1958', '1515', '1815'),
('Histoire', 'En quelle année les premiers humains ont-ils marché sur la Lune ?', '1969', '1789', '1492', '1804', '1914', '1945', '1989', '1958', '1515', '1815'),
('Histoire', 'En quelle année la Ve République française a-t-elle été instaurée ?', '1958', '1789', '1492', '1804', '1914', '1945', '1989', '1969', '1515', '1815'),
('Histoire', 'En quelle année a eu lieu la bataille de Marignan ?', '1515', '1789', '1492', '1804', '1914', '1945', '1989', '1969', '1958', '1815'),
('Histoire', 'En quelle année a eu lieu la bataille de Waterloo ?', '1815', '1789', '1492', '1804', '1914', '1945', '1989', '1969', '1958', '1515'),
('Géographie', 'Quelle est la capitale du Japon ?', 'Tokyo', 'Ottawa', 'Canberra', 'Brasilia', 'Le Caire', 'Rome', 'Buenos Aires', 'Oslo', 'Lisbonne', 'Dakar'),
('Géographie', 'Quelle est la capitale du Canada ?', 'Ottawa', 'Tokyo', 'Canberra', 'Brasilia', 'Le Caire', 'Rome', 'Buenos Aires', 'Oslo', 'Lisbonne', 'Dakar'),
('Géographie', 'Quelle est la capitale de l’Australie ?', 'Canberra', 'Tokyo', 'Ottawa', 'Brasilia', 'Le Caire', 'Rome', 'Buenos Aires', 'Oslo', 'Lisbonne', 'Dakar'),
('Géographie', 'Quelle est la capitale du Brésil ?', 'Brasilia', 'Tokyo', 'Ottawa', 'Canberra', 'Le Caire', 'Rome', 'Buenos Aires', 'Oslo', 'Lisbonne', 'Dakar'),
('Géographie', 'Quelle est la capitale de l’Égypte ?', 'Le Caire', 'Tokyo', 'Ottawa', 'Canberra', 'Brasilia', 'Rome', 'Buenos Aires', 'Oslo', 'Lisbonne', 'Dakar'),
('Géographie', 'Quelle est la capitale de l’Italie ?', 'Rome', 'Tokyo', 'Ottawa', 'Canberra', 'Brasilia', 'Le Caire', 'Buenos Aires', 'Oslo', 'Lisbonne', 'Dakar'),
('Géographie', 'Quelle est la capitale de l’Argentine ?', 'Buenos Aires', 'Tokyo', 'Ottawa', 'Canberra', 'Brasilia', 'Le Caire', 'Rome', 'Oslo', 'Lisbonne', 'Dakar'),
('Géographie', 'Quelle est la capitale de la Norvège ?', 'Oslo', 'Tokyo', 'Ottawa', 'Canberra', 'Brasilia', 'Le Caire', 'Rome', 'Buenos Aires', 'Lisbonne', 'Dakar'),
('Géographie', 'Quelle est la capitale du Portugal ?', 'Lisbonne', 'Tokyo', 'Ottawa', 'Canberra', 'Brasilia', 'Le Caire', 'Rome', 'Buenos Aires', 'Oslo', 'Dakar'),
('Géographie', 'Quelle est la capitale du Sénégal ?', 'Dakar', 'Tokyo', 'Ottawa', 'Canberra', 'Brasilia', 'Le Caire', 'Rome', 'Buenos Aires', 'Oslo', 'Lisbonne'),
('Cinéma', 'Qui a réalisé Titanic, sorti en 1997 ?', 'James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Jean-Pierre Jeunet', 'Hayao Miyazaki', 'Peter Jackson', 'Francis Ford Coppola', 'Charlie Chaplin', 'Alfred Hitchcock'),
('Cinéma', 'Qui a réalisé Jurassic Park, sorti en 1993 ?', 'Steven Spielberg', 'James Cameron', 'Christopher Nolan', 'Quentin Tarantino', 'Jean-Pierre Jeunet', 'Hayao Miyazaki', 'Peter Jackson', 'Francis Ford Coppola', 'Charlie Chaplin', 'Alfred Hitchcock'),
('Cinéma', 'Qui a réalisé Inception ?', 'Christopher Nolan', 'James Cameron', 'Steven Spielberg', 'Quentin Tarantino', 'Jean-Pierre Jeunet', 'Hayao Miyazaki', 'Peter Jackson', 'Francis Ford Coppola', 'Charlie Chaplin', 'Alfred Hitchcock'),
('Cinéma', 'Qui a réalisé Pulp Fiction ?', 'Quentin Tarantino', 'James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Jean-Pierre Jeunet', 'Hayao Miyazaki', 'Peter Jackson', 'Francis Ford Coppola', 'Charlie Chaplin', 'Alfred Hitchcock'),
('Cinéma', 'Qui a réalisé Le Fabuleux Destin d’Amélie Poulain ?', 'Jean-Pierre Jeunet', 'James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Hayao Miyazaki', 'Peter Jackson', 'Francis Ford Coppola', 'Charlie Chaplin', 'Alfred Hitchcock'),
('Cinéma', 'Qui a réalisé Le Voyage de Chihiro ?', 'Hayao Miyazaki', 'James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Jean-Pierre Jeunet', 'Peter Jackson', 'Francis Ford Coppola', 'Charlie Chaplin', 'Alfred Hitchcock'),
('Cinéma', 'Qui a réalisé la trilogie du Seigneur des anneaux ?', 'Peter Jackson', 'James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Jean-Pierre Jeunet', 'Hayao Miyazaki', 'Francis Ford Coppola', 'Charlie Chaplin', 'Alfred Hitchcock'),
('Cinéma', 'Qui a réalisé Le Parrain, sorti en 1972 ?', 'Francis Ford Coppola', 'James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Jean-Pierre Jeunet', 'Hayao Miyazaki', 'Peter Jackson', 'Charlie Chaplin', 'Alfred Hitchcock'),
('Cinéma', 'Qui a réalisé Les Temps modernes ?', 'Charlie Chaplin', 'James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Jean-Pierre Jeunet', 'Hayao Miyazaki', 'Peter Jackson', 'Francis Ford Coppola', 'Alfred Hitchcock'),
('Cinéma', 'Qui a réalisé Psychose, sorti en 1960 ?', 'Alfred Hitchcock', 'James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Jean-Pierre Jeunet', 'Hayao Miyazaki', 'Peter Jackson', 'Francis Ford Coppola', 'Charlie Chaplin');
COMMIT;
