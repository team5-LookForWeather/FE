CREATE TABLE `User` (
  `id` varchar(15) NOT NULL,
  `pw` varchar(15) NOT NULL,
  `name` varchar(10) NOT NULL,
  `nickname` varchar(10) NOT NULL,
  `tel` varchar(13) DEFAULT '',
  `email` varchar(30) NOT NULL,
  `gender` enum('F','M','') DEFAULT '',
  `age` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
);

CREATE TABLE `User_comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(15) DEFAULT NULL,
  `comment` mediumtext,
  `create_time` datetime NOT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

CREATE TABLE `User_OOTD` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(15) NOT NULL,
  `title` varchar(60) NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_ootd_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

CREATE TABLE `User_OOTD_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment` mediumtext NOT NULL COMMENT '옷에 대한 간략한 정보 적을 수 있게',
  `OOTD_id` int NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `OOTD_id` (`OOTD_id`),
  CONSTRAINT `user_ootd_comment_ibfk_1` FOREIGN KEY (`OOTD_id`) REFERENCES `User_OOTD` (`id`)
);

CREATE TABLE `User_OOTD_like` (
  `user_id` varchar(15) DEFAULT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_ootd_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

CREATE TABLE `User_OOTD_picture` (
  `OOTD_id` int DEFAULT NULL,
  `filename` varchar(20) DEFAULT NULL,
  KEY `OOTD_id` (`OOTD_id`),
  CONSTRAINT `user_ootd_picture_ibfk_1` FOREIGN KEY (`OOTD_id`) REFERENCES `User_OOTD` (`id`)
);
