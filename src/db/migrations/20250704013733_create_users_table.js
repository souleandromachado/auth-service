exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true); // created_at e updated_at automáticos
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
