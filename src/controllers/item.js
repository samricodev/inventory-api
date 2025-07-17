const Item = require('../models/item');
const Category = require('../models/category');
const Brand = require('../models/brand');
const Location = require('../models/location');
const response = require('../utils/response');

const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('category', 'name').populate('brand', 'name').populate('location', 'name');
    if (!items) return res.status(404).json(response.error(404, res.translate('Items not found')));
    res.status(200).json(response.success(200, res.translate('Items information obtained successfully'), items));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('category', 'name').populate('brand', 'name').populate('location', 'name');
    if (!item) return res.status(404).json(response.error(404, res.translate('Item not found')));
    res.status(200).json(response.success(200, res.translate('Item information obtained successfully'), item));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
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

    res.status(201).json(response.success(201, res.translate('Item registered'), newItem));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(response.success(200, res.translate('Item updated'), item));
  }
  catch (error) {
    res.status(500).json(response.error(500, error.message));
  } 
}

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    res.status(200).json(response.success(200, res.translate('Item deleted'), item));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
};