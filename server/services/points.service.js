'use strict';

const {Types} = require('mongoose');
const pointsModel = require('../models/geoJSON.model');

async function getList({categories, lon, lat, radius = 100}) {
    const executor = (resolve, reject) => {
        const condition = {};

        if (categories.length) {
            condition['feature.properties.category.id'] = {'$in': categories.map((c) => new Types.ObjectId(c))};
        }

        if (lon !== undefined && lat !== undefined) {
            condition['feature.geometry'] = {
                $near:
                    {
                        $geometry: {type: 'Point', coordinates: [Number(lon), Number(lat)]},
                        $minDistance: 0,
                        $maxDistance: Number(radius)
                    }
            }
        }

        const query = pointsModel
            .find(condition)
            .lean();

        query
            .exec((error, result) => {
                if (error) {
                    return reject(error);
                }

                return resolve(result);
            })
    };

    return new Promise(executor);
}

module.exports = {
    getList
};