const User_OOTD = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'user_OOTD',
        {
            id : {
                type: DataTypes.INTEGER(3),
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
                
            },
            user_id: {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            create_time: {
                type: DataTypes.DATE(),
                allowNull: false
            },
            update_time: {
                type: DataTypes.DATE(),
                allowNull: false
            },
            delete_time: {
                type: DataTypes.DATE(),
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'user_OOTD',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = User_OOTD;