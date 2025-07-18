const jwt = require('jsonwebtoken')
const response = require('../utils/response');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return next(response.error(401, 'Token requerido'));

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('JWT Error:', error);
    return next(response.error(403, 'Token inválido o expirado'));
  }
};

module.exports = authenticate;