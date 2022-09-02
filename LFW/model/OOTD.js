const OOTD = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'OOTD',
        {
            OOTD_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            style_tag: {
                type: DataTypes.STRING(200),
                allowNull: true,
                defaultValue: ""
            },
            content: {
                type: DataTypes.TEXT('medium'),
                allowNull: true
            },
            heart: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            create_time: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false
            },
            update_time: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'OOTD',
            freezeTableName: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    return model;
}

module.exports = OOTD;