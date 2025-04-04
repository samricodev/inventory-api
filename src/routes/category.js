const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category');

const CategoryRouter = require('express').Router();

CategoryRouter.get('/', getCategories);
CategoryRouter.get('/:id', getCategory);
CategoryRouter.post('/', createCategory);
CategoryRouter.put('/:id', updateCategory);
CategoryRouter.delete('/:id', deleteCategory);

module.exports = CategoryRouter;