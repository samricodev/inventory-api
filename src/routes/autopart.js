const { 
    getAutopart,
    getAutoparts,
    createAutopart,
    updateAutopart,
    deleteAutopart
} = require('../controllers/autopart');

const AutopartRouter = require('express').Router();

AutopartRouter.get('/', getAutoparts);
AutopartRouter.get('/:id', getAutopart);
AutopartRouter.post('/', createAutopart);
AutopartRouter.put('/:id', updateAutopart);
AutopartRouter.delete('/:id', deleteAutopart);

module.exports = AutopartRouter;
