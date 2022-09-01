const models = require("../model");

/* Mypage 페이지 */
exports.index = async (req, res) => {
    var data = {};
    if (req.session.user != undefined) {
        data["isLogin"] = true;
        data["user"] = req.session.user;
    }
    else data["isLogin"] = false;

    // let query = "select * from ootd inner join user on ootd.user_id = user.user_id;";

    // data["ootd"] = await models.sequelize.query(query, { type: models.sequelize.QueryTypes.SELECT });
    await res.render("mypage", data);
}