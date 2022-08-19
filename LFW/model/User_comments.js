const User_comments = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'User_comments',
        {
            comment_id : {
                type: DataTypes.int,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true  
            },
            user_id: {
                type: DataTypes.STRING(15)
            },
            comment: {
                type: DataTypes.text('medium')
            },
            create_time: {
                type: DataTypes.date,
                allowNull: false
            },
            update_time: {
                type: DataTypes.date,
                allowNull: false
            },
            delete_time: {
                type: DataTypes.date,
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