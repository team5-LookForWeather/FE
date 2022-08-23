const express = require('express');
const router = express.Router();
const memo = require("../controller/MemoController");

// router.get('/', function any(req, res, next) {

// });


router.get("/", memo.get_memos);
router.post("/write", memo.post_memo);
router.get("/get", memo.get_memo);
router.patch("/edit", memo.patch_memo);
router.delete("/delete", memo.delete_memo);


module.exports = router;