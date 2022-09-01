-- mysql -u root -p;		-- mysql root계정으로 접속

CREATE USER 'LFW'@'%' IDENTIFIED BY 'SeSAC4web!';	-- LFW 계정 생성
GRANT ALL PRIVILEGES ON *.* TO 'LFW'@'%' WITH GRANT OPTION;	-- 권한 부여
FLUSH PRIVILEGES;	-- 변경된 권한 적용

SELECT host, user, plugin from mysql.user;	-- 전체 계정 확인
ALTER USER 'LFW'@'%' IDENTIFIED WITH mysql_native_password BY 'SeSAC4web!';	-- 모든ip 외부접근 허용


-- LFW.sql 파일 실행히기

CREATE DATABASE LFW; -- DB 생성
USE LFW; -- DB 사용


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
	`style_tag`	varchar(100) NULL,
	`CREATE_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP,
	`update_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`comment`	mediumtext	NULL	COMMENT '옷에 대한 간략한 정보 적게',
	`heart`	int	NULL	DEFAULT 0 COMMENT '좋아요 기능',
    foreign key (user_id) references User(user_id)
);

CREATE TABLE `OOTD_comment` (
	`comment_id`	int	NOT NULL primary key auto_increment comment 'comment 식별',
	`user_id`	varchar(15)	NOT NULL,
	`OOTD_id`	INT	NOT NULL,
	`comment`	mediumtext NULL COMMENT '댓글내용',
	`CREATE_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP,
	`update_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (user_id) references User(user_id),
    foreign key (OOTD_id) references OOTD(OOTD_id)
);

CREATE TABLE `OOTD_like` (
	`like_id`	INT	primary key auto_increment NOT NULL,
	`OOTD_id`	int	NOT NULL,
	`user_id`	varchar(15)	NOT NULL,
    foreign key (user_id) references User(user_id),
    foreign key (OOTD_id) references OOTD(OOTD_id)
);

CREATE TABLE `Memo` (
	`memo_id`	int	NOT NULL primary key auto_increment	COMMENT '코멘트 식별값',
	`user_id`	varchar(15)	NOT NULL,
	`memo`	mediumtext	NULL	COMMENT '한 줄 댓글 내용',
	`CREATE_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP,
	`update_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (user_id) references User(user_id)
);

CREATE TABLE `Codi` (
	`codi_id`	int	NOT NULL primary key auto_increment	COMMENT '코디 식별값',
	`user_id`	varchar(15)	NOT NULL,
	`codi_img` 	varchar(200) NULL COMMENT '이미지 파일명.확장자',
	`codi_stage`	int NULL,
    foreign key (user_id) references User(user_id)
);

select distinct(ootd.ootd_id) from ootd inner join user on ootd.user_id = user.user_id;


-- ------------------------------------------------* 테스트 코드

-- -- 기본 명령어 --
SHOW DATABASES;	-- DB 확인
SHOW TABLES;	-- 테이블 확인
SHOW COLUMNS FROM User;	-- 'User'테이블의 컬럼 확인 

-- -- 조회 테스트
SELECT * FROM User;		-- 'User'테이블의 데이터 확인
SELECT * FROM OOTD;		-- 'OOTD'테이블의 데이터 확인
SELECT * FROM OOTD_comment;
SELECT * FROM OOTD_like;
SELECT * FROM Memo;		-- 'Memo'테이블의 데이터 확인
SELECT * FROM Codi;		-- 'Codi'테이블의 데이터 확인

-- 입력 테스트
insert into User(user_id, pw, name, nickname, tel, email, gender, age) values('1','1234','최상훈','choi','010-1234-5678','choi@naver.com','M',20);	
insert into OOTD(`OOTD_id`, `user_id`, `OOTD_img`, `style_tag`, `comment`, `like`) values(1,1,'1.png','#캐주얼','화창한 날씨에 입는 캐주얼룩','0');	
insert into OOTD(`OOTD_id`, `user_id`, `OOTD_img`, `style_tag`, `comment`, `like`) values(2,1,'2.png','#스포츠','운동','3');

-- 삭제 테스트
DELETE FROM OOTD WHERE user_id='1';

-- 규리쌤이 알려주신 join
SELECT distinct(OOTD.ootd_id) from OOTD inner join User on OOTD.user_id = User.user_id;


-- 삭제 테스트
DELETE FROM OOTD WHERE user_id='1';

-- table 삭제
-- DROP TABLE User; 
-- DROP TABLE OOTD_comment; 
-- DROP TABLE OOTD_like; 
-- DROP TABLE OOTD_picture;


-- ----------------------* Back 참고용
SELECT * FROM OOTD ORDER BY heart DESC; 	-- 좋아요 수 정렬
SELECT COUNT(*) FROM OOTD WHERE user_id=1;