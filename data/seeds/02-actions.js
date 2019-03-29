exports.seed = function(knex, Promise) {
  return knex('actions').del()
    .then(function () {
      return knex('actions').insert([
        {id: 1, description: 'get bricks', notes:'air blocks', completed: false, project_id: 1},
        {id: 2, description: 'find builder', notes:'stratford area', completed: false, project_id: 1},
        {id: 3, description: 'buy kitchen', notes:'granite', completed: false, project_id: 1},
        {id: 4, description: 'find landscaper', notes:'senior', completed: false, project_id: 1},
        {id: 5, description: 'meet cofouinder', notes:'jerry', completed: false, project_id: 2},
        {id: 6, description: 'bank loan', notes:'250k', completed: false, project_id: 2}
      ]);
    });
};
