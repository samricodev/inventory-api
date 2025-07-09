const locationController = require('../controllers/location');
const registerLocationValidation = require('../middlewares/registerLocationValidation');
const LocationRouter = require('express').Router();

LocationRouter.get('/', locationController.getLocations);
LocationRouter.get('/:id', locationController.getLocation);
LocationRouter.post('/', [ 
  registerLocationValidation, 
  locationController.createLocation 
]);
LocationRouter.put('/:id', [ 
  registerLocationValidation, 
  locationController.updateLocation 
]);
LocationRouter.delete('/:id', locationController.deleteLocation);

module.exports = LocationRouter;