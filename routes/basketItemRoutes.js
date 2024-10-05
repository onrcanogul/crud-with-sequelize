const express = require('express');
const router = express.Router();
const basketItemController = require('../controllers/basketItemController');
const authMiddleware = require('../middlewares/auth')


router.get('/basket/:basketId', authMiddleware, basketItemController.getBasketItemsByBasket); //owner middleware will be added
router.get('/user/:userId', authMiddleware, basketItemController.getBasketItemByUser);
router.post('/', authMiddleware, basketItemController.create);
router.put('/:basketItemId', authMiddleware, basketItemController.updateQuantity);
router.delete('/:basketItemId', authMiddleware, basketItemController.delete);


module.exports = router;