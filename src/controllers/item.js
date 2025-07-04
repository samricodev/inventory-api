const Item = require('../models/item');
const Category = require('../models/category');
const Brand = require('../models/brand');
const Location = require('../models/location');

const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('category', 'name').populate('brand', 'name').populate('location', 'name');
    if (!items) return res.status(404).json({ message: 'Items not found' });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('category', 'name').populate('brand', 'name').populate('location', 'name');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  const item = new Item(req.body);
  const { category, brand, location } = req.body;
  
  try {
    const newItem = await item.save();

    if (category) {
      await Category.findByIdAndUpdate(
        category,
        { $push: { items: newItem._id } }
      );
    }

    if (brand) {
      await Brand.findByIdAndUpdate(
        brand,
        { $push: { items: newItem._id } }
      );
    }

    if (location) {
      await Location.findByIdAndUpdate(
        location,
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