const User_OOTD_comment = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'User_OOTD_comment',
        {
            comment_id : {
                type: DataTypes.int,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            comment: {
                type: DataTypes.text('medium'),
                allowNull: false
            },
            OOTD_id: {
                type: DataTypes.int,
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