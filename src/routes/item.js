const { 
    getItem,
    getItems,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/item');

const ItemRouter = require('express').Router();

ItemRouter.get('/', getItems);
ItemRouter.get('/:id', getItem);
ItemRouter.post('/', createItem);
ItemRouter.put('/:id', updateItem);
ItemRouter.delete('/:id', deleteItem);

module.exports = ItemRouter;
