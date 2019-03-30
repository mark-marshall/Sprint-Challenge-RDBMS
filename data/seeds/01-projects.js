exports.seed = function(knex, Promise) {
  return knex('projects').del()
    .then(function () {
      return knex('projects').insert([
        {id: 1, name: 'build house', description:'4-story', completed: false},
        {id: 2, name: 'start business', description:'SAAS', completed: false},
        {id: 3, name: 'get  degree', description:'computer science', completed: false},
      ]);
    });
};
