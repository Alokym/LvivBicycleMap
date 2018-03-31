'use strict';

const {Types} = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const pointsModel = require('../models/geoJSON.model');

async function getPoints({categories}) {
    const executor = (resolve, reject) => {
        const condition = {};

        if(categories.length) {
            condition['feature.properties.category.id'] = {'$in' : categories.map((c) => new Types.ObjectId(c))};
        }

        const query = pointsModel.find(condition).lean();

        query.exec((error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result);
        })
    };

    return new Promise(executor);
}

module.exports = {
    getPoints
};