const mongoose = require('mongoose');
const { AutopathSchema } = require('../schemas/autopart');

const AutoPart = mongoose.model('AutoPart', AutopathSchema);

module.exports = AutoPart;