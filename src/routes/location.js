const {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/location');

const LocationRouter = require('express').Router();

LocationRouter.get('/', getLocations);
LocationRouter.get('/:id', getLocation);
LocationRouter.post('/', createLocation);
LocationRouter.put('/:id', updateLocation);
LocationRouter.delete('/:id', deleteLocation);

module.exports = LocationRouter;