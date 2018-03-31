'use strict';

const express = require('express');
const router = express.Router();

const {getList} = require('../services/points.service');

router.get('/points', async (req, res) => {
    try {

        const {categories, lon, lat, radius} = req.query;
        const cats = categories ? categories.split(',') : [];

        const points = await getList({categories: cats, lon, lat, radius});

        return res.json(points);
    } catch (error) {
        res.status(400);

        return res.json(error);
    }
});

module.exports = router;
