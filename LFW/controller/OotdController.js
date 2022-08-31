const models = require("../model");

exports.ootd_index = async (req, res) => {
    var data = {};
    if (req.session.user != undefined) data["isLogin"] = true;
    else data["isLogin"] = false;

    let query = "select * from ootd inner join user on ootd.user_id = user.user_id;";

    data["ootd"] = await models.sequelize.query(query, {type: models.sequelize.QueryTypes.SELECT});
    await res.render("ootd", data);
}


exports.ootd_upload = (req, res) => {
    res.render("ootd-upload.ejs");

}


// router.get("/", ootd.get_ootds);
// router.post("/write", ootd.post_ootd);
// router.get("/get", ootd.get_ootd);
// router.patch("/edit", ootd.patch_ootd);
// router.delete("/delete", ootd.delete_ootd);