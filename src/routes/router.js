const ItemRouter = require('./item');
const BrandRouter = require('./brand'); 
const CategoryRouter = require('./category');
const LocationRouter = require('./location');

const router = require('express').Router();

router.use('/items', ItemRouter);
router.use('/brands', BrandRouter);
router.use('/locations', LocationRouter);
router.use('/categories', CategoryRouter);

module.exports = router;
