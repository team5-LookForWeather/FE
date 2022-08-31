const express = require("express");
const multer = require('multer');
const path = require('path');


/* 세션 확인 미들웨어 */
function checkSession(req, res, next) {

    if (req.session.user != undefined ) next();

    else {
        res.redirect('/user/login');
    }
}

// const user = req.session.user;
// res.render("index", { isLogin: true, user: user });


/* User 관련 */
const UserRouter = express.Router();
const user = require('../controller/UserController');


// 로그인 & 로그아웃

UserRouter.get("/login", user.login);   // 로그인 화면
UserRouter.post("/login", user.post_login); // 로그인 실행
UserRouter.get('/logout', checkSession, user.logout);   //로그아웃 실행


UserRouter.get("/find_id", user.find_id);   // 아이디 찾기 화면
UserRouter.post("/find_id", user.post_find_id); // 아이디 찾기 실행
UserRouter.get("/find_pw", user.find_pw);   // 비밀번호 찾기 화면
UserRouter.post("/find_pw", user.post_find_pw);    // 비밀번호 찾기 실행
UserRouter.get("/update_pw", checkSession, user.update_pw); // 비밀번호 변경 화면
UserRouter.patch("/updated_pw", user.updated_pw);   // 비밀번호 변경 실행

// 회원가입
UserRouter.get("/membership", user.membership); // 회원가입 화면
UserRouter.post("/id_check", user.id_check);    // 아이디 중복검사
UserRouter.post("/nick_check", user.nick_check);    // 닉네임 중복검사
UserRouter.post("/membership", user.post_membership);   //회원가입 실행


// profile 관련
UserRouter.get("/profile", checkSession, user.profile); // profile 화면
UserRouter.patch("/update", user.update);    // 회원정보 수정
UserRouter.delete("/delete", user.delete);  // 회원탈퇴




/* 메인페이지 관련 */
const MainRouter = express.Router();
const main = require('../controller/MainController');
MainRouter.get('/', main.index);   //메인페이지 화면
// MainRouter.post('/search', main.main_search);   //메인페이지 검색 기능
// MainRouter.get('/search', main.search_detail);  // 검색된 페이지에서 세부내용으로 이동



/* Weather 관련 */
const WeatherRouter = express.Router();
const weather = require('../controller/WeatherController');
WeatherRouter.get('/', weather.weather_index);  //weather페이지
WeatherRouter.post('/getlocation', weather.getlocation); //현위치로 날씨정보 받아오기
WeatherRouter.post('/searchlocation', weather.searchlocation); //현위치로 날씨정보 받아오기


/* OOTD 관련 */
const OotdRouter = express.Router();
const ootd = require('../controller/OotdController');
OotdRouter.get('/', ootd.ootd_index);  //ootd페이지
OotdRouter.get('/ootd-upload', ootd.ootd_upload);  //ootd 업로드 페이지


/* Memo 관련 */
const MemoRouter = express.Router();
const memo = require('../controller/MemoController');
MemoRouter.get('/', memo.index);  //memo페이지
// MemoRouter.post('/write', checkSession, memo.write);  // memo 작성



/* 게시물 상세 조회화면 로그인 확인 추가 예정 */
/* 이미지 업로드 라우터 추가 예정 */

module.exports = {
    UserRouter,
    MainRouter,
    WeatherRouter,
    OotdRouter,
    MemoRouter
}



/* 기본형식 */
// router.get("/", user.get_users);
// router.post("/write", user.post_comment);
// router.get("/get", user.get_user);
// router.patch("/edit", user.patch_comment);
// router.delete("/delete", user.delete_comment);


