'use strict';

const express = require('express');
const router = express.Router();

const categoryService = require('../services/categories.service');

router.get('/categories', async (req, res) => {
    try {
        const categories = await categoryService.getCategories();

        return res.json(categories);
    } catch (error) {
        res.status(400);

        res.json(error);
    }
});

router.get('/categories/:categoryId', (req, res) => {

});

router.get('/categories/:categoryId/points', (req, res) => {

});

module.exports = router;
