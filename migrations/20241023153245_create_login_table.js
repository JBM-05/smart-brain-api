exports.up = function(knex) {
    return knex.schema.createTable('login', function(table) {
      table.increments('id').primary();  // Auto-incrementing primary key
      table.string('email', 100).unique().notNullable();  // Unique email
      table.string('hash').notNullable();  // Hashed password
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('login');
  };
  
