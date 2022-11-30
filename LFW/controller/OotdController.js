const models = require("../model");
const fs = require('fs').promises;

/* OOTD 페이지 */
exports.index = async (req, res) => {
    var data = {};
    if (req.session.user != undefined) {
        data["isLogin"] = true;
        data["user"] = req.session.user;
    }
    else data["isLogin"] = false;

    let query = "select * from OOTD inner join User on OOTD.user_id = User.user_id;";
    data["ootd"] = await models.sequelize.query(query, { type: models.sequelize.QueryTypes.SELECT });
    await res.render("ootd", data);
}


exports.upload_index = (req, res) => {
    var data = {};
    if (req.session.user != undefined) {
        data["isLogin"] = true;
        data["user"] = req.session.user;
    }
    else data["isLogin"] = false;

    res.render("ootd-upload.ejs", data);

}


exports.upload = async (req, res) => {
    let styletag = "";
    for (var i = 0; i < req.body.style_tag.length; i++) {
        styletag = styletag + req.body.style_tag[i];
    }
    let img = {
        user_id: req.session.user,
        style_tag: styletag,
        content: req.body.comment,
    }
    let result = await models.OOTD.create(img);
    console.log( req.file );

    await fs.rename(`public/image/ootd/${req.file.filename}`, `public/image/ootd/${result.OOTD_id}.jpg`);

    await res.redirect("/ootd");
}

// router.get("/", ootd.get_ootd);
// router.post("/write", ootd.post_ootd);
// router.get("/get", ootd.get_ootd);
// router.patch("/edit", ootd.patch_ootd);
// router.delete("/delete", ootd.delete_ootd);