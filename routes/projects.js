const express = require('express');
const routes = express.Router();
const projectsDb = require('../handlers/projectHandlers');

const urlProjects = '/api/projects';

routes.use(express.json());

/*
ADD A PROJECT
[POST] include a valid body with:
'name': 'string up to  128 chars',
'description': 'string up to 600 chars',
'completed': boolean
*/
routes.post(urlProjects, (req, res) => {
    const entry = req.body;
    if (entry.name && entry.description) {
    projectsDb
        .addProject(entry)
        .then(id => {
          res.status(201).json(id);
        })
        .catch(err => {
          res.status(500).json({ message: 'the project could not be added' });
        });
    } else {
      res
        .status(404)
        .json({ message: 'please include a name, description, and completed field with your project' });
    }
  });

module.exports = routes;
