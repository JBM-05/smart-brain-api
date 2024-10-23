exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();  // Auto-incrementing primary key
      table.string('name', 100);         // Name of the user
      table.string('email', 100).unique().notNullable();  // Unique email, required field
      table.timestamp('joined').notNullable().defaultTo(knex.fn.now());  // Automatically set the time the user joins
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  
