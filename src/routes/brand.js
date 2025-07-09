const brandController = require('../controllers/brand');
const registerBrandValidation = require('../middlewares/registerBrandValidation');
const BrandRouter = require('express').Router();

BrandRouter.get('/', brandController.getBrands);
BrandRouter.get('/:id', brandController.getBrand);
BrandRouter.post('/', [ 
  registerBrandValidation, 
  brandController.createBrand
]);
BrandRouter.put('/:id', [ 
  registerBrandValidation, 
  brandController.updateBrand 
]);
BrandRouter.delete('/:id', brandController.deleteBrand);

module.exports = BrandRouter;
