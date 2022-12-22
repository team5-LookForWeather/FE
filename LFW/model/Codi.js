const Codi = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'Codi',
        {
            codi_id : {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true 
            },
            user_id: {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            codi_img: {
                type: DataTypes.STRING(200),
                allowNull: false
            },
            codi_stage: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'Codi',
            freezeTableName: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    return model;
}

module.exports = Codi;