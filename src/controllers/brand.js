const Brand = require('../models/brand');
const response = require('../utils/response');

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().populate('items');
    if (!brands) return res.status(404).json(response.error(404, res.translate('No brands found')));
    res.status(200).json(response.success(200, res.translate('Brands information obtained successfully', brands)));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).populate('items');
    if (!brand) return res.status(404).json(response.error(404, res.translate('Brand not found')));
    res.status(200).json(response.success(200, res.translate('Brand information obtained successfully', brand)));
  } catch (error) {
    res.status(500).json(response.error(500,error.message));
  }
};

const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(response.success(201, res.translate('Brand registered', brand)));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body);
    if (!brand) return res.status(404).json(response.error(404, res.translate('Brand not found')));
    res.status(200).json(response.success(200, res.translate('Brand updated',brand)));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(404).json(response.error(404, res.translate('Brand not found')));
    res.json(response.success(200, res.translate('Brand deleted', brand)));
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