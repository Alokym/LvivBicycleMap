'use strict';

const SuggestionModel = require('../models/suggestion.model');

async function getList({status}) {
    const executor = (resolve, reject) => {
        const condition = {};

        if (status) {
            condition.status = status;
        }

        const query = SuggestionModel
            .find(condition)
            .lean();

        query.exec((error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result);
        })
    };

    return new Promise(executor);
}

async function create(newSuggestion) {
    const suggestion = new SuggestionModel(newSuggestion);

    return suggestion.save();
}

async function approve(id) {
    const executor = (resolve, reject) => {
        const query = SuggestionModel.findById(id);

        query.exec((error, suggestion) => {
            if (error) {
                return reject(error);
            }

            suggestion.status = 'approved';

            suggestion
                .save()
                .then(() => {
                    return resolve(suggestion.feature);
                })
                .catch(reject);
        });
    };

    return new Promise(executor);
}

async function reject(id) {
    const executor = (resolve, reject) => {
        const query = SuggestionModel.findById(id);

        query.exec((error, suggestion) => {
            if (error) {
                return reject(error);
            }

            suggestion.status = 'rejected';

            suggestion
                .save()
                .then(() => {
                    return resolve(suggestion.feature);
                })
                .catch(reject);
        });
    };

    return new Promise(executor);
}


module.exports = {
    getList,
    create,
    approve,
    reject
};