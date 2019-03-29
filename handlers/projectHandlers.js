const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

function addProject(project) {
    return db('projects').insert(project);
  }

function getProjectById(id) {
    return db('projects')
    .where({ id })
    .then(project => {
        return db('actions')
        .where({ project_id: id })
        .then(actions => {
            project[0].actions = actions;
            return project[0];
        })
    })
}

  module.exports = {
    addProject,
    getProjectById,
  };
