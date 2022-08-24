const models = require("../model");

// login
exports.login = (req, res) => {
    res.render("login");
}

exports.post_login = (req, res) => {
    console.log(req.body);

    models.User.findOne({
        where: { id: req.body.id, pw: req.body.pw }
    }).then((result) => {
        console.log(result);
        if (result == null) {
            res.send(false);
        } else {
            req.session.user = req.body.id;
            res.send(true);
        }
    })
}

// find id
exports.find_id = (req, res) => {
    res.render("find_id");
}

exports.post_find_id = (req, res) => {
    models.User.findOne({
        where: { name: req.body.name, email: req.body.email }
    }).then((result) => {
        if (result == null) {
            res.send(false);
        } else {
            res.send(true);
        }
    })
}

exports.find_id_result = (req, res) => {
    models.User.findOne({
        where: { name: req.body.name, email: req.body.email }
    }).then((result) => {
        res.render("find_id_result", { id: result.id });
    })
}


// find password
exports.find_pw = (req, res) => {
    res.render("find_pw");
}

exports.post_find_pw = (req, res) => {
    models.User.findOne({
        where: { id: req.body.id, email: req.body.email }
    }).then((result) => {
        if (result == null) {
            res.send(false);
        } else {
            res.send(true);
        }
    })
}

exports.find_pw_result = (req, res) => {
    models.User.findOne({
        where: { id: req.body.id, email: req.body.email }
    }).then((result) => {
        res.render("find_pw_result", { pw: result.pw });
    })
}


// 회원가입
exports.membership = (req, res) => {
    res.render("membership.ejs");
}

exports.post_membership = (req, res) => {
    console.log( req.body );
    let user = {
        user_id : req.body.$user_id,
        pw : req.body.$pw,
        name : req.body.$name,
        nickname : req.body.$nickName,
        tel : req.body.$tel,
        email : req.body.$email,
        gender : req.body.$gender,
        age : req.body.$age
    }

    models.User.create(user)
        .then((result) => {
            console.log(result);
            res.send("성공적으로 회원가입 되었습니다. 가입하신 정보로 다시 로그인해주세요.");
        })
}


// register
exports.register = (req, res) => {
    res.render("register");
}

exports.id_check = (req, res) => {
    models.User.findOne({
        where: { id: req.body.id }
    })
        .then((result) => {
            if (result == null) {
                res.send(true);
            } else {
                res.send(false);
            }
        });
}

exports.post_register = (req, res) => {
    let object = {
        id: req.body.id,
        pw: req.body.pw,
        name: req.body.name,
        tel: req.body.tel,
        email: req.body.email
    }
    models.User.create(object)
        .then((result) => {
            console.log(result);
            res.send("성공적으로 회원가입 되었습니다. 가입하신 정보로 다시 로그인해주세요.");
        })
}



// profile
exports.profile = (req, res) => {
    const user = req.session.user;

    if (user != undefined) {
        models.User.findOne({ where: { id: user } })
            .then((result) => {
                res.render("profile", { isLogin: true, user: user, name: result.name, tel: result.tel, email: result.email });
            })
    } else {
        res.redirect("/user");
    }
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