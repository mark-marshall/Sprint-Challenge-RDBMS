const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

function addAction(action) {
    return db('actions').insert(action);
  }

  module.exports = {
    addAction,
  };