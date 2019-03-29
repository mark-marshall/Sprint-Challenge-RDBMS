const express = require('express');
const routes = express.Router();
//const dishesDb = require('../handlers/projectHandlers');

//const urlProjects = '/api/projects';

routes.use(express.json());

module.exports = routes;
