module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users', {
            id: {
                type: DataTypes.STRING,
            },
            userId: {
                type: DataTypes.BIGINT,
                primaryKey : true,
                autoIncrement : true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull : false
            },
            password: {
                type:DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                allowNull : false,
            }
        }
    );
    return users;
}