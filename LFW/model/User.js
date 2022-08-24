const User = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'User',
        {
            user_id : {
                type: DataTypes.STRING(15),
                allowNull: false,
                primaryKey: true
            },
            pw: {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            nickname: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            tel: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: ""
            },
            email: {
                type: DataTypes.STRING(30),
                allowNull: false
            },
            gender: {
                type: DataTypes.ENUM('F','M',''),
                allowNull: true,
                defaultValue: ""
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            }          
        },
        {
            timestamps: false,
            tableName: 'user',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = User;