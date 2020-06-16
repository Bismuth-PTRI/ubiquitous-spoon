const { Pool } = require('pg');

const PG_URI = 'postgres://rdaasabl:U4aOtl4SwgJbehXGxGdM-5XLYvR9EU4r@ruby.db.elephantsql.com:5432/rdaasabl';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = pool;
