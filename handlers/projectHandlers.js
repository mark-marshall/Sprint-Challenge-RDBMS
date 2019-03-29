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
        .select('actions.id', 'actions.description', 'actions.notes', 'actions.completed')
        .where({ project_id: id })
        .then(actions => {
            project[0].actions = actions;
            return project[0];
        })
    })
}

function deleteProject(id) {
    return db('projects')
    .where({ id })
    .del();
}

function getProjects() {
    return db('projects');
}

  module.exports = {
    addProject,
    getProjectById,
    deleteProject,
    getProjects,
  };
