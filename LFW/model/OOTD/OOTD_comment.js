const OOTD_comment = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'OOTD_comment',
        {
            comment_id : {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            OOTD_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            comment: {
                type: DataTypes.TEXT('medium'),
                allowNull: false
            },
            create_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            update_time: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: ""
            },
            delete_time: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: ""
            },
            
        },
        {
            timestamps: false,
            tableName: 'OOTD_comment',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = OOTD_comment;