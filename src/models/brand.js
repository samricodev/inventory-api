const mongoose = require('mongoose');
const BrandSchema = require('../schemas/brand');

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand;
