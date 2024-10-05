const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const BasketItem = sequelize.define('BasketItem', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    basketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Baskets',
            key: 'id'
        }
    }
}, {
    timestamps: true
})

module.exports = BasketItem;