'use strict';

const pointsModel = require('../models/geoJSON.model');

async function getPoints() {
    const executor = (resolve, reject) => {
        const query = pointsModel.find({}).lean();

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