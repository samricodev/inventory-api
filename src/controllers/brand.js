const Brand = require('../models/brand');

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().populate('items');
    if (!brands) return res.status(404).json({ message: 'No brands found' });
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).populate('items');
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });

    Object.assign(brand, req.body);
    await brand.save();
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });

    await brand.remove();
    res.json({ message: 'Brand deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};