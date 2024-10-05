const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.get('/completed/:userId', orderController.getCompleteds);
router.get('/pending/:userId', orderController.getPendings);
router.get('/canceled/:userId', orderController.getCanceleds);

router.post('/complete/:orderId', orderController.complete);
router.post('/cancel/:orderId', orderController.cancel);
router.post('/', orderController.create);


module.exports = router;