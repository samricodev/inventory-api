const categoryController = require('../controllers/category');
const registerCategoryValidation = require('../middlewares/registerCategoryValidation');
const CategoryRouter = require('express').Router();

CategoryRouter.get('/', categoryController.getCategories);
CategoryRouter.get('/:id', categoryController.getCategory);
CategoryRouter.post('/',[ 
    registerCategoryValidation, 
    categoryController.createCategory 
]);
CategoryRouter.put('/:id',[ 
    registerCategoryValidation, 
    categoryController.updateCategory 
]);
CategoryRouter.delete('/:id', categoryController.deleteCategory);

module.exports = CategoryRouter;