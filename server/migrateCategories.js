'use strict';

const fs = require('fs');
// node doesn't have xml parsing or a dom. use xmldom
const DOMParser = require('xmldom').DOMParser;
require('./databases/mongo.db');
const CategoryModel = require('./models/category.model');


const kml = new DOMParser().parseFromString(fs.readFileSync('map.kml', 'utf8'));

const folders = kml.getElementsByTagName('Folder');

const cats = [];
for (let i = 0; i < folders.length; i++) {
    const folder = folders[i].firstChild.nextSibling;
    const name = folder.firstChild.data;
    cats.push(new CategoryModel({name}).save());
}

Promise
    .all(cats)
    .then(res => {
        console.log(res);
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(-1);
    });