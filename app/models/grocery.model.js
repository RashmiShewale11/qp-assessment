module.exports = (sequelize, DataTypes) => {
    const grocery = sequelize.define(
        'grocery', {
            itemId: {
                type: DataTypes.BIGINT,
                primaryKey : true,
                autoIncrement : true,
            },
            itemName: {
                type: DataTypes.STRING,
                allowNull : false
            },
            itemPrice: {
                type:DataTypes.INTEGER,
                allowNull: false
            },
            itemInventory: {
                type: DataTypes.INTEGER
            }
        }
    );
    return grocery;
}