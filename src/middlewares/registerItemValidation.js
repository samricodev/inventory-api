const response = require('../utils/response');

function registerItemValidation(req, res, next) {
  const { name, description, price, stock } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return next(response.error(400, 'Name is required and must be a valid string.'));
  }
  if (!description || typeof description !== 'string' || description.trim() === '') {
    return next(response.error(400, 'Description is required and must be a valid string.'));
  }
  if (typeof price !== 'number' || price <= 0) {
    return next(response.error(400, 'Price is required and must be a positive number.'));
  }
  if (typeof stock !== 'number' || stock < 0) {
    return next(response.error(400, 'Stock is required and must be a non-negative number.'));
  }

  return next();
}

module.exports = registerItemValidation;
