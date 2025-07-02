const ItemRouter = require('./item');
const CategoryRouter = require('./category');
const BrandRouter = require('./brand'); 

const router = require('express').Router();

router.use('/items', ItemRouter);
router.use('/categories', CategoryRouter);
router.use('/brands', BrandRouter);

module.exports = router;
