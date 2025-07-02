const response = require('../utils/response');

function registerLocationValidation(req, res, next) {
  const { name, address, state, city } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return next(response.error(400, 'Name is required and must be a valid string.'));
  }
  if (!address || typeof address !== 'string' || address.trim() === '') {
    return next(response.error(400, 'Address is required and must be a valid string.'));
  }
  if (!state || typeof state !== 'string' || state.trim() === '') {
    return next(response.error(400, 'State is required and must be a valid string.'));
  }
  if (!city || typeof city !== 'string' || city.trim() === '') {
    return next(response.error(400, 'City is required and must be a valid string.'));
  } 
  return next();
}

module.exports = registerLocationValidation;
