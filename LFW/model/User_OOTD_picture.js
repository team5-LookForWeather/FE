const User_OOTD_picture = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'user_OOTD_picture',
        {
            OOTD_id : {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            filename : {
                type: DataTypes.STRING(20)
            }
        },
        {
            timestamps: false,
            tableName: 'user_OOTD_picture',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = User_OOTD_picture;