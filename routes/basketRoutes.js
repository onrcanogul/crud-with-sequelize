const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middlewares/auth');

router.get('/:userId', authMiddleware, basketController.getByUser);
router.post('/:basketId', authMiddleware, basketController.clearBasket);

module.exports = router;