const express = require('express');
const routes = express.Router();
const actionsDb = require('../handlers/actionHandlers');

const urlActions = '/api/actions';

routes.use(express.json());

/*
ADD AN ACTION
[POST] include a valid body with:
'description': 'string up to  256 chars',
'notes': 'string',
'completed': boolean,
'project_id': integer of existing project already in the database
*/
routes.post(urlActions, (req, res) => {
  const entry = req.body;
  if (entry.notes && entry.description && entry.project_id) {
    actionsDb
      .addAction(entry)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json({ message: 'the project could not be added' });
      });
  } else {
    res
      .status(404)
      .json({
        message:
          'please include a description, notes, completed field, and valid project_id with your action',
      });
  }
});

module.exports = routes;
