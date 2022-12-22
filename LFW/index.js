const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");
const https = require("https");
const options = {
    key: fs.readFileSync('./privkey.pem'),
    cert: fs.readFileSync('./cert.pem')
  };

const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const models = require("./model");
// (async () => {
//     await models.sequelize.sync();
//    })();
const multer = require('multer');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());


/* 세션 */
const session = require("express-session");
app.use(
    session({
        secret: 'SECRET',
        resave: false, //session store에 session 저장
        saveUninitialized: true,
    })
)

/* 라우터 */
const { UserRouter, MainRouter, WeatherRouter, OotdRouter, MemoRouter, MypageRouter } = require('./routes');

app.use('/user', UserRouter);   /* User 관련 경로 */
app.use('/', MainRouter);       /* 메인페이지 관련 경로 */
app.use('/weather', WeatherRouter);/* Weather 관련 경로 */
app.use('/ootd', OotdRouter);   /* OOTD 관련 경로 */
app.use('/memo', MemoRouter);   /* Community 관련 경로 */
app.use('/mypage', MypageRouter);/* Mypage 관련 경로 */


app.listen(port, () => {
    console.log("Server port : ", port);
});

https.createServer(options, app).listen("8080");