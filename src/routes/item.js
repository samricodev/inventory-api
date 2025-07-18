const itemController = require('../controllers/item');
const authenticate = require('../middlewares/auth');
const registerItemValidation = require('../middlewares/registerItemValidation');
const ItemRouter = require('express').Router();

ItemRouter.get('/', [
    authenticate,
    itemController.getItems
]);
ItemRouter.get('/:id', [
    authenticate,
    itemController.getItem
]);
ItemRouter.post('/', [ 
    authenticate,
    registerItemValidation, 
    itemController.createItem 
]);
ItemRouter.put('/:id',[
    authenticate, 
    registerItemValidation, 
    itemController.updateItem 
]);
ItemRouter.delete('/:id', [
    authenticate,
    itemController.deleteItem
]);

module.exports = ItemRouter;
