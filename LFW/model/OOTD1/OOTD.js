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
            style_tag: {
                type: DataTypes.set('#캐주얼', '#시크', '#댄디', '#포멀', '#걸리시', '#레트로', '#로맨틱', '#스포츠', '#스트릿'),
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
            freezeTableName: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    return model;
}

module.exports = OOTD;