const brandController = require('../controllers/brand');
const registerBrandValidation = require('../middlewares/registerBrandValidation');
const authenticate = require('../middlewares/auth');
const BrandRouter = require('express').Router();

BrandRouter.get('/', [
  authenticate,
  brandController.getBrands
]);
BrandRouter.get('/:id', [
  authenticate,
  brandController.getBrand
]);
BrandRouter.post('/', [
  authenticate, 
  registerBrandValidation, 
  brandController.createBrand
]);
BrandRouter.put('/:id', [ 
  authenticate,
  registerBrandValidation, 
  brandController.updateBrand 
]);
BrandRouter.delete('/:id', [
  authenticate,
  brandController.deleteBrand
]);

module.exports = BrandRouter;
