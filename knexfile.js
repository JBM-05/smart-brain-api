const knex = require('knex');

const db = knex({
  client: 'pg',  // PostgreSQL client
  connection: {
    host: 'dpg-cs3vd2bv2p9s73em51h0-a.oregon-postgres.render.com',     // Database host (e.g., localhost or IP address)
    user: 'smart_brain_db_syv4_user',     // Database user
    password: 'pjCqEdSF9P2rPhDD5qjrB6hvQYhFjkHUF', // Database password
    database: 'smart_brain_db_syv4', // Name of your database
    port: 5432,               // Default PostgreSQL port
  },
  pool: { min: 0, max: 7 },   // Connection pool settings
});

module.exports = db;
