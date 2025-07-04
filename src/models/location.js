const mongoose = require('mongoose');
const LocationSchema = require('../schemas/location');

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
