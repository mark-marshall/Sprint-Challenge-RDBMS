const express = require('express');
const routes = express.Router();
const actionsDb = require('../handlers/actionHandlers');

const urlActions = '/api/actions';
const urlActionsById = '/api/action/:id';

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
        const newId = id[0];
        returnAction(newId);
      })
      .catch(err => {
        res.status(500).json({ message: 'the project could not be added' });
      });
  } else {
    res.status(404).json({
      message:
        'please include a description, notes, completed field, and valid project_id with your action',
    });
  }

  const returnAction = id => {
    actionsDb
      .getActionById(id)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          res
            .status(404)
            .json({ message: 'no action exists with the provided id' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'the action could not  be retrieved' });
      });
  };
});

/*
  GET ACTION BY ID
  [GET] include a valid action id in the params
  */
routes.get(urlActionsById, (req, res) => {
  const { id } = req.params;
  actionsDb
    .getActionById(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res
          .status(404)
          .json({ message: 'no action exists with the provided id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'the action could not  be retrieved' });
    });
});

/*
  DELETE ACTION
  [DELETE] include a valid action id in the params
  */
 routes.delete(urlActionsById, (req, res) => {
    const { id } = req.params;
    actionsDb
      .deleteAction(id)
      .then(count => {
        if (count) {
          res.status(200).json({ message: `${count} action(s) deleted` });
        } else {
          res
            .status(404)
            .json({ message: 'no action exists with the provided id' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'the action could not  be deleted' });
      });
  });

module.exports = routes;
