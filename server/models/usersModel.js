const { Pool } = require('pg');

const { PG_URI } = process.env;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = pool;
