'use strict';

const {Schema} = require('mongoose');

const STATUSES = ['pending', 'approved', 'rejected'];

const SuggestionSchema = new Schema(
    {
        feature: Schema.Types.Feature,
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
    }
);

module.exports = SuggestionSchema;