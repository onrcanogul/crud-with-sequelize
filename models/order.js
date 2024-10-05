const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Veritabanı bağlantınız
const Basket = require('./basket');

const Order = sequelize.define('Order', {
    status: {
        type: DataTypes.ENUM('pending', 'canceled', 'completed'),
        allowNull: false,
        defaultValue: 'pending'
    },
    basketId: {
        type: DataTypes.INTEGER,
        references: {
            model: Basket,
            key: 'id'
        }
    }
});


module.exports = Order;
