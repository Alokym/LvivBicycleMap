'use strict';

const tj = require('./parser');
const fs = require('fs');
// node doesn't have xml parsing or a dom. use xmldom
const DOMParser = require('xmldom').DOMParser;
require('./databases/mongo.db');
const pointsModel = require('./models/geoJSON.model');
const CategoryService = require('./services/categories.service');


const kml = new DOMParser().parseFromString(fs.readFileSync('map.kml', 'utf8'));

const converted = tj.kml(kml);

const convertedWithStyles = tj.kml(kml, {styles: true});

const p = [];

const categories = CategoryService.getCategories();

categories
    .then((cats) => {
        convertedWithStyles.features.forEach((item) => {

            const cat = cats.find((c) => {
                return c.name === item.properties.category;
            });

            if (cat) {
                item.properties.category = {
                    name: item.properties.category,
                    id: cat._id
                };
            }

            p.push((new pointsModel({feature: item})).save());
        });

        Promise.all(p).then(res => {
            console.log(res);
            process.exit(0);
        }).catch(e => {
            console.log(e);
            process.exit(-1);
        });
    })
    .catch(e => {
        console.log(e);
    });


