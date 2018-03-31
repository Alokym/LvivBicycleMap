'use strict';

const express = require('express');
const router = express.Router();

const {getPoints} = require('../services/points.service');

router.get('/points', async (req, res) => {
    try {
        const points = await getPoints();

        return res.json(points);
    } catch (error) {
        res.status(400);

        return res.json(error);
    }
});

module.exports = router;
