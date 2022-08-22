const express = require('express');
const router = express.Router();
const ootd = require("../controller/OotdController");

// router.get('/', function any(req, res, next) {

// });


router.get("/", ootd.get_ootds);
router.post("/write", ootd.post_ootd);
router.get("/get", ootd.get_ootd);
router.patch("/edit", ootd.patch_ootd);
router.delete("/delete", ootd.delete_ootd);


module.exports = router;