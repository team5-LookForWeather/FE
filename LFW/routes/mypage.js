const express = require('express');
const router = express.Router();
const mypage = require("../controller/MypageController");

// router.get('/', function any(req, res, next) {

// });


router.get("/", mypage.get_mypages);
router.post("/write", mypage.post_mypage);
router.get("/get", mypage.get_mypage);
router.patch("/edit", mypage.patch_mypage);
router.delete("/delete", mypage.delete_mypage);


module.exports = router;