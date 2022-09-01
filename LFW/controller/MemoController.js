const models = require("../model");
const { sequelize } = require("../model/index");

/* Community 페이지 */
exports.index = (req, res) => {
    var data = {};
    if (req.session.user != undefined) {
        data["isLogin"] = true;
        data["user"] = req.session.user;
    }
    else data["isLogin"] = false;

    res.render("community", data);


    // // 맨위 이동 및 표시 위해 보내줄 memo 데이터 (게시물없어도 나와야함)
    // const [memodata] = await models.sequelize.query(`
    //     SELECT study_name, study_id
    //     FROM studygroup 
    //     WHERE study_id = ${req.query.study_id}; 
    // `)


    // // memo 관련 데이터
    // const [result, metadata] = await models.sequelize.query(`
    //     SELECT Memo.*, User.nickName AS write_name
    //     FROM Memo
    //         LEFT OUTER JOIN User ON Memo.user_id = User.user_id
    //     WHERE Memo.memo_id = ${req.query.memo_id}; 
    // `);

    // console.log('memo result: ', result);



    // // 만약 memo가 하나도 없다면? 
    // var isMemo = true; // memo 있음 
    // if (result.length == 0) {
    //     isMemo = false; // memo 없음
    // }
    // console.log('memo 유무', isMemo);

    // res.render('community', { isMemo: isMemo, memoData: result, studydata: studydata[0] });
}

// /* memo 작성 */
// exports.write = (req, res) => {
//     console.log(req.body);

//     let memo = {
//         user_id: req.body.user_id,
//         nickname: req.body.nickName,
//         memo: req.body.memo
//     }

//     models.Memo.create(memo)
//         .then((result) => {
//             console.log(result);
//             res.send({ return: result, msg: '저장되었습니다.' });
//         })
// }

// /* memo 수정 */
// exports.update =
//     (req, res) => {
//         console.log(req.body);

//         let memo = {
//             user_id: req.body.user_id,
//             nickname: req.body.nickName,
//             memo: req.body.memo,
//             // category1: req.body.category1,
//             // category2: req.body.category2,
//             // category3: req.body.category3
//         }

//         models.Memo.create(memo)
//             .then((result) => {
//                 console.log(result);
//                 res.send({ return: result, msg: '수정되었습니다.' });
//             })
//     }

// /* memo 삭제 */
// exports.delete = (req, res) => {
//     console.log(req.body);

//     let memo = {
//         user_id: req.body.user_id,
//         nickname: req.body.nickName,
//         memo: req.body.memo
//         // category1: req.body.category1,
//         // category2: req.body.category2,
//         // category3: req.body.category3
//     }

//     models.Memo.destroy({ where: { id: req.session.user } })
//         .then((result) => {
//             req.session.destroy(function () {
//                 res.render('/', { isLogin: false });
//             });
//         })
// }


// router.get("/", memo.get_memos);
// router.post("/write", memo.post_memo);
// router.get("/get", memo.get_memo);
// router.patch("/edit", memo.patch_memo);
// router.delete("/delete", memo.delete_memo);
