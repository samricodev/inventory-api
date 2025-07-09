const Location = require('../models/location');
const response = require('../utils/response');

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate('items');
    if (!locations) return res.status(404).json(response.error(404, 'No locations found'));
    res.status(200).json(response.success(200, 'Locations information obtained successfully', locations));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const getLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate('items');
    if (!location) return res.status(404).json(response.error(404, 'Location not found'));
    res.status(200).json(response.success(200, 'Location information obtained successfully', location));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(response.success(201, 'Location registered', location));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).json(response.error(404, 'Location not found'));
    res.status(200).json(response.success(200, 'Location updated', location));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).json(response.error(404, 'Location not found'));
    res.status(200).json(response.success(200, 'Location deleted', location));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

module.exports = {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation
};