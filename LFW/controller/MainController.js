const models = require("../model");

/* 세션 확인 - 메인페이지 */
exports.index = (req, res) => {
    const user = req.session.user;

    if (user != undefined) {
        res.render("main", { isLogin: true, user: user });
    } else {
        res.render("main", { isLogin: false });
    }
}

/* 세션확인 - 로그아웃 */
exports.logout = (req, res) => {
    const user = req.session.user;

    req.session.destroy(function (err) {
        res.send(
            `<script>
                alert('로그아웃 성공');
                location.href='/';
            </script>`
        );
    });
}