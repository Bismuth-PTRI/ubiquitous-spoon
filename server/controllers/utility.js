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

// utility to insert all food preferences on the req object. Should be invoked from
// addUserPreferences & updateUserPreferences
const insertUserPreferences = async (reqObj, user_id) => {
  let prefString = '';

  reqObj.diet.map((diet) => (prefString += `(${user_id.value}, ${diet}),`));
  reqObj.intolerance.map((intolerance) => (prefString += `(${user_id.value}, ${intolerance}),`));
  prefString = prefString.slice(0, -1);

  const text = `INSERT INTO userpreference (user_id, preference_id)
  VALUES ${prefString};`;
  try {
    await pool.query(text);
    return { status: true, value: 'done' };
  } catch (err) {
    return { status: false, value: err };
  }
};

// utility to remove previously selected user preferences befoer inserting another in update user preferences
const clearUserPreferences = async (user_id) => {
  try {
    const queryTxt = `DELETE FROM userpreference WHERE user_id = ${user_id}`;
    await pool.query(queryTxt);
    return { status: true, value: 'done' };
  } catch (err) {
    return { status: false, value: err };
  }
};

module.exports = { userId, insertUserPreferences, clearUserPreferences };
