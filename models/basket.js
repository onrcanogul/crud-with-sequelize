const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Basket = sequelize.define('Basket', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    }
    //basketItems
}, {
    timestamps: true
});

module.exports = Basket;