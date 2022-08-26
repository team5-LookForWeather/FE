const models = require("../model");


//^ 회원가입
/* 회원가입 화면 */
exports.membership = (req, res) => {
    res.render("membership");
}

/* 회원가입 시, id 중복확인 */
exports.id_check = (req, res) => {
    models.User.findOne({
        where: { user_id: req.body.user_id }
    })
        .then((result) => {
            console.log(result)
            if (result == null) { // 기존 id가 아니면
                return res.send(true); // 사용 가능
            } else {
                return res.send(false); // 사용 불가능
            }
        })
}

/* 회원가입 시, 닉네임 중복확인 */
exports.nick_check = (req, res) => {
    models.User.findOne({
        where: { nickname: req.body.nickName }
    })
        .then((result) => {
            console.log(result)
            if (result == null) { // 기존 닉네임이 아니면
                return res.send(true); // 사용 가능
            } else {
                return res.send(false); // 사용 불가능
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
        // hint: req.body.hint,
        // hint_answer: req.body.hint_answer,
        // category1: req.body.category1,
        // category2: req.body.category2,
        // category3: req.body.category3
    }

    models.User.create(user)
        .then((result) => {
            res.send(result);
        })
}



//^ 로그인
/* 로그인 화면 */
exports.login = (req, res) => {
    res.render("login");
}

// 로그인 시스템
exports.post_login = (req, res) => {
    models.User.findOne({
        where: { user_id: req.body.user_id, pw: req.body.pw }
    }).then((result) => {
        console.log(result);
        if (result == null) {
            res.send(false);    // 로그인 실패
        } else {
            req.session.user_id = req.body.id;
            res.send(true);     // 로그인 성공
        }
    });

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
        if (result == null) {
            res.send(false);
        } else {
            res.send({ id: result.id });
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
        if (result == null) {
            res.send(false);
        } else {
            req.session.user_id = req.body.user_id;
            res.render('pw_update', { isLogin: true, user_id: req.body.user_id }); //? 비번변경 페이지 & id 전달

            // hint, answer로 확인하는 경우
            // if (req.body.hint == result.hint && req.body.hint_answer == result.hint_answer) {
            //      res.render('pw_update', { user_id: req.body.user_id }); //비번변경 페이지 & id 전달
            // }
        }
    })
}

// pw 변경
exports.pw_update = (req, res) => {
    const user_id = req.session.user_id;
    let newPW = {
        pw: req.body.pw
    };
    models.User.update(newPW, { where: { user_id: user_id } })
        .then((result) => {
            res.send({ pw: result.pw });
        });
}



// profile
exports.profile = (req, res) => {
    const user_id = req.session.user_id;

    if (user_id != undefined) {
        models.User.findOne({ where: { user_id: user_id } })
            .then((result) => {
                res.render("profile", { isLogin: true, user_id: user_id, name: result.name, tel: result.tel, email: result.email });
            })
    } else {
        res.redirect("/user");
    }
}

// update
exports.update_page = (req, res) => {
    const user = req.session.user;

    models.User.findOne({ where: { id: user } })
        .then((result) => {
            res.render("update_page", { isLogin: true, user: user, name: result.name, pw: result.pw, tel: result.tel, email: result.email });
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
            req.session.destroy(function (err) {
                res.send("탈퇴되었습니다.");
            });
        })
}