const pool = require('../models/usersModel');

const preferenceController = {};

// Get all diets in database
preferenceController.getDietOrIntolerances = async (req, res, next) => {
  if (!req.query.type) {
    return next({
      log: `preferences controller error: Type of preference not provided`,
      message: { err: 'An error with getting preference(s) has occurred' },
    });
  }
  const queryString = `SELECT preferencelookup.id, preferencelookup.preference as value FROM preferencelookup INNER JOIN preferencetype ON preferencelookup.type_id=preferencetype.id WHERE preferencetype.preference='${req.query.type}';`;
  try {
    const { rows } = await pool.query(queryString);
    res.locals.preference = {
      [req.query.type.toLowerCase()]: rows,
    };
    return next();
  } catch (err) {
    return next({
      log: `preferences controller error: ${err.message}`,
      message: { err: 'An error with getting diets has occurred' },
    });
  }
};

// Get intolerances and diet preferences
preferenceController.getDietAndIntolerances = async (req, res, next) => {
  const queryString = `SELECT preferencelookup.id, preferencelookup.preference as value, preferencetype.preference as type  FROM preferencelookup INNER JOIN preferencetype ON preferencelookup.type_id=preferencetype.id;`;
  try {
    const { rows } = await pool.query(queryString);
    res.locals.preferences = rows;
    return next();
  } catch (err) {
    return next({
      log: `preferences controller error: ${err.message}`,
      message: { err: 'An error with getting diet and intolerances has occurred' },
    });
  }
};

// Get intolerances and diet preferences for a user
preferenceController.getUserPreferences = async (req, res, next) => {
  //const queryString = `SELECT id, user_id, preference_id FROM userpreference WHERE user_id=${req.params.user_id};`;
  const queryString = `SELECT tempTable.id, tempTable.preferencename, tempTable.type_id, preferencetype.preference as preferencetype
                        FROM (
                          SELECT userpreference.id, preferencelookup.preference as preferencename, preferencelookup.id as preferenceid, preferencelookup.type_id  FROM userpreference 
                          INNER JOIN preferencelookup ON userpreference.preference_id = preferencelookup.id 
                          WHERE userpreference.user_id=${req.params.user_id}  
                        ) AS tempTable INNER JOIN preferencetype ON tempTable.type_id=preferencetype.id`;
  try {
    const { rows } = await pool.query(queryString);
    res.locals.userpreferences = rows;
    next();
  } catch (err) {
    next({
      log: `preferences controller error: ${err.message}`,
      message: { err: 'An error with getting preferences for user has occurred' },
    });
  }
};

// Add user preferences to the database
preferenceController.addUserPreferences = async (req, res, next) => {
  let prefString = '';
  const user_id = req.body.user_id;

  req.body.diet.map((diet) => (prefString += `(${user_id}, ${diet}),`));

  req.body.intolerances.map((intolerance) => (prefString += `(${user_id}, ${intolerance}),`));

  prefString = prefString.slice(0, -1);

  const text = `INSERT INTO userpreference (user_id, preference_id)
  VALUES '${prefString};`;
  await pool.query(text, (err, response) => {
    if (err) {
      return next({
        log: 'addUserPreferences',
        message: { err: 'HERE: Error in addUserPreferences' },
      });
    }
    res.locals.userpreferences = req.body.userpreferences;
    next();
  });
};

module.exports = preferenceController;
