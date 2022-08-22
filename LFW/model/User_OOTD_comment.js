const User_OOTD_comment = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'User_OOTD_comment',
        {
            comment_id : {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            comment: {
                type: DataTypes.TEXT('medium'),
                allowNull: false
            },
            OOTD_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'User_OOTD_comment',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = User_OOTD_comment;