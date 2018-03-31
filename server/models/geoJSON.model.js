'use strict';

const mongoose = require('mongoose');
const geoJSONSchema = require('./schemas/geoJSON.schema');

module.exports = mongoose.model('points', geoJSONSchema);
