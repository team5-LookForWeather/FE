const Heart = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'Heart',
        {
            heart_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            OOTD_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_id: {
                type: DataTypes.STRING(15),
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'Heart',
            freezeTableName: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    return model;
}

module.exports = Heart;