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
db.Heart = require("./Heart.js")(sequelize, Sequelize);
db.Comment = require("./Comment.js")(sequelize, Sequelize);
db.Memo = require("./Memo.js")(sequelize, Sequelize);
db.Codi = require("./Codi.js")(sequelize, Sequelize);


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


db.User.hasMany(db.Heart, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});
db.Heart.belongsTo(db.User, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});

db.OOTD.hasMany(db.Heart, {
    foreignKey: "OOTD_id",
    sourceKey: "OOTD_id",
    onDelete: "cascade"
});
db.Heart.belongsTo(db.OOTD, {
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


db.User.hasMany(db.Comment, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});
db.Comment.belongsTo(db.User, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "cascade"
});


module.exports = db;