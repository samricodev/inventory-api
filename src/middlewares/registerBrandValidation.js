const response = require('../utils/response');

function registerBrandValidation(req, res, next) {
  const { name, description } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return next(response.error(400, res.translate('Name is required and must be a valid string.')));
  }
  if (description && typeof description !== 'string') {
    return next(response.error(400, res.translate('Description must be a valid string if provided.')));
  }

  return next();
}

module.exports = registerBrandValidation;
