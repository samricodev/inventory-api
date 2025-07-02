const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category');
const registerCategoryValidation = require('../middlewares/registerCategoryValidation');
const CategoryRouter = require('express').Router();

CategoryRouter.get('/', getCategories);
CategoryRouter.get('/:id', getCategory);
CategoryRouter.post('/',[ registerCategoryValidation, createCategory ]);
CategoryRouter.put('/:id',[ registerCategoryValidation, updateCategory ]);
CategoryRouter.delete('/:id', deleteCategory);

module.exports = CategoryRouter;