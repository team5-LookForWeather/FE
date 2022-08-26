create database LFW;
use LFW;


drop table User;
insert into User values('aaa','aaa1','aaa','aaa','01011111111','aaa@gmail.com','','1');

CREATE TABLE `User` (
	`user_id`	varchar(15)	NOT NULL primary key,
	`pw`	varchar(15)	NOT NULL,
	`name`	varchar(10)	NOT NULL,
	`nickname`	varchar(10)	NOT NULL,
	`tel`	int	NULL,
	`email`	varchar(30)	NOT NULL,
	`gender` enum('F', 'M', '')	NULL,
	`age`	int	NULL
);


CREATE TABLE `OOTD` (
	`OOTD_id`	int	NOT NULL primary key auto_increment	COMMENT 'ootd 게시글에 주어지는 식별 id',
	`user_id`	varchar(15)	NOT NULL,
	`OOTD_img`	varchar(200)	NOT NULL	COMMENT 'ootd파일',
	`style_tag`	SET('#캐주얼', '#시크', '#댄디', '#포멀', '#걸리시', '#레트로', '#로맨틱', '#스포츠', '#스트릿'),
	`create_time`	DATETIME	NOT NULL,
	`update_time`	DATETIME	NULL,
	`delete_time`	DATETIME	NULL,
	`comment`	mediumtext	NULL	COMMENT '옷에 대한 간략한 정보 적게',
	`like`	int	NULL	COMMENT '좋아요 기능',
    foreign key (user_id) references User(user_id)
);


CREATE TABLE `OOTD_comment` (
	`comment_id`	int	NOT NULL primary key auto_increment comment 'comment 식별',
	`user_id`	varchar(15)	NOT NULL,
	`OOTD_id`	INT	NOT NULL,
	`comment`	mediumtext	NULL	COMMENT '댓글내용',
	`create_time`	DATETIME	NOT NULL,
	`update_time`	DATETIME	NULL,
	`delete_time`	DATETIME	NULL,
    foreign key (user_id) references User(user_id),
    foreign key (OOTD_id) references OOTD(OOTD_id)
);

CREATE TABLE `OOTD_picture` (
	`OOTD_img`	varchar(200)	primary key NOT NULL	COMMENT 'ootd파일명',
	`OOTD_id`	int	NOT NULL,
	`user_id`	varchar(15)	NOT NULL,
    foreign key (user_id) references User(user_id),
    foreign key (OOTD_id) references OOTD(OOTD_id)
);

CREATE TABLE `OOTD_like` (
	`OOTD_like_id`	INT	primary key auto_increment NOT NULL,
	`OOTD_id`	int	NOT NULL,
	`user_id`	varchar(15)	NOT NULL,
	`OOTD_like`	int	NULL,
    foreign key (user_id) references User(user_id),
    foreign key (OOTD_id) references OOTD(OOTD_id)
);

CREATE TABLE `Memo` (
	`memo_id`	int	NOT NULL primary key auto_increment	COMMENT '코멘트 식별값',
	`user_id`	varchar(15)	NOT NULL,
	`memo`	mediumtext	NULL	COMMENT '한 줄 댓글 내용',
	`create_time`	DATETIME	NOT NULL,
	`update_time`	DATETIME	NULL,
	`delete_time`	DATETIME	NULL,
    foreign key (user_id) references User(user_id)
);

CREATE TABLE `Codi` (
	`codi_id`	int	NOT NULL primary key auto_increment	COMMENT '코디 식별값',
	`user_id`	varchar(15)	NOT NULL,
	`codi_img` 	varchar(200) NOT NULL COMMENT '이미지 파일명.확장자',
	`codi_stage`	int NOT NULL,
    foreign key (user_id) references User(user_id)
);

select * from Memo;

use LFW;
select * from User;
select * from mysql.user;

GRANT ALL PRIVILEGES ON *.* TO 'LFW'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
