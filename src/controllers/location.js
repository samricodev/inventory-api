const Location = require('../models/location');
const response = require('../utils/response');

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({
      userId: req.user._id
    }).populate('items');
    if (!locations) return res.status(404).json(response.error(404, res.translate('No locations found')));
    res.status(200).json(response.success(200, res.translate('Locations information obtained successfully'), locations));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const getLocation = async (req, res) => {
  try {
    const location = await Location.findById({
      id: req.params.id,
      userId: req.user._id
    }).populate('items');
    if (!location) return res.status(404).json(response.error(404, res.translate('Location not found')));
    res.status(200).json(response.success(200, res.translate('Location information obtained successfully'), location));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const createLocation = async (req, res) => {
  try {
    const location = new Location({
      ...req.body,
      userId: req.user._id,
    });
    await location.save();
    res.status(201).json(response.success(201, res.translate('Location registered'), location));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete({
      id: req.params.id,
      userId: req.user._id
    });
    if (!location) return res.status(404).json(response.error(404, res.translate('Location not found')));
    res.status(200).json(response.success(200, res.translate('Location updated'), location));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete({
      id: req.params.id,
      userId: req.user._id
    });
    if (!location) return res.status(404).json(response.error(404, res.translate('Location not found')));
    res.status(200).json(response.success(200, res.translate('Location deleted'), location));
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