const Item = require('../models/item');
const Category = require('../models/category');
const Brand = require('../models/brand');
const Location = require('../models/location');
const response = require('../utils/response');
const redisClient = require('../config/redisClient');

const getItems = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    const cacheKey = `items:${req.user.id}:page:${parsedPage}:limit:${parsedLimit}`;
    const cachedItems = await redisClient.get(cacheKey);
    if (cachedItems) {
      return res.status(200).json(response.success(200, res.translate('Items from cache'), JSON.parse(cachedItems)));
    }

    const [items, total] = await Promise.all([
      Item.find({ userId: req.user.id })
        .populate('category', 'name')
        .populate('brand', 'name')
        .populate('location', 'name')
        .skip(skip)
        .limit(parsedLimit),
      Item.countDocuments({ userId: req.user.id }),
    ]);

    const result = {
      items,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
      totalItems: total,
    };

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));
    res.status(200).json(response.success(200, res.translate('Items information obtained successfully'), result));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};


const getItem = async (req, res) => {
  try {
    const cacheKey = `item:${req.params.id}`;
    const cachedItem = await redisClient.get(cacheKey);
    if (cachedItem) {
      return res.status(200).json(response.success(200, res.translate('Item from cache'), JSON.parse(cachedItem)));
    }
    const item = await Item.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('category', 'name').populate('brand', 'name').populate('location', 'name');
    if (!item) return res.status(404).json(response.error(404, res.translate('Item not found')));
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(item));
    res.status(200).json(response.success(200, res.translate('Item information obtained successfully'), item));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const createItem = async (req, res) => {
  const item = new Item({
    ...req.body,
    userId: req.user.id,
  });
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
    await redisClient.del(`items:${req.user.id}`);
    res.status(201).json(response.success(201, res.translate('Item registered'), newItem));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate({
      _id: req.params.id,
      userId: req.user.id
    }, req.body, { new: true });
    await redisClient.del(`items:${req.user.id}`);
    await redisClient.del(`item:${req.params.id}`);
    res.status(200).json(response.success(200, res.translate('Item updated'), item));
  }
  catch (error) {
    res.status(500).json(response.error(500, error.message));
  } 
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    await redisClient.del(`items:${req.user.id}`);
    await redisClient.del(`item:${req.params.id}`);
    res.status(200).json(response.success(200, res.translate('Item deleted'), item));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
};
