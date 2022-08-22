const User_comments = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'User_comments',
        {
            comment_id : {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true  
            },
            user_id: {
                type: DataTypes.STRING(15)
            },
            comment: {
                type: DataTypes.TEXT('medium')
            },
            create_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            update_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            delete_time: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'user_comments',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = User_comments;