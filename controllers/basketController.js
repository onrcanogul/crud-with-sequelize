const asyncHandler = require('../wrappers/asyncHandler');
const Basket = require('../models/basket');
const Product = require('../models/product');
const BasketItem = require('../models/basketItem');

exports.getByUser = asyncHandler(async (req, res) => {
    const basket = await Basket.findOne({
        include: [
            {
                model: BasketItem,
                include: [
                    {
                        model: Product
                    }
                ]
            },
        ],
        where: {
            userId: req.params.userId
        }
    });
    await calculateTotalPrice(basket);
    return res.status(200).json(basket);
});

exports.clearBasket = asyncHandler(async (req, res) => {
    const basket = await Basket.findByPk(req.params.basketId);
    if (!basket) return res.status(404).json({ error: 'Basket not found' });
    await BasketItem.destroy({
        where: {
            basketId: req.params.basketId
        }
    }); //does not need save()
    return res.status(200).json(basket);
});

const calculateTotalPrice = async (basket) => {
    let totalPrice = 0;
    basket.BasketItems.forEach(bi => {
        totalPrice = bi.quantity * bi.Product.price;
    })
    basket.totalPrice = totalPrice;
    await basket.save();
};