'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('../auth/model/user-model');
const dealModel = require('./deal-model');
const climeddealsModel = require('./claimeddeals-model');

const Collection = require('./lib/collection');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';

const sequelize = new Sequelize(DATABASE_URL, { logging: false });

const user = userModel(sequelize, DataTypes);
const deal = dealModel(sequelize, DataTypes);
const climeddeals = climeddealsModel(sequelize, DataTypes);


const userCollection = new Collection(user);
const dealCollection = new Collection(deal);
const climeddealsCollection = new Collection(climeddeals);

// user.hasMany(deal, {
//   foreignKey: 'User_ID',
//   sourceKey: 'id',
// });
// deal.belongsTo(user, {
//   foreignKey: 'User_ID',
//   targetKey: 'id',
// });


user.hasMany(climeddeals, {
  foreignKey: 'User_ID',
  sourceKey: 'id',
});
climeddeals.belongsTo(user, {
  foreignKey: 'User_ID',
  targetKey: 'id',
});
deal.hasMany(climeddeals, {
  foreignKey: 'Deal_ID',
  sourceKey: 'id',
});
climeddeals.belongsTo(deal, {
  foreignKey: 'Deal_ID',
  targetKey: 'id',
});

module.exports = {
  db: sequelize,
  userCollection: userCollection,
  deal: dealCollection,
  climeddeals: climeddealsCollection,
  users: user,
}