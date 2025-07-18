const Category = require('../models/category');
const response = require('../utils/response');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user._id }).populate('items');
    if (!categories.length) {
      return res.status(404).json(response.error(404, res.translate('No categories found')));
    }
    res.status(200).json(response.success(200, res.translate('Categories information obtained successfully'), categories));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('items');

    if (!category) return res.status(404).json(response.error(404, res.translate('Category not found')));
    res.status(200).json(response.success(200, res.translate('Category information obtained successfully'), category));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      items: req.body.items,
      userId: req.user._id,
    });

    const newCategory = await category.save();
    res.status(201).json(response.success(201, res.translate('Category registered'), newCategory));
  } catch (error) {
    res.status(400).json(response.error(400, error.message));
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!category) return res.status(404).json(response.error(404, res.translate('Category not found')));

    if (req.body.name) category.name = req.body.name;
    if (req.body.description) category.description = req.body.description;

    const updatedCategory = await category.save();
    res.status(200).json(response.success(200, res.translate('Category updated'), updatedCategory));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!category) return res.status(404).json(response.error(404, res.translate('Category not found')));
    
    res.json(response.success(200, res.translate('Category deleted'), category));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
