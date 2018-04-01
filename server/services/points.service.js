'use strict';

const {Types} = require('mongoose');
const pointsModel = require('../models/geoJSON.model');

async function getList({categories, lon, lat, radius = 100}, isAndroid = false) {
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

                if (isAndroid) {
                    const androidCoordinates = result.map((item) => {
                        if (item.feature.geometry.type === 'Point') {
                            item.feature.geometry.coordinates = [item.feature.geometry.coordinates];
                        }

                        return item
                    });

                    return resolve(androidCoordinates);
                }

                return resolve(result);
            })
    };

    return new Promise(executor);
}

async function create(newPoint) {
    const point = new pointsModel(newPoint);

    return point.save();
}

module.exports = {
    getList,
    create
};