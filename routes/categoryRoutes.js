const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')
const authMiddleware = require('../middlewares/auth')

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getById);
router.post('/', authMiddleware, categoryController.create);
router.put('/:id', authMiddleware, categoryController.update);
router.delete('/:id', authMiddleware, categoryController.delete);

module.exports = router