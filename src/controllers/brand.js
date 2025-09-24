const Brand = require('../models/brand');
const response = require('../utils/response');
const redisClient = require('../config/redisClient');

const getBrands = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    /* const cacheKey = `brands:${req.user.id}:page:${parsedPage}:limit:${parsedLimit}`;
    const cachedBrands = await redisClient.get(cacheKey);

    if (cachedBrands) {
      return res.status(200).json(response.success(200, res.translate('Brands from cache'), JSON.parse(cachedBrands)));
    } */

    const [ brands, total ] = await Promise.all([
      Brand.find({ userId: req.user.id })
        .sort({ 'name': 1})
        .populate('items')
        .skip(skip)
        .limit(parsedLimit),
      Brand.countDocuments({ userId: req.user.id }),
    ]); 

    const result = {
      brands,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
      totalBrands: total,
    };

    // await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));
    res.status(200).json(response.success(200, res.translate('Brands information obtained successfully'), result));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const getBrand = async (req, res) => {
  try {
    const cacheKey = `brand:${req.params.id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.status(200).json(response.success(200, res.translate('Brand from cache'), JSON.parse(cached)));
    }
    const brand = await Brand.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('items');
    if (!brand) {
      return res.status(404).json(response.error(404, res.translate('Brand not found')));
    }
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(brand));
    res.status(200).json(response.success(200, res.translate('Brand information obtained successfully'), brand));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const createBrand = async (req, res) => {
  try {
    const brand = new Brand({
      ...req.body,
      userId: req.user.id,
    });
    await brand.save();
    await redisClient.del(`brands:${req.user.id}`);
    res.status(201).json(response.success(201, res.translate('Brand registered'), brand));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findOneAndUpdate({ 
      _id: req.params.id, 
      userId: req.user.id 
    }, req.body, { new: true });
    if (!brand) {
      return res.status(404).json(response.error(404, res.translate('Brand not found')));
    }
    await redisClient.del(`brands:${req.user.id}`);
    await redisClient.del(`brand:${req.params.id}`);
    res.status(200).json(response.success(200, res.translate('Brand updated'), brand));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!brand) {
      return res.status(404).json(response.error(404, res.translate('Brand not found')));
    }
    await redisClient.del(`brands:${req.user.id}`);
    await redisClient.del(`brand:${req.params.id}`);
    res.status(200).json(response.success(200, res.translate('Brand deleted'), brand));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

module.exports = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
