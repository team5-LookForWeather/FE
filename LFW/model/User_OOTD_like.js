const User_OOTD_like = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'user_OOTD_like',
        {
            id : {
                type: DataTypes.STRING(15),
                primaryKey: true
            }
        },
        {
            timestamps: false,
            tableName: 'user_OOTD_like',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = User_OOTD_like;