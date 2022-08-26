const express = require("express");
const multer = require('multer');
const path = require('path');



/* User 관련 */
const UserRouter = express.Router();
const user = require('../controller/UserController');

// 회원가입
UserRouter.get("/membership", user.membership);
UserRouter.post("/id_check", user.id_check);
UserRouter.post("/nick_check", user.nick_check);
UserRouter.post("/membership", user.post_membership);

// 로그인
UserRouter.get("/login", user.login);
UserRouter.post("/login", user.post_login);

// id 찾기
UserRouter.get("/find_id", user.find_id);
UserRouter.post("/find_id", user.post_find_id);

// pw 찾기
UserRouter.get("/find_pw", user.find_pw);
UserRouter.post("/find_pw", user.post_find_pw);
UserRouter.patch("/find_pw/pw_update", checkSession, user.pw_update);

// profile
UserRouter.get("/profile", checkSession, user.profile);

// update
UserRouter.get("/update", user.update_profile);
UserRouter.patch("/update", user.update);

// delete
UserRouter.delete("/delete", user.delete);


//! /* 로그인 확인 미들웨어 */
function checkSession(req, res, next) {
    if (req.session.user_id != null) next();
    else {
        res.redirect('/user/login');
    }
}



/* 메인페이지 관련 */
const MainRouter = express.Router();
const main = require('../controller/MainController');
MainRouter.get('/', main.main_index);   //메인페이지 화면
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
MemoRouter.get('/', memo.memo_index);  //memo페이지



/* Mypage 관련 */
const MypageRouter = express.Router();
const mypage = require('../controller/MypageController');
MypageRouter.get('/', mypage.mypage_index);  //mypage페이지




/* 게시물 상세 조회화면 로그인 확인 추가 예정 */
/* 이미지 업로드 라우터 추가 예정 */

module.exports = {
    UserRouter,
    MainRouter,
    WeatherRouter,
    OotdRouter,
    MemoRouter,
    MypageRouter
}



/* 기본형식 */
// router.get("/", user.get_users);
// router.post("/write", user.post_comment);
// router.get("/get", user.get_user);
// router.patch("/edit", user.patch_comment);
// router.delete("/delete", user.delete_comment);


