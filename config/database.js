const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Password12*', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;