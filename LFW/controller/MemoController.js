const models = require("../model");
const { sequelize } = require("../model/index");

exports.memo_index = (req, res) => {
    res.render("community");
}




// router.get("/", memo.get_memos);
// router.post("/write", memo.post_memo);
// router.get("/get", memo.get_memo);
// router.patch("/edit", memo.patch_memo);
// router.delete("/delete", memo.delete_memo);
