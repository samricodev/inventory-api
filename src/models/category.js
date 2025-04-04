const moongose = require('mongoose');
const { CategorySchema } = require('../schemas/category');

const Category = moongose.model('Category', CategorySchema);

module.exports = Category;