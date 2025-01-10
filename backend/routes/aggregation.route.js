const express = require('express');
const route = express.Router();
const aggregationController = require('../controllers/aggregation.controller');

route.get('/by-category', (req, res, next) => {
    console.log('Route /by-category accessed');
    next();
});
module.exports = route;
