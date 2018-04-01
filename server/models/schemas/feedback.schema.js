'use strict';

const {Schema} = require('mongoose');

const STATUSES = ['pending', 'declined', 'approved'];

const FeedbackSchema = new Schema({
    fullName: String,
    email: String,
    comment: String,
    status: {
        type: String,
        enum: STATUSES,
        default: STATUSES[0]
    },
    created: {
        type: Number,
        default: Date.now()
    },
    updated: {
        type: Number,
        default: Date.now()
    }
});

module.exports = FeedbackSchema;
