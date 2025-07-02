const Item = require('../models/item');
const Category = require('../models/category');
const Brand = require('../models/brand');
const brand = require('../schemas/brand');

const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('category', 'name').populate('brand', 'name');
    if (!items) return res.status(404).json({ message: 'Items not found' });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('category', 'name').populate('brand', 'name');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  const item = new Item(req.body);
  const { category, brand } = req.body;

  try {
    const newItem = await item.save();
    await newItem.populate('category', 'name');

    if (category && category.length > 0) {
      await Category.updateMany(
        { _id: { $in: category } },
        { $push: { items: newItem._id } }
      );
    }

    if (brand && brand.length > 0) {
      await Brand.updateMany(
        { _id: { $in: brand } },
        { $push: { items: newItem._id } }
      );
    }

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  } 
}

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
};