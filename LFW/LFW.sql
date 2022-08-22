create database LFW;
use LFW;


CREATE TABLE `User` (
	`user_id`	varchar(15)	NOT NULL primary key,
	`pw`	varchar(15)	NOT NULL,
	`name`	varchar(10)	NOT NULL,
	`nickname`	varchar(10)	NOT NULL,
	`tel`	int(13)	NULL,
	`email`	varchar(30)	NOT NULL,
	`gender` enum('F', 'M', '')	NULL,
	`age`	int(3)	NULL
);

CREATE TABLE `OOTD` (
	`OOTD_id`	int	NOT NULL primary key auto_increment	COMMENT 'ootd 게시글에 주어지는 식별 id',
	`user_id`	varchar(15)	NOT NULL,
	`OOTD_img`	varchar(200)	NOT NULL	COMMENT 'ootd파일',
	`hashTag`	varchar(20)	NULL,
	`create_time`	DATETIME	NOT NULL,
	`update_time`	DATETIME	NULL,
	`delete_time`	DATETIME	NULL,
	`comment`	mediumtext	NULL	COMMENT '옷에 대한 간략한 정보 적게',
	`like`	int	NULL	COMMENT '좋아요 기능',
    foreign key (user_id) references User
);


CREATE TABLE `OOTD_comment` (
	`comment_id`	int	NOT NULL primary key auto_increment comment 'comment 식별',
	`user_id`	varchar(15)	NOT NULL,
	`OOTD_id`	INT	NOT NULL,
	`comment`	mediumtext	NULL	COMMENT '댓글내용',
	`create_time`	DATETIME	NOT NULL,
	`update_time`	DATETIME	NULL,
	`delete_time`	DATETIME	NULL,
    foreign key (user_id) references User,
    foreign key (OOTD_id) references OOTD
);

CREATE TABLE `OOTD_picture` (
	`OOTD_img`	varchar(200)	primary key NOT NULL	COMMENT 'ootd파일명',
	`OOTD_id`	int	NOT NULL,
	`user_id`	varchar(15)	NOT NULL,
	foreign key (user_id) references User,
    foreign key (OOTD_id) references OOTD
);

CREATE TABLE `OOTD_like` (
	`OOTD_like_id`	INT	primary key auto_increment NOT NULL,
	`OOTD_id`	int	NOT NULL,
	`user_id`	varchar(15)	NOT NULL,
	`OOTD_like`	int	NULL,
	foreign key (user_id) references User,
    foreign key (OOTD_id) references OOTD
);

CREATE TABLE `Memo` (
	`memo_id`	int	NOT NULL primary key auto_increment	COMMENT '코멘트 식별값',
	`user_id`	varchar(15)	NOT NULL,
	`memo`	mediumtext	NULL	COMMENT '한 줄 댓글 내용',
	`create_time`	DATETIME	NOT NULL,
	`update_time`	DATETIME	NULL,
	`delete_time`	DATETIME	NULL,
    foreign key (user_id) references User
);
