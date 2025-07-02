const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand
} = require('../controllers/brand');

const BrandRouter = require('express').Router();

BrandRouter.get('/', getBrands);
BrandRouter.get('/:id', getBrand);
BrandRouter.post('/', createBrand);
BrandRouter.put('/:id', updateBrand);
BrandRouter.delete('/:id', deleteBrand);

module.exports = BrandRouter;
