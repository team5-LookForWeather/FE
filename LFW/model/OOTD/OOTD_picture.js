const OOTD_picture = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'OOTD_picture',
        {
            OOTD_img : {
                type: DataTypes.STRING(200),
                primaryKey: true,
                allowNull: false,
            },
            OOTD_id : {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_id : {
                type: DataTypes.STRING(15),
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'OOTD_picture',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = OOTD_picture;