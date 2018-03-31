'use strict';

const mongoose = require('mongoose');
const CategorySchema = require('./schemas/category.schema');

module.exports = mongoose.model('categories', CategorySchema);
