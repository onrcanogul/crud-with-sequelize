const { DataTypes } = require('sequelize');
const Category = require('../models/category')
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: true, // createdAt and updatedAt added auto
});


Product.belongsToMany(Category, {through:'ProductCategory'})
Category.belongsToMany(Product, {through:'ProductCategory'})
module.exports = Product;
