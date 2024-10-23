module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'postgresql://smart_brain_db_syv4_user:pjCqEdSF9P2PhDD5qjrB6hvQYhFjkHUF@dpg-cs3vd2bv2p9s73em51h0-a.oregon-postgres.render.com/smart_brain_db_syv4',
      user: 'smart_brain_db_syv4_user',
      password: 'pjCqEdSF9P2rPhDD5qjrB6hvQYhFjkHUF',
      database: 'smart_brain_db_syv4',
      ssl: { rejectUnauthorized: false }  // SSL option for Render's PostgreSQL
    },
    migrations: {
      directory: './migrations'
    },
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: 'postgresql://smart_brain_db_syv4_user:pjCqEdSF9P2PhDD5qjrB6hvQYhFjkHUF@dpg-cs3vd2bv2p9s73em51h0-a.oregon-postgres.render.com/smart_brain_db_syv4',
      ssl: { rejectUnauthorized: false }  // Required for secure connection to Render
    },
    migrations: {
      directory: './migrations'
    }
  }
};
