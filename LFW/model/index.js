const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];
const { Op } = require('sequelize');
const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;


db.User = require("./User")(sequelize, Sequelize);
db.OOTD = require("./OOTD.js")(sequelize, Sequelize);
// db.OOTD_picture = require("./OOTD1/OOTD_picture.js")(sequelize, Sequelize);
db.OOTD_like = require("./OOTD_like.js")(sequelize, Sequelize);
db.OOTD_comment = require("./OOTD_comment.js")(sequelize, Sequelize);
db.Memo = require("./MEMO.js")(sequelize, Sequelize);
db.Codi = require("./Codi.js")(sequelize, Sequelize);

db.User.hasMany(db.OOTD, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});
db.OOTD.belongsTo(db.User, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});


db.User.hasMany(db.OOTD_comment, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});
db.OOTD_comment.belongsTo(db.User, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});

db.OOTD.hasMany(db.OOTD_comment, {
    foreignKey: "OOTD_id",
    sourceKey: "OOTD_id",
    onDelete: "cascade"
});
db.OOTD_comment.belongsTo(db.OOTD, {
    foreignKey: "OOTD_id",
    sourceKey: "OOTD_id",
    onDelete: "cascade"
});



db.User.hasMany(db.OOTD_like, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});
db.OOTD_like.belongsTo(db.User, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});


db.OOTD.hasMany(db.OOTD_like, {
    foreignKey: "OOTD_id",
    sourceKey: "OOTD_id",
    onDelete: "cascade"
});
db.OOTD_like.belongsTo(db.OOTD, {
    foreignKey: "OOTD_id",
    sourceKey: "OOTD_id",
    onDelete: "cascade"
})

db.User.hasMany(db.Memo, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});
db.Memo.belongsTo(db.User, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
})

db.User.hasMany(db.Codi, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});
db.Codi.belongsTo(db.User, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
})
module.exports = db;