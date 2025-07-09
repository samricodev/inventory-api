const Category = require('../models/category');
const response = require('../utils/response');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('items');
    if (!categories) return res.status(404).json(response.error(404, 'No categories found'));
    res.status(200).json(response.success(200, 'Categories information obtained successfully', categories));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('items');
    if (!category) return res.status(404).json(response.error(404, 'Category not found'));
    res.status(200).json(response.success(200, 'Category information obtained successfully', category));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const createCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    items: req.body.items,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(response.success(201, 'Category registered', newCategory));
  } catch (error) {
    res.status(400).json(response.error(400, error.message));
  }
}

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (req.body.name) {
      category.name = req.body.name;
    }
    if (req.body.description) {
      category.description = req.body.description;
    }
    const updatedCategory = await category.save();
    res.status(200).json(response.success(200, 'Category updated', updatedCategory));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json(response.success(200, 'Category deleted', category));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
