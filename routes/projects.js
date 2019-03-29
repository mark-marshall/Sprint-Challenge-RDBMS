const express = require('express');
const routes = express.Router();
const projectsDb = require('../handlers/projectHandlers');

const urlProjects = '/api/projects';
const urlProjectsById = '/api/project/:id';

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
        const newId = id[0];
        returnProject(newId);
      })
      .catch(err => {
        res.status(500).json({ message: 'the project could not be added' });
      });
  } else {
    res.status(404).json({
      message:
        'please include a name, description, and completed field with your project',
    });
  }

  const returnProject = id => {
    projectsDb
      .getProjectById(id)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          res
            .status(404)
            .json({ message: 'no project exists with the provided id' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'the project could not  be retrieved' });
      });
  };
});

/*
  GET PROJECT BY ID
  [GET] include a valid project id in the params
  */
routes.get(urlProjectsById, (req, res) => {
  const { id } = req.params;
  projectsDb
    .getProjectById(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ message: 'no project exists with the provided id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'the project could not  be retrieved' });
    });
});

module.exports = routes;
