const User_OOTD_like = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'user_OOTD_like',
        {
            id : {
                type: DataTypes.string(15)
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