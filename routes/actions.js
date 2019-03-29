const express = require('express');
const routes = express.Router();
//const dishesDb = require('../handlers/actionHandlers');

//const urlActions = '/api/actions';

routes.use(express.json());

module.exports = routes;
