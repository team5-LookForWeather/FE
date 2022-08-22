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
db.User_OOTD = require("./User_OOTD")(sequelize, Sequelize);
db.User_OOTD_picture = require("./User_OOTD_picture")(sequelize, Sequelize);
db.User_OOTD_like = require("./User_OOTD_like")(sequelize, Sequelize);
db.User_OOTD_comment = require("./User_OOTD_comment")(sequelize, Sequelize);
db.User_comments = require("./User_comments")(sequelize, Sequelize);

db.User.hasMany(db.User_OOTD, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "cascade"
});
db.User_OOTD.belongsTo(db.User, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "cascade"
})

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