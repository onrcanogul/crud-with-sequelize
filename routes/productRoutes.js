const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/categories', productController.getWithCategories);
router.get('/:id', productController.getProductById);
router.post('/categories/:productId/:categoryId', productController.addCategoryToProduct);
router.post('/categories/:productId', productController.addCategoriesToProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.put('categories/:productId', productController.updateProductsCategories);
router.delete('/categories/:productId/:categoryId', productController.removeCategoryFromProduct)
router.delete('/:id', productController.deleteProduct);

module.exports = router;