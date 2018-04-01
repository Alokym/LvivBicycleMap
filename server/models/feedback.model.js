'use strict';

const mongoose = require('mongoose');
const FeedbackSchema = require('./schemas/feedback.schema');

module.exports = mongoose.model('feedback', FeedbackSchema);
