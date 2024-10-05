const asyncHandler = require('../wrappers/asyncHandler');
const BasketItem = require('../models/basketItem');
const Product = require('../models/product');
const User = require('../models/user');


exports.getBasketItemsByBasket = asyncHandler(async (req, res) => {
    const basketItems = await BasketItem.findAll({
        where: {
            basketId: req.params.basketId
        },
        include: [
            { model: Product }
        ]
    });
    return res.status(200).json(basketItems);
});

exports.getBasketItemByUser = asyncHandler(async (req, res) => {
    const basketItems = await BasketItem.findAll({
        include: [
            {
                model: Product,
                include: [{
                    model: User,
                    where: {
                        id: req.params.userId
                    }
                }]
            }
        ],
    });
    return res.status(200).json(basketItems);
});

exports.create = asyncHandler(async (req, res) => {
    const { productId, basketId, quantity } = req.body;
    const basketItem = await BasketItem.create({ productId, basketId, quantity }); ç
    return res.status(201).json(basketItem);
});

exports.updateQuantity = asyncHandler(async (req, res) => {
    const basketItem = await BasketItem.findByPk(req.params.basketItemId);
    if (!basketItem) return res.status(404).json({ error: 'Basket Item not found' });
    basketItem.quantity = req.body.quantity;
    await basketItem.save();
    return res.status(200).json(basketItem)
});

exports.delete = asyncHandler(async (req, res) => {
    const basketItem = await BasketItem.findByPk(req.params.basketItemId);
    if (!basketItem) return res.status(404).json({ error: 'Basket Item not found' })
    await basketItem.destroy();
    return res.status(200).json({ message: 'BasketItem has been deleted' })
});

