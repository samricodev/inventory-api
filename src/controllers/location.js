const Location = require('../models/location');

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate('items');
    if (!locations) return res.status(404).json({ message: 'No locations found' });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate('items');
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });

    Object.assign(location, req.body);
    await location.save();
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });

    await location.remove();
    res.json({ message: 'Location deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation
};