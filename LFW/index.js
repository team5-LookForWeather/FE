/* .env 파일에서 환경변수 불러오기 */
require("dotenv").config();
const { PORT, SECRET, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PW } = process.env;


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
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());


// const MySQLStore = require('express-mysql-session')(session);
// const options = {
//     host: DB_HOST,
//     port: DB_PORT,
//     user: DB_USER,
//     password: DB_PW,
//     database: DB_NAME
// };
// const sessionStore = new MySQLStore(options);


/* 세션 */
const session = require("express-session");
app.use(
    session({
        secret: SECRET,
        resave: false, //session store에 session 저장
        saveUninitialized: true,
        // store: sessionStore,
        // cookie: {     //session ID cookie의 객체 세팅
        //     maxAge: 24000 * 60 * 60,
        //     HttpOnly: true,
        //     // secure: true,
        // }
    }))



/* 라우터 */
const { UserRouter, MainRouter, WeatherRouter, OotdRouter, MemoRouter } = require('./routes');

app.use('/user', UserRouter);/* User 관련 경로 */
app.use('/', MainRouter);/* 메인페이지 관련 경로 */
app.use('/weather', WeatherRouter);/* Weather 관련 경로 */
app.use('/ootd', OotdRouter);/* OOTD 관련 경로 */
app.use('/memo', MemoRouter);/* Memo 관련 경로 */


app.listen(PORT, () => {
    console.log("Server Port : ", PORT);
});

