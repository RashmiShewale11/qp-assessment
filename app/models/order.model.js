module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define(
        'orders', {
            orderId: {
                type: DataTypes.BIGINT,
                primaryKey : true,
                autoIncrement : true,
            },
            itemId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            userId: {
                type:DataTypes.BIGINT,
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER
            }
        }
    );
    return order;
}