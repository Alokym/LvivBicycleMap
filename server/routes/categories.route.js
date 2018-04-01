'use strict';

const express = require('express');
const router = express.Router();

const {getList} = require('../services/categories.service');

router.get('/categories', async (req, res) => {
    try {
        const categories = await getList();

        return res.json(categories);
    } catch (error) {
        res.status(400);

        res.json(error);
    }
});

router.get('/categories/:id', (req, res) => {
    res.json({message: 'Not implemented'});
});

router.get('/categories/:id/points', (req, res) => {
    res.json({message: 'Not implemented'});
});

module.exports = router;
