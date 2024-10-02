const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth')


router.get('/', productController.getAllProducts);
router.get('/categories', productController.getWithCategories);
router.get('/:id', productController.getProductById);
router.post('/categories/:productId/:categoryId', authMiddleware, productController.addCategoryToProduct);
router.post('/categories/:productId', authMiddleware, productController.addCategoriesToProduct);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.put('categories/:productId', authMiddleware, productController.updateProductsCategories);
router.delete('/categories/:productId/:categoryId', authMiddleware, productController.removeCategoryFromProduct)
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;