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

CREATE TABLE `Codi` (
	`codi_id`	int	NOT NULL primary key auto_increment	COMMENT '코디 식별값',
	`user_id`	varchar(15)	NOT NULL,
	`codi_img` 	varchar(200) NULL COMMENT '이미지 파일명.확장자',
	`codi_stage`	int NULL,
    foreign key (user_id) references User(user_id)
);

CREATE TABLE `OOTD` (
	`OOTD_id`	int	NOT NULL primary key auto_increment	COMMENT 'ootd 게시글 식별값',
	`user_id`	varchar(15)	NOT NULL,	
	`style_tag`	varchar(100) NULL,
	`content`	mediumtext	NULL	COMMENT '옷에 대한 간략한 정보 적게',
	`heart`	int	NULL	DEFAULT 0 COMMENT '좋아요 기능',
	`CREATE_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP,
	`update_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (user_id) references User(user_id)
);

CREATE TABLE `Heart` (
	`heart_id`	INT	NOT NULL primary key auto_increment ,
	`OOTD_id`	int	NOT NULL,
	`user_id`	varchar(15)	NOT NULL,
    foreign key (user_id) references User(user_id),
    foreign key (OOTD_id) references OOTD(OOTD_id)
);

CREATE TABLE `Memo` (
	`memo_id`	int	NOT NULL primary key auto_increment	COMMENT '메모 식별값',
	`user_id`	varchar(15)	NOT NULL,
	`memo`	mediumtext	NULL	COMMENT '메모 내용',
	`CREATE_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP,
	`update_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (user_id) references User(user_id)
);

CREATE TABLE `Comment` (
	`comment_id`	int	NOT NULL primary key auto_increment COMMENT '코멘트 식별값',
	`comment_date` DATE NOT NULL,
	`user_id`	varchar(15)	NOT NULL,
	`comment`	mediumtext NULL COMMENT '코멘트 내용',
	`CREATE_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP,
	`update_time`	DATETIME	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (user_id) references User(user_id)
);

-- ------------------------------------------------* 테스트 코드

-- 기본 명령어 --
SHOW DATABASES;	-- DB 확인
SHOW TABLES;	-- 테이블 확인
SHOW COLUMNS FROM User;	-- 'User'테이블의 컬럼 확인 

-- 조회 테스트
SELECT * FROM User;		-- 'User'테이블의 데이터 확인
SELECT * FROM Codi;		-- 'Codi'테이블의 데이터 확인
SELECT * FROM OOTD;		-- 'OOTD'테이블의 데이터 확인
SELECT * FROM Heart;
SELECT * FROM Memo;		-- 'Memo'테이블의 데이터 확인
SELECT * FROM Comment;	-- 'Comment'테이블의 데이터 확인


-- 로그인 테스트
insert into User(user_id, pw, name, nickname, tel, email, gender, age) values('1','1234','최상훈','choi','010-1234-5678','choi@naver.com','M',20);
insert into User(user_id, pw, name, nickname, tel, email, gender, age) values('idle','1234','정예현','idle','010-1234-5678','idle@naver.com','F',25);
insert into User(user_id, pw, name, nickname, tel, email, gender, age) values('sesac','1234','sesac','sesac','010-1234-5678','sesac@naver.com','F',33);		

-- OOTD게시물 테스트
insert into OOTD(`OOTD_id`, `user_id`, `style_tag`, `content`, `heart`) values(1,'1','#캐주얼','화창한 날씨에 입는 캐주얼룩','3');	
insert into OOTD(`OOTD_id`, `user_id`, `style_tag`, `content`, `heart`) values(2,'idle','#스포츠#스트릿','운동하기 딱조아','5');


-- Community - Memo 테스트
insert into memo (`memo_id`, `user_id`, `memo`) values( 1, '1', '이제 제법 서늘하네요. 다들 트렌치코트 꺼내기~ ^^');
insert into memo (`memo_id`, `user_id`, `memo`) values( 2, 'idle', '다음주 태풍이래요!! 아 놀러가고싶었는데..ㅠㅠ');


-- Mypage - Comment 테스트
insert into comment (`comment_id`, `comment_date`, `user_id`, comment) values( 1,'2022-08-19', '1', '가을 좋아~ 이 날씨를 기다렸지');
insert into comment (`comment_id`, `comment_date`, `user_id`, comment) values( 2,'2022-08-30', '1', '헉 춥다 외투꺼내자!');
insert into comment (`comment_id`, `comment_date`, `user_id`, comment) values( 3,'2022-09-02', 'idle', '9월 시작! 졸리다..ㅋㅋ');


-- OOTD게시물 삭제 테스트
DELETE FROM OOTD WHERE user_id='1';


-- ----------------------* Back 참고용
SELECT * FROM OOTD ORDER BY heart DESC; 	-- 좋아요 수로 OOTD 정렬(내림차순)

SELECT * FROM OOTD WHERE user_id=1;			-- 특정 유저의 OOTD 모음
SELECT COUNT(*) FROM OOTD WHERE user_id=1;	-- 특정 유저의 OOTD 총합

SELECT * FROM Heart WHERE user_id=1;		-- 특정 유저의 좋아요 모음
SELECT COUNT(*) FROM Heart WHERE user_id=1;	-- 특정 유저의 좋아요 총합

SELECT * FROM Memo WHERE user_id=1;			-- 특정 유저의 메모 모음
SELECT COUNT(*) FROM Memo WHERE user_id=1;	-- 특정 유저의 메모 총합

SELECT * FROM Comment WHERE user_id=1;		-- 특정 유저의 코멘트 모음


-- 규리쌤이 알려주신 join
SELECT distinct(OOTD.user_id) from OOTD inner join User on OOTD.user_id = User.user_id;	-- OOTD 작성자 총 조회


-- table 삭제
-- DROP TABLE User; 
-- DROP TABLE Heart; 
DROP database LFW;

