const OOTD = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'OOTD',
        {
            OOTD_id : {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
                
            },
            user_id: {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            OOTD_img: {
                type: DataTypes.STRING(200),
                allowNull: false
            },
            hashTag: {
                type: DataTypes.STRING(20),
                allowNull: true,
                defaultValue: ""

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
            comment: {
                type: DataTypes.TEXT('medium'),
                allowNull: true,
                defaultValue: ""
            },
            like: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: ""
            }
        },
        {
            timestamps: false,
            tableName: 'OOTD',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = OOTD;