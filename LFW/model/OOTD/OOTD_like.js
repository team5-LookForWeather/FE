const OOTD_like = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'OOTD_like',
        {
            OOTD_like_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            OOTD_id : {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_id : {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            OOTD_like: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            timestamps: false,
            tableName: 'OOTD_like',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = OOTD_like;