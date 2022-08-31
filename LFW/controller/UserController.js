const models = require("../model");

// 로그인 화면
exports.login = (req, res) => {
    res.render("login");
}

// 로그인 실행
exports.post_login = (req, res) => {
    models.User.findOne({
        where: { user_id: req.body.id, pw: req.body.pw }
    }).then((result) => {
        console.log(result);

        if (result != null) {   // 로그인 성공
            req.session.regenerate(function () {
                req.session.user = req.body.id;     //! 세션 셍성
                req.session.save(function () {      //! 세션 저장
                    res.send({ return: true, msg: '로그인 성공' });
                })
            })
        } else {    // 로그인 실패
            res.send({ return: false, msg: '로그인 실패!' });
        }
    })
}

//로그아웃 실행
exports.logout = (req, res) => {
    req.session.destroy(function (err) {
        if (err) throw err;
        res.redirect('/');
    });
}





// 아이디 찾기 화면
exports.find_id = (req, res) => {
    res.render("find_id.ejs");
}
// 아이디 찾기 실행
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

// 비밀번호 찾기 화면
exports.find_pw = (req, res) => {
    res.render("find_pw");
}
// 비밀번호 찾기 실행
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

// 비밀번호 변경 화면
exports.update_pw = (req, res) => {
    res.render("update_pw");
}

// 비밀번호 변경 실행
exports.updated_pw = (req, res) => {
    let newPW = {
        pw: req.body.pw
    };

    models.User.update(newPW, { where: { user_id: req.session.user } })
        .then((result) => {
            res.send({ pw: result.pw });
        });
}



// 회원가입 화면
exports.membership = (req, res) => {
    res.render("membership");
}

// 아이디 중복검사
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

// 닉네임 중복검사
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

//회원가입 실행
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




// profile 화면
exports.profile = (req, res) => {
    var data = {};
    if (req.session.user != undefined) data["isLogin"] = true;
    else data["isLogin"] = false;

    models.User.findOne({ where: { user_id: req.session.user } })
        .then((result) => {
            res.render("profile", { isLogin: true, user: req.session.user, user_id: result.user_id, pw: result.pw, name: result.name, tel: result.tel, email: result.email });
        })
}

// 회원정보수정
exports.update = (req, res) => {
    let user = {
        pw: req.body.pw,
        name: req.body.name,
        tel: req.body.tel,
        email: req.body.email
    }
    models.User.update(user, { where: { id: req.body.id } })
        .then((result) => {
            res.send("회원정보가 수정되었습니다.")
        })
}

// 회원탈퇴
exports.delete = (req, res) => {
    console.log(req.body);
    models.User.destroy({ where: { id: req.body.id } })
        .then((result) => {
            req.session.destroy(function () {
                res.render('/', { isLogin: false });
            });
        })
}