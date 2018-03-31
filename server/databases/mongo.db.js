'use strict';

const env = process.env.NODE_ENV || 'local';

const config = require(`../config/${env}.json`);
const mongoose = require('mongoose');
require('mongoose-geojson-schema');

mongoose.connect(config.mongo);

mongoose.connection.on('error', (error) => {
    console.error('connection error:', error);
    process.exit(-1);
});
mongoose.connection.once('open', () => {
    console.info('mongo connected');
});