const models = require("../model");


/* 로그인 화면 */
exports.login = (req, res) => {
    res.render("login");
}

// 로그인 
exports.post_login = (req, res) => {
    models.User.findOne({
        where: { user_id: req.body.id, pw: req.body.pw }
    }).then((result) => {
        console.log(result);

        if (result != null) {   // 로그인 성공
            req.session.regenerate(function () {
                req.session.user = req.body.id;    //! 세션 셍성
                req.session.save(function () {          //! 세션 저장
                    res.send({ return: true, msg: '로그인 성공' });
                })
            })
        } else {    // 로그인 실패
            res.send({ return: false, msg: '로그인 실패!' });
        }
    })
}

// 로그아웃
exports.logout = (req, res) => {
    req.session.destroy(function (err) {
        if (err) throw err;
        res.redirect('/');
    });
}
// /* 세션확인 - 로그아웃 */
// app.get('/logout', (req, res) => {
//     const user = req.session.user;

//     req.session.destroy(function (err) {
//         res.send(
//             `<script>
//                 alert('로그아웃 성공');
//                 location.href='/';
//             </script>`
//         );
//     });
// });


//^ 회원가입
/* 회원가입 화면 */
exports.membership = (req, res) => {
    res.render("membership");
}

/* 회원가입 시, id 중복확인 */
exports.id_check = (req, res) => {
    console.log("id_check");
    models.User.findOne({
        where: { user_id: req.body.user_id }
    })
        .then((result) => {
            console.log(result)
            if (result == null) { // 기존 id가 아니면
                return res.send({ return: true, msg: '사용 가능한 아이디입니다.' }); // 사용 가능
            } else {
                return res.send({ return: false, msg: '사용할 수 없는 아이디입니다.' });// 사용 불가능
            }
        })
}

/* 회원가입 시, 닉네임 중복확인 */
exports.nick_check = (req, res) => {
    console.log("nick_check");
    models.User.findOne({
        where: { nickname: req.body.nickName }
    })
        .then((result) => {
            console.log(result)
            if (result == null) { // 기존 닉네임이 아니면
                return res.send({ return: true, msg: '사용 가능한 닉네임입니다.' }); // 사용 가능
            } else {
                return res.send({ return: false, msg: '사용할 수 없는 닉네임입니다.' });// 사용 불가능
            }
        })
}

/* 회원가입 시, User 정보 저장 */
exports.post_membership = (req, res) => {
    console.log(req.body);

    let user = {
        user_id: req.body.user_id,
        pw: req.body.pw,
        name: req.body.name,
        nickname: req.body.nickName,
        tel: req.body.tel,
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age,
        // category1: req.body.category1,
        // category2: req.body.category2,
        // category3: req.body.category3
    }

    models.User.create(user)
        .then((result) => {
            console.log(result);
            res.send({ return: result, msg: '회원가입을 축하드립니다.' });
        })
}


// id 찾기
exports.find_id = (req, res) => {
    res.render("find_id.ejs");
}
exports.post_find_id = (req, res) => {
    models.User.findOne({
        where: { name: req.body.name, email: req.body.email }
    }).then((result) => {
        // console.log('아이디찾기 실행 :', result);
        if (result != null) {
            res.send({ return: true, user_id: result.user_id });
        } else {
            res.send({ return: false, msg: '아이디를 찾을 수 없습니다.' });
        }
    })
}

// pw 찾기
exports.find_pw = (req, res) => {
    res.render("find_pw");
}
exports.post_find_pw = (req, res) => {
    models.User.findOne({
        where: { user_id: req.body.user_id, email: req.body.email }
    }).then((result) => {
        if (result != null) {
            req.session.user = req.body.id;    //! 세션 셍성
            req.session.save(function () {          //! 세션 저장
                // 로그인처리 & pw변경 페이지에 user_id 전달
                res.send({ isLogin: true, return: true, msg: '로그인 성공' });
            })
        } else {
            res.send({ return: false, msg: '비밀번호를 찾을 수 없습니다.' });
        }
    })
}

// pw 변경
exports.pw_update = (req, res) => {
    let newPW = {
        pw: req.body.pw
    };
    models.User.update(newPW, { where: { user_id: req.session.user } })
        .then((result) => {
            res.send({ pw: result.pw });
        });
}

// profile
exports.profile = (req, res) => {
    const user = req.session.user;
    if (user != undefined) {
        models.User.findOne({ where: { user_id: req.body.user_id } })
            .then((result) => {
                res.render("profile", { isLogin: true, user: user, user_id: result.user_id, name: result.name, tel: result.tel, email: result.email });
            })
    } else {
        res.redirect("/user/login");
    }
}

// update
exports.update_page = (req, res) => {
    const user = req.session.user;
    models.User.findOne({ where: { user_id: req.body.user_id } })
        .then((result) => {
            res.render("update_page", { isLogin: true, user: user, user_id: result.user_id, name: result.name, pw: result.pw, tel: result.tel, email: result.email });
        });
}

exports.update = (req, res) => {
    let obj = {
        pw: req.body.pw,
        name: req.body.name,
        tel: req.body.tel,
        email: req.body.email
    }
    models.User.update(obj, { where: { id: req.body.id } })
        .then((result) => {
            res.send("회원정보가 수정되었습니다.")
        })
}

// delete
exports.delete = (req, res) => {
    console.log(req.body);
    models.User.destroy({ where: { id: req.body.id } })
        .then((result) => {
            req.session.destroy(function () {
                res.render('/', { isLogin: false });
            });
        })
}