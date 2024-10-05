const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const uploadMiddleware = require('../middlewares/upload');

router.post('/:productId', uploadMiddleware.array('image', 12), imageController.UploadProductImage);


module.exports = router;