const Item = require('../models/item');

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  const item = new Item(req.body);
  try {
    const newItem = await item.save();
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