const express = require("express");
const router = express.Router();
const weather = require("../controller/WeatherController");

//* weather메뉴
router.get("/", weather.get);


//* 위치검색 - 날씨api
router.post("/getlocation", weather.getlocation);
router.post("/searchlocation", weather.searchlocation);



module.exports = router;