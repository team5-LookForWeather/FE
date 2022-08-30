const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const cors = require("cors");
const path = require("path");
const sequelize = require('./model').sequelize;
sequelize.sync();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


/* 세션 */
const session = require("express-session");
app.use(
    session({
        secret: 'SECRET',
        resave: false, //session store에 session 저장
        saveUninitialized: true,
        // store: sessionStore,
        // cookie: {     //session ID cookie의 객체 세팅
        //     maxAge: 24000 * 60 * 60,
        //     HttpOnly: true,
        //     secure: true,
        // }
    }))



/* 라우터 */
const { UserRouter, MainRouter, WeatherRouter, OotdRouter, MemoRouter } = require('./routes');

app.use('/user', UserRouter);/* User 관련 경로 */
app.use('/', MainRouter);/* 메인페이지 관련 경로 */
app.use('/weather', WeatherRouter);/* Weather 관련 경로 */
app.use('/ootd', OotdRouter);/* OOTD 관련 경로 */
app.use('/memo', MemoRouter);/* Memo 관련 경로 */


app.listen(8000, () => {
    console.log("Server 8000 : ", 8000);
});

