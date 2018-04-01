'use strict';

const mongoose = require('mongoose');
const SuggestionSchema = require('./schemas/suggestion.schema');

module.exports = mongoose.model('suggestions', SuggestionSchema);
