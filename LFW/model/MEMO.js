const Memo = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'Memo',
        {
            memo_id : {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true  
            },
            user_id: {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            memo: {
                type: DataTypes.TEXT('medium'),
                allowNull: true
            },
            create_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            update_time: {
                type: DataTypes.DATE,
                allowNull: true
            },
            delete_time: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            timestamps: false,
            tableName: 'Memo',
            freezeTableName: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    return model;
}

module.exports = Memo;