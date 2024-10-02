const Category = require('../models/category');
const asyncHandler = require('../wrappers/asyncHandler')

exports.getAllCategories = asyncHandler(async (req, res) => {
    var categories = await Category.findAll();
    return res.status(200).json(categories);
});
exports.getById = asyncHandler(async (req, res) => {
    var category = await Category.findByPk(req.params.id);
    if (!category)
        res.status(404).json({ error: 'category not found' })
    res.status(200).json(category);
});
exports.create = asyncHandler(async (req, res) => {
    const { name } = req.body;
    var category = await Category.create({ name });
    res.status(201).json(category);
});
exports.update = asyncHandler(async (req, res) => {
    const { name } = req.body;
    var category = await Category.findByPk(req.params.id);
    if (!category)
        res.status(404).json({ error: 'category not found' })
    category.name = name;
    await category.save();
    res.status(200).json(category);
});
exports.delete = asyncHandler(async (req, res) => {
    var category = await Category.findByPk(req.params.id);
    if (!category)
        res.status(404).json({ error: 'category not found' })
    await category.destroy();
    res.status(200).json({ message: 'category is deleted' })
});