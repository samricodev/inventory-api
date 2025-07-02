const itemController = require('../controllers/item');
const registerItemValidation = require('../middlewares/registerItemValidation');
const ItemRouter = require('express').Router();

ItemRouter.get('/', itemController.getItems);
ItemRouter.get('/:id', itemController.getItem);
ItemRouter.post('/', [ registerItemValidation, itemController.createItem ]);
ItemRouter.put('/:id',[ registerItemValidation, itemController.updateItem ]);
ItemRouter.delete('/:id', itemController.deleteItem);

module.exports = ItemRouter;
