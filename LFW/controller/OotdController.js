const models = require("../model");

exports.ootd_index = (req, res) => {
    res.render("ootd-notice");
}


// router.get("/", ootd.get_ootds);
// router.post("/write", ootd.post_ootd);
// router.get("/get", ootd.get_ootd);
// router.patch("/edit", ootd.patch_ootd);
// router.delete("/delete", ootd.delete_ootd);