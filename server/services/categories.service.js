'use strict';

const CategoryModel = require('../models/category.model');

async function getList() {
    const executor = (resolve, reject) => {
        const query = CategoryModel
            .find({})
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