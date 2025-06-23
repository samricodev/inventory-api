const Category = require('../models/category');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('items');
    if (!categories) return res.status(404).json({ message: 'No categories found' });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('items');
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    items: req.body.items,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    await category.remove();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
