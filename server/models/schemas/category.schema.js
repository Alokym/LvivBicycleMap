'use strict';

const {Schema} = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    points: {
        type: [Schema.Types.ObjectId],
        default: []
    }
});

module.exports = CategorySchema;
