const Product = require('../models/product');
const Category = require('../models/category');

const asyncHandler = require('../wrappers/asyncHandler');

exports.getAllProducts = asyncHandler(async (req,res) => {
  const products = await Product.findAll();
    res.json(products);
});
exports.getWithCategories = asyncHandler(async(req, res) => {
  const products = await Product.findAll({
    include:[
      {
        model:Category,
        through:{ attributes:[] }
      }
    ]
  });
  res.json(products);
});
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Ürün bulunamadı' });
  }
  res.json(product);
});
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;
  const product = await Product.create({ name, price, description });
  res.status(201).json(product);
})
exports.addCategoryToProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.productId);
  const category = await Category.findByPk(req.params.categoryId);
  if(product && category)
    await product.addCategory(category)
  res.status(201).json(await product.getCategories());
})
exports.addCategoriesToProduct = asyncHandler(async (req, res) => {
  var product = Product.findByPk(req.params.productId)
  const categories = Category.findAll({
    where: {
      id: req.body.categoryIds
    }
  });
  if (product && categories.length > 0)
    await product.addCategories(categories)
  return res.json(200).json(await product.getCategories())
})
exports.updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Ürün bulunamadı' });
  }
  product.name = name;
  product.price = price;
  product.description = description;
  await product.save();
  res.json(product);
})
exports.updateProductsCategories = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.productId);
  if(!product)
    return res.status(404).json({error: 'product not found'});
  await product.setCategories(req.body.categoryIds);
  return res.status(200).json(await product.getCategories());
})
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Ürün bulunamadı' });
  }
  await product.destroy();
  res.json({ message: 'Ürün silindi' });
})
exports.removeCategoryFromProduct = asyncHandler(async (req, res) => {
  const { categoryId, productId } = req.params;
  const product = await Product.findByPk(productId);
  const category = await Category.findByPk(categoryId);
  if (category && product)
    await product.removeCategory(category);
  return res.status(200).json(await product.getCategories());
})