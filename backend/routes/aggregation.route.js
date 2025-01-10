const express = require("express");
const authenticate = require('../middlewares/auth');
const route = express.Router();
const { aggregateByCategory }  = require('../controllers/aggregation.controller')

route.get('/aggregate/by-category', authenticate, aggregateByCategory);

module.exports = route;