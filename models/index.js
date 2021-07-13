'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./users')(sequelize, Sequelize);
db.Good = require('./goods')(sequelize, Sequelize);
db.Auction = require('./auctions')(sequelize, Sequelize);

db.Good.belongsTo(db.User, { as: 'owner' });
db.Good.belongsTo(db.User, { as: 'sold' });
// 한 사용자는 입찰을 여러 번 할 수 있다. 1:N
db.User.hasMany(db.Auction);
// 한 상품에 여러 명 입찰 가능 1:N
db.Good.hasMany(db.Auction);
db.Auction.belongsTo(db.User);
db.Auction.belongsTo(db.Good);

module.exports = db;
