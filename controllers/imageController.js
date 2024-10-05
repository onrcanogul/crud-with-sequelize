const Product = require('../models/product');
const asyncHandler = require('../wrappers/asyncHandler');

exports.UploadProductImage = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (req.files) {
        product.image = req.files[0].filename;
        await product.save();
    }
    res.status(200).json({ message: 'Image successfuly uploaded' });
});