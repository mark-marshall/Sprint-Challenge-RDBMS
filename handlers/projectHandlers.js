const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

function addProject(project) {
    return db('projects').insert(project);
  }

  module.exports = {
    addProject,
  };
