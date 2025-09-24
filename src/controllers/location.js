const Location = require('../models/location');
const response = require('../utils/response');
const redisClient = require('../config/redisClient');

const getLocations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    /* const cacheKey = `locations:${req.user.id}:page:${parsedPage}:limit:${parsedLimit}`;
    const cachedLocations = await redisClient.get(cacheKey);

    if (cachedLocations) {
      const data = JSON.parse(cachedLocations);
      return res.status(200).json(response.success(200, res.translate('Locations information obtained successfully'), data));
    } */

    const [ locations, total ] = await Promise.all([
      Location.find({ userId: req.user.id })
        .sort({ 'name': 1 })
        .populate('items')
        .skip(skip)
        .limit(parsedLimit),
      Location.countDocuments({ userId: req.user.id }),
    ]);

    const result = {
      locations,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
      totalLocations: total,
    };

    // await redisClient.set(cacheKey, JSON.stringify(result), { EX: 60 });
    res.status(200).json(response.success(200, res.translate('Locations information obtained successfully'), result));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const getLocation = async (req, res) => {
  try {
    const cacheKey = `location:${req.params.id}:${req.user.id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      const data = JSON.parse(cached);
      return res.status(200).json(response.success(200, res.translate('Location information obtained successfully (cached)'), data));
    }
    const location = await Location.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('items');
    if (!location) return res.status(404).json(response.error(404, res.translate('Location not found')));
    await redisClient.set(cacheKey, JSON.stringify(location), { EX: 60 });
    res.status(200).json(response.success(200, res.translate('Location information obtained successfully'), location));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const createLocation = async (req, res) => {
  try {
    const location = new Location({
      ...req.body,
      userId: req.user.id,
    });
    await location.save();
    await redisClient.del(`locations:${req.user.id}`);
    res.status(201).json(response.success(201, res.translate('Location registered'), location));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const updateLocation = async (req, res) => {
  try {
    const location = await Location.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!location) return res.status(404).json(response.error(404, res.translate('Location not found')));
    await redisClient.del(`locations:${req.user.id}`);
    await redisClient.del(`location:${req.params.id}:${req.user.id}`);
    res.status(200).json(response.success(200, res.translate('Location updated'), location));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!location) return res.status(404).json(response.error(404, res.translate('Location not found')));
    await redisClient.del(`locations:${req.user.id}`);
    await redisClient.del(`location:${req.params.id}:${req.user.id}`);
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
