const response = require('../utils/response');

function registerCategoryValidation(req, res, next) {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return next(response.error(400, 'Name is required and must be a valid string.'));
  }

  return next();
}

module.exports = registerCategoryValidation;
