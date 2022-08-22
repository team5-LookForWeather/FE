const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const port = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(session({
    secret: 'secret key'
}))



//* 라우터 정리
const userRouter = require("./routes/user");
const weatherRouter = require("./routes/weather");
const ootdRouter = require("./routes/ootd");
const memoRouter = require("./routes/memo");
const mypageRouter = require("./routes/mypage");

app.use('/user', userRouter);
app.use('/weather', weatherRouter);
app.use('/ootd', ootdRouter);
app.use('/memo', memoRouter);
app.use('/mypage', mypageRouter);




//* 세션 확인 - 메인페이지
app.get("/", function (req, res) {

    const user = req.session.user;
    if (user != undefined) {
        res.render("index", { isLogin: true, user: user });
    } else {
        res.render("index", { isLogin: false });
    }
});

//* 세션확인 - 로그아웃
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

