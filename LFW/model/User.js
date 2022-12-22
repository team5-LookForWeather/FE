const User = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        //모델 이름
        'User',
        // 컬럼 정의
        {
            user_id: {
                type: DataTypes.STRING(15),
                allowNull: false,
                primaryKey: true,
            },
            pw: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            tel: {
                type: DataTypes.STRING(13),
                allowNull: true,
                defaultValue: "",
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            gender: {
                type: DataTypes.ENUM('F', 'M', ''),
                allowNull: true,
                defaultValue: "",
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: true,
            }
        },
        // 모델 옵션
        {
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
            timestamps: false,
            tableName: 'User',
            freezeTableName: true,
        }
    );
    return model;
}
module.exports = User;