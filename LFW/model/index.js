const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];

const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.OOTD = require("../OOTD/OOTD")(sequelize, Sequelize);
db.OOTD_picture = require("../OOTD/OOTD_picture")(sequelize, Sequelize);
db.OOTD_like = require("../OOTD/OOTD_like")(sequelize, Sequelize);
db.OOTD_comment = require("../OOTD/OOTD_comment")(sequelize, Sequelize);
db.Memo = require("../MEMO/memo")(sequelize, Sequelize);

// db.User.hasMany(db.User_OOTD, {
//     foreignKey: "user_id",
//     sourceKey: "id",
//     onDelete: "cascade"
// });
// db.User_OOTD.belongsTo(db.User, {
//     foreignKey: "user_id",
//     sourceKey: "id",
//     onDelete: "cascade"
// })

// db.User.hasMany(db.User_OOTD_, {
//     foreignKey: "user_id",
//     sourceKey: "id",
//     onDelete: "cascade"
// });
// db.OOTD.belongsTo(db.User, {
//     foreignKey: "user_id",
//     sourceKey: "id",
//     onDelete: "cascade"
// })


module.exports = db;