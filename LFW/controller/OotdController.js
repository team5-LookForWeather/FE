const models = require("../model");

/* OOTD 페이지 */
exports.index = async (req, res) => {
    var data = {};
    if (req.session.user != undefined) {
        data["isLogin"] = true;
        data["user"] = req.session.user;
    }
    else data["isLogin"] = false;

    let query = "select * from OOTD inner join user on ootd.user_id = user.user_id;";

    data["ootd"] = await models.sequelize.query(query, { type: models.sequelize.QueryTypes.SELECT });
    await res.render("ootd", data);
}


exports.upload = (req, res) => {
    var data = {};
    if (req.session.user != undefined) {
        data["isLogin"] = true;
        data["user"] = req.session.user;
    }
    else data["isLogin"] = false;

    res.render("ootd-upload.ejs", data);

}


// router.get("/", ootd.get_ootd);
// router.post("/write", ootd.post_ootd);
// router.get("/get", ootd.get_ootd);
// router.patch("/edit", ootd.patch_ootd);
// router.delete("/delete", ootd.delete_ootd);