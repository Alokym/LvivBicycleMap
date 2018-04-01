'use strict';

const express = require('express');
const router = express.Router();

const {getList, create, update} = require('../services/feedback.service');

router.get('/feedback', async (req, res) => {
    try {
        const {status} = req.query;
        const feedback = await getList({status});

        return res.json(feedback);
    } catch (error) {
        res.status(400);

        return res.json(error);
    }
});

router.post('/feedback', async (req, res) => {
    try {
        const {body: newFeedback} = req;

        const result = await create(newFeedback);

        res.status(201);
        return res.json(result);
    } catch (error) {
        res.status(400);

        return res.json(error);
    }
});

router.put('/feedback/:id', async (req, res) => {
    try {
        const {body: updatedFeedback} = req;
        const {id} = req.params;

        const result = await update(id, updatedFeedback);

        res.status(200);
        return res.json(result);
    } catch (error) {
        res.status(400);

        return res.json(error);
    }
});

module.exports = router;
