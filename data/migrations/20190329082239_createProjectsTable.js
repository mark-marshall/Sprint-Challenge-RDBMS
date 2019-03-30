exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', table => {
    table.increments();

    table.string('name', 128);

    table.string('description', 600);

    table.boolean('completed');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects');
};
