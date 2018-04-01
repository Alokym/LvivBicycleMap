'use strict';

const express = require('express');
const router = express.Router();

const pointsService = require('../services/points.service');
const suggestionsService = require('../services/suggestions.service');

router.get('/points', async (req, res) => {
    try {

        const {categories, lon, lat, radius, android} = req.query;
        const cats = categories ? categories.split(',') : [];

        const points = await pointsService.getList({categories: cats, lon, lat, radius}, android === 'true');

        return res.json(points);
    } catch (error) {
        res.status(400);

        return res.json(error);
    }
});

router.get('/points/suggestions', async (req, res) => {
    try {
        const {status} = req.query;

        const suggestions = await suggestionsService.getList({status});

        return res.json(suggestions);
    } catch (error) {
        res.status(400);

        return res.json(error);
    }
});

router.post('/points/suggestions', async (req, res) => {
    try {
        const {body: newSuggestion} = req;

        const result = await suggestionsService.create(newSuggestion);

        res.status(201);
        return res.json(result);
    } catch (error) {
        res.status(400);

        return res.json(error);
    }
});

router.put('/points/suggestions/:id/approval', async (req, res) => {
    try {
        const {id} = req.params;

        const suggestion = await suggestionsService.approve(id);

        if (suggestion) {
            await pointsService.create({feature: suggestion});
        }

        return res.end();
    } catch (error) {
        res.status(400);

        return res.json(error);
    }
});

router.put('/points/suggestions/:id/rejection', async (req, res) => {
    try {
        const {id} = req.params;

        await suggestionsService.reject(id);

        return res.end();
    } catch (error) {
        res.status(400);

        return res.json(error);
    }
});

module.exports = router;
