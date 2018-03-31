'use strict';

const tj = require('@mapbox/togeojson');
const fs = require('fs');
    // node doesn't have xml parsing or a dom. use xmldom
const DOMParser = require('xmldom').DOMParser;
require('./databases/mongo.db');
const pointsModel = require('./models/geoJSON.model');



const kml = new DOMParser().parseFromString(fs.readFileSync('map.kml', 'utf8'));

const converted = tj.kml(kml);

const convertedWithStyles = tj.kml(kml, { styles: true });

const p = [];

convertedWithStyles.features.forEach((item) => {
    p.push((new pointsModel({feature: item})).save());
});

Promise.all(p).then(res => {
    console.log(res);
}).catch(e => {
    console.log(e);
});
