const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand
} = require('../controllers/brand');
const registerBrandValidation = require('../middlewares/registerBrandValidation');
const BrandRouter = require('express').Router();

BrandRouter.get('/', getBrands);
BrandRouter.get('/:id', getBrand);
BrandRouter.post('/', [ registerBrandValidation, createBrand ]);
BrandRouter.put('/:id', [ registerBrandValidation, updateBrand ]);
BrandRouter.delete('/:id', deleteBrand);

module.exports = BrandRouter;
