const locationController = require('../controllers/location');
const authenticate = require('../middlewares/auth');
const registerLocationValidation = require('../middlewares/registerLocationValidation');
const LocationRouter = require('express').Router();

LocationRouter.get('/', [
  authenticate,
  locationController.getLocations
]);
LocationRouter.get('/:id', [
  authenticate,
  locationController.getLocation
]);
LocationRouter.post('/', [
  authenticate, 
  registerLocationValidation, 
  locationController.createLocation 
]);
LocationRouter.put('/:id', [ 
  authenticate,
  registerLocationValidation, 
  locationController.updateLocation 
]);
LocationRouter.delete('/:id', [
  authenticate,
  locationController.deleteLocation
]);

module.exports = LocationRouter;