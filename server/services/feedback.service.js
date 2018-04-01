'use strict';

const FeedbackModel = require('../models/feedback.model');

async function getById(feedbackId) {
    const executor = (resolve, reject) => {
        const query = FeedbackModel
            .findById(feedbackId)
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

async function getList({status}) {
    const executor = (resolve, reject) => {
        const options = {};

        if (status) {
            options.status = status;
        }

        const query = FeedbackModel
            .find(options)
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

async function create(newFeedback) {
    const feedback = new FeedbackModel(newFeedback);

    return feedback.save();
}


async function update(feedbackId, updatedFeedback) {
    const oldFeedback = await getById(feedbackId);

    if (!oldFeedback) {
        return Promise.reject(new Error(`Feedback with id ${feedbackId} not found.`));
    }

    const executor = (resolve, reject) => {
        updatedFeedback._id = oldFeedback._id;
        updatedFeedback.created = oldFeedback.created || Date.now();
        updatedFeedback.updated = Date.now();

        const feedback = new FeedbackModel(updatedFeedback);
        const validationErrors = feedback.validateSync();

        if (validationErrors) {
            return reject(validationErrors);
        }

        FeedbackModel
            .update({_id: oldFeedback._id}, updatedFeedback, (error) => {
                if (error) {
                    return reject(error);
                }

                return resolve(updatedFeedback);
            });

    };

    return new Promise(executor);
}


module.exports = {
    getById,
    getList,
    create,
    update
};