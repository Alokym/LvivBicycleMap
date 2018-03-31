'use strict';

const tj = require('@mapbox/togeojson');
const fs = require('fs');
    // node doesn't have xml parsing or a dom. use xmldom
const DOMParser = require('xmldom').DOMParser;

const kml = new DOMParser().parseFromString(fs.readFileSync('map.kml', 'utf8'));

const converted = tj.kml(kml);

const convertedWithStyles = tj.kml(kml, { styles: true });

