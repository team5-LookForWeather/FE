const Comment = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'Comment',
        {
            comment_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            comment_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            user_id: {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            comment: {
                type: DataTypes.TEXT('medium'),
                allowNull: false
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
            },

        },
        {
            timestamps: false,
            tableName: 'Comment',
            freezeTableName: true,
            charset: "utf8",

            collate: "utf8_general_ci"
        }
    );
    return model;
}

module.exports = Comment;