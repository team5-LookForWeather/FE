mysql -u root -p;		-- mysql root계정으로 접속

CREATE USER 'LFW'@'%' IDENTIFIED BY 'SeSACweb!';	-- LFW 계정 생성
GRANT ALL PRIVILEGES ON *.* TO 'LFW'@'%' WITH GRANT OPTION;	-- 권한 부여
FLUSH PRIVILEGES;	-- 변경된 권한 적용

SELECT host, user, plugin from mysql.user;	-- 전체 계정 확인
ALTER USER 'LFW'@'%' IDENTIFIED WITH mysql_native_password BY 'SeSACweb!';	-- 모든ip 외부접근 허용

CREATE DATABASE LFW; -- DB 생성
USE LFW; -- DB 사용

-- LFW.sql 파일 실행히기 (터미널에서 입력)
mysql> source /SeSAC-LFW/LFW/LFW.sql;	


-- -- 명령어 --
-- SHOW DATABASES;	-- DB 확인
-- SHOW TABLES;	-- 테이블 확인
-- SHOW COLUMNS FROM User;	-- 'User'테이블의 컬럼 확인 
-- SELECT * FROM User;		-- 'User'테이블의 데이터 확인



-- TABLE 생성
CREATE TABLE `User` (
	`user_id`	varchar(15)	NOT NULL primary key,
	`pw`	varchar(30)	NOT NULL,
	`name`	varchar(10)	NOT NULL,
	`nickname`	varchar(20)	NOT NULL,
	`tel`	varchar(13)	NULL,
	`email`	varchar(100)	NOT NULL,
	`gender` enum('F', 'M', '')	NULL,
	`age`	int	NULL
);


CREATE TABLE `OOTD` (
	`OOTD_id`	int	NOT NULL primary key auto_increment	COMMENT 'ootd 게시글에 주어지는 식별 id',
	`user_id`	varchar(15)	NOT NULL,
	`OOTD_img`	varchar(200)	NOT NULL	COMMENT 'ootd파일',
	`style_tag`	enum('#캐주얼', '#시크', '#댄디', '#포멀', '#걸리시', '#레트로', '#로맨틱', '#스포츠', '#스트릿'),
	`create_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP,
	`update_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`comment`	mediumtext	NULL	COMMENT '옷에 대한 간략한 정보 적게',
	`like`	int	NULL	DEFAULT 0 COMMENT '좋아요 기능',
    foreign key (user_id) references User(user_id)
);


CREATE TABLE `OOTD_comment` (
	`comment_id`	int	NOT NULL primary key auto_increment comment 'comment 식별',
	`user_id`	varchar(15)	NOT NULL,
	`OOTD_id`	INT	NOT NULL,
	`comment`	mediumtext	NOT NULL	COMMENT '댓글내용',
	`create_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP,
	`update_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	`create_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP,
	`update_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (user_id) references User(user_id)
);

CREATE TABLE `Codi` (
	`codi_id`	int	NOT NULL primary key auto_increment	COMMENT '코디 식별값',
	`user_id`	varchar(15)	NOT NULL,
	`codi_img` 	varchar(200) NOT NULL COMMENT '이미지 파일명.확장자',
	`codi_stage`	int NOT NULL,
    foreign key (user_id) references User(user_id)
);


-- -- table 삭제
-- drop table likes; 
-- drop table studymember; 
-- drop table studygroup; 
-- drop table user;


-- -------------------------------------------------* 테스트 코드

-- -- 로그인 테스트
-- insert into user values('aa', '1234', '1', 'swith', 'swith', 'swith@naver.com', 'image', 'study', 'coding', 'coding', '2022-08-16');

-- --스터디 그룹 테스트
-- INSERT INTO studygroup (head_id, study_name, study_category, study_form, study_address, study_recruit, study_image, study_content, start_period, end_period, hashtag) VALUES("aa", "swith", "IT", "오프라인", "서울시 영등포구 문래동","6", "123456789.jpg","안녕하세요 swith입니다", '2022-08-16', '2022-12-30', "#공부#그룹#화이팅" );

-- -- 조회 test
-- SELECT * FROM user;
-- SELECT * FROM studygroup;
-- SELECT * FROM studymember;

-- -- 스터디 가입 테스트
-- INSERT INTO studymember (study_id, user_id) VALUES (1, "aa");

-- -- 삭제 테스트
-- DELETE FROM user WHERE user_id='aa';



-- ----------------------* Back 참고용
-- --좋아요 수 카운트
-- SELECT COUNT(*) FROM user WHERE user_id=1;


-- --규리쌤이 알려주신 join
-- create database test;
-- use test;
-- create table user (
-- 	user_id int(2) not null primary key,
--     username varchar(4) 
-- );

-- insert into user values (4,'abcd');

-- create table studygroup (
-- 	study_id int(2) not null primary key,
--     user_id int(2) not null,
--     studyname varchar(10),
--     foreign key (user_id) references user(user_id)
--     );

-- insert into studygroup values(2,4,'sesac4');
    
-- create table studymember (
-- 	id int(5) not null primary key,
--     study_id int(2) not null,
--     user_id int(2) not null,
--     foreign key (study_id) references studygroup(study_id),
--     foreign key (user_id) references user(user_id)
-- );

-- insert into studymember values(5,2,3);
    


-- insert into User values('aaa','aaa1','aaa','aaa','01011111111','aaa@gmail.com','','1');
-- select * from Memo;
-- --------------------------------------------------*
    
-- select * from studymember;
-- select * from studygroup inner join user on user.user_id = studygroup.user_id where study_id=1;
-- SELECT * from user inner join studymember on studymember.user_id = user.user_id inner join studygroup on studygroup.study_id = studymember.study_id;
