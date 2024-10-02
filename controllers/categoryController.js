const Category = require('../models/category');


exports.getAllCategories = async (req, res) => {
    try {
        var categories = await Category.findAll();
        return res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}
exports.getById = async (req, res) => {
    try {
        var category = await Category.findByPk(req.params.id);
        if(!category)
            res.status(404).json({error: 'category not found'})
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}
exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        var category = await Category.create({name});
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}
exports.update = async (req, res) => {
    try {
        const { name } = req.body;
        var category = await Category.findByPk(req.params.id);
        if(!category)
            res.status(404).json({error: 'category not found'})
        category.name = name;
        await category.save();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}
exports.delete = async (req, res) => {
    try {
        var category = await Category.findByPk(req.params.id);
        if(!category)
            res.status(404).json({error: 'category not found'})
        await category.destroy();
        res.status(200).json({message: 'category is deleted'})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}