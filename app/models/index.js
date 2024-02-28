const sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path : `${__dirname}/../../.env`});

const sequelizeOptions = new sequelize(process.env.DB_NAME, process.env.USERNAME, process.env.PASSWORD , {
  host: process.env.DB_HOST,
  dialect : process.env.DIALECT,
  dialect : 'postgres',
  dialectModule : require('pg'),
  operatorsAliases : false,
  pool : {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  } 
});


const db = {};

db.sequelizeOptions = sequelizeOptions;
db.sequelize = sequelize;

db.user = require('./users.models')(sequelizeOptions, sequelize);
db.grocery = require('./grocery.model')(sequelizeOptions, sequelize);
db.orders = require('./order.model')(sequelizeOptions, sequelize);

db.user.hasMany(db.orders, {
  foreignKey: 'userId',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

db.grocery.hasMany(db.orders, {
  foreignKey: 'itemId',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})


module.exports = db;
