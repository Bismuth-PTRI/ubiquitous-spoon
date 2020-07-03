const { Pool } = require('pg');

const { PG_URI } = process.env;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

const runQuery = async (sql, values) => {
  const prm = new Promise((resolve, reject) => {
    pool.query(sql, values, (err, response) => {
      if (err) {
        reject({ error: true, body: err });
      } else {
        resolve({ error: false, body: response });
      }
    });
  });
  try {
    const rsp = await prm;
    return rsp;
  } catch (err) {
    return err;
  }
};

module.exports = pool;
