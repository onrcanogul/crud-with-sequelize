const { or } = require('sequelize');
const Basket = require('../models/basket');
const Order = require('../models/order');
const asyncHandler = require('../wrappers/asyncHandler');


exports.getCompleteds = asyncHandler(async (req, res) => {
    const orders = await Order.findOne({
        include: [{
            model: Basket,
            where: { userId: req.params.userId }
        }],
        where: { status: 'completed' }
    });
    return res.status(200).json(orders);
});

exports.getCanceleds = asyncHandler(async (req, res) => {
    const orders = await Order.findOne({
        include: [{
            model: Basket,
            where: {
                userId: req.params.userId,
            }
        }],
        where: {
            status: 'canceled'
        }
    });
    return res.status(200).json(orders);
});

exports.getPendings = asyncHandler(async (req, res) => {
    const orders = await Order.findOne({
        include: [{
            model: Basket,
            where: {
                userId: req.params.userId,
            }
        }],
        where: {
            status: 'pending'
        }
    });
    return res.status(200).json(orders);
});

exports.create = asyncHandler(async (req, res) => {
    const { basketId } = req.body;
    const order = await Order.create({ basketId });
    return res.status(201).json(order);
});

exports.complete = asyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'order not found' });
    await order.update({ status: 'completed' })
    return res.status(204).json({ message: 'order is completed' });
});
exports.cancel = asyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'order not found' });
    await order.update({ status: 'canceled' })
    return res.status(204).json({ message: 'order is completed' });
});