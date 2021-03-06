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
GET ALL PROJECTS
[GET] no params or body required
*/
routes.get(urlProjects, (req, res) => {
  projectsDb
    .getProjects()
    .then(projects => {
      if (projects.length > 0) {
        res.status(200).json(projects);
      } else {
        res
          .status(200)
          .json({ message: 'there are no projects in the list yet' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'the projects could not  be retrieved' });
    });
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

/*
UPDATE PROJECT
[PUT] include a valid project id in the params and a body with an update to one of:
'name': 'string up to  128 chars',
'description': 'string up to 600 chars',
'completed': boolean
*/
routes.put(urlProjectsById, (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (updates.name || updates.description || updates.completed) {
    projectsDb
      .updateProject(id, updates)
      .then(count => {
        if (count) {
          res.status(200).json({ message: `${count} record(s) updates` });
        } else {
          res
            .status(404)
            .json({ message: 'no project exists with the provided id' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'the project could not  be updated' });
      });
  } else {
    res
      .status(404)
      .json({
        message:
          'please include a name, description, or completed field with your project update',
      });
  }
});

/*
  DELETE PROJECT
  [DELETE] include a valid project id in the params
  */
routes.delete(urlProjectsById, (req, res) => {
  const { id } = req.params;
  projectsDb
    .deleteProject(id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} project(s) deleted` });
      } else {
        res
          .status(404)
          .json({ message: 'no project exists with the provided id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'the project could not  be deleted' });
    });
});

module.exports = routes;
