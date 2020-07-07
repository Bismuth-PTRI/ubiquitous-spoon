const pool = require('../models/usersModel');

// utility function to return the user id of any username provided as argument
const userId = async (username) => {
  try {
    const queryTxt = `SELECT id FROM users WHERE username = '${username}'`;
    const { rows } = await pool.query(queryTxt);
    return { status: true, value: rows[0].id };
  } catch (err) {
    return { status: false, value: err };
  }
};

module.exports = { userId };
