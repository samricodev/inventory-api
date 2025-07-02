const {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/location');
const registerLocationValidation = require('../middlewares/registerLocationValidation');
const LocationRouter = require('express').Router();

LocationRouter.get('/', getLocations);
LocationRouter.get('/:id', getLocation);
LocationRouter.post('/', [ registerLocationValidation, createLocation ]);
LocationRouter.put('/:id', [ registerLocationValidation, updateLocation ]);
LocationRouter.delete('/:id', deleteLocation);

module.exports = LocationRouter;