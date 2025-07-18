const categoryController = require('../controllers/category');
const authenticate = require('../middlewares/auth');
const registerCategoryValidation = require('../middlewares/registerCategoryValidation');
const CategoryRouter = require('express').Router();

CategoryRouter.get('/', [
    authenticate,
    categoryController.getCategories
]);
CategoryRouter.get('/:id', [
    authenticate,
    categoryController.getCategory
]);
CategoryRouter.post('/',[ 
    authenticate,
    registerCategoryValidation, 
    categoryController.createCategory 
]);
CategoryRouter.put('/:id',[ 
    authenticate,
    registerCategoryValidation, 
    categoryController.updateCategory 
]);
CategoryRouter.delete('/:id', [
    authenticate,
    categoryController.deleteCategory
]);

module.exports = CategoryRouter;