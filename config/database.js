const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Password12*', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log
});

module.exports = sequelize;