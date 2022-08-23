const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));



//* 라우터 
// const router = require("./routes");
// app.use('/', router);



const { UserRouter } = require('./routes');
app.use('/user', UserRouter);
const { MainRouter } = require('./routes');
app.use('/', MainRouter);
const { WeatherRouter } = require('./routes');
app.use('/weather', WeatherRouter);
const { OotdRouter } = require('./routes');
app.use('/ootd', OotdRouter);
const { MemoRouter } = require('./routes');
app.use('/memo', MemoRouter);
const { MypageRouter } = require('./routes');
app.use('/mypage', MypageRouter);



//* 세션
const session = require("express-session");
app.use(session({
    secret: 'secret key'
}))


/* 세션 확인 - 메인페이지 */
app.get("/", function (req, res) {

    const user = req.session.user;
    if (user != undefined) {
        res.render("index", { isLogin: true, user: user });
    } else {
        res.render("index", { isLogin: false });
    }
});

/* 세션확인 - 로그아웃 */
app.get("/logout", (req, res) => {
    const user = req.session.user;

    req.session.destroy(function (err) {
        res.send(
            `<script>
                alert('로그아웃 성공');
                location.href='/';
            </script>`
        );
    });
})



app.listen(port, () => {
    console.log("Server Port : ", port);
});

