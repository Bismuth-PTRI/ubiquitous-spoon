const pool = require('../models/usersModel');
const handlers = require('./utility');

const preferenceController = {};

// Get all diets or intolerance in database
// this is the endpoint accessed when the App.jsx mounts
// it returns all available preferences based on the type in query
// Here is the format of the request  http://localhost:3000/api/preference/?type='Diet'
//                                    http://localhost:3000/api/preference/?type='intolerance'
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
// using the user_id as argument.
// for any function, middleware or route to call this function
// it must have firstto resolve the user_id from whatever paramter it has
preferenceController.userPreferences = async (user_id) => {
  //const queryString = `SELECT id, user_id, preference_id FROM userpreference WHERE user_id=${req.params.user_id};`;
  const queryString = `SELECT tempTable.id, tempTable.preferencename, tempTable.type_id, preferencetype.preference as preferencetype
                        FROM (
                          SELECT userpreference.id, preferencelookup.preference as preferencename, preferencelookup.id as preferenceid, preferencelookup.type_id  FROM userpreference 
                          INNER JOIN preferencelookup ON userpreference.preference_id = preferencelookup.id 
                          WHERE userpreference.user_id=${user_id}  
                        ) AS tempTable INNER JOIN preferencetype ON tempTable.type_id=preferencetype.id`;
  try {
    const { rows } = await pool.query(queryString);
    return { status: true, value: rows };
  } catch (err) {
    return { status: false, message: err.message };
  }
};

// this is a middle ware to return a user's preferences
// hence the username key on the res.locals
// it is linked to login routes
preferenceController.fetchUserPreferences = async (req, res, next) => {
  let user_id = await handlers.userId(res.locals.username); // should be req.locals.username
  if (!user_id.status) {
    return next({
      log: 'fetchUserPreferences',
      message: { err: user_id.value },
    });
  }
  const prfs = await preferenceController.userPreferences(user_id.value);
  if (prfs.status) {
    res.locals.userpreferences = prfs.value;
    next();
  } else {
    next({
      log: `preferences controller error: ${prfs.message}`,
      message: { err: 'An error with getting preferences for user has occurred' },
    });
  }
};

// get a user's preferences
// this can be called indepedently as a route and not as a middleware
// hence the user_id available on the req.params
// e.g. http://localhost:3000/api/preference/user/4
preferenceController.getUserPreferences = async (req, res, next) => {
  const prfs = await preferenceController.userPreferences(req.params.user_id);
  if (prfs.status) {
    res.locals.userpreferences = prfs.value;
    next();
  } else {
    next({
      log: `preferences controller error: ${prfs.message}`,
      message: { err: 'An error with getting preferences for user has occurred' },
    });
  }
};

// Add user preferences to the database
// this is a middle ware to add user's preferences to the database in BE
// hence the username key on the res.locals
// it is linked to signup routes
preferenceController.addUserPreferences = async (req, res, next) => {
  // let prefString = '';

  let user_id = await handlers.userId(res.locals.username); // should be res.locals.username
  if (!user_id.status) {
    return next({
      log: 'addUserPreferences',
      message: { err: user_id.value },
    });
  }

  const insertRsp = await handlers.insertUserPreferences(req.body.preference, user_id);
  if (!insertRsp.status) {
    return next({
      log: `addUserPreferences error: ${insertRsp.value}`,
      message: { err: `HERE : Error in addUserPreferences` },
    });
  }

  res.locals.userpreferences = req.body.userpreferences;
  return next();

  // //////
  // req.body.preference.diet.map((diet) => (prefString += `(${user_id.value}, ${diet}),`));
  // req.body.preference.intolerance.map(
  //   (intolerance) => (prefString += `(${user_id.value}, ${intolerance}),`)
  // );

  // prefString = prefString.slice(0, -1);

  // ///////

  // const text = `INSERT INTO userpreference (user_id, preference_id)
  // VALUES ${prefString};`;
  // await pool.query(text, (err, response) => {
  //   if (err) {
  //     return next({
  //       log: 'addUserPreferences',
  //       log: `addUserPreferences error: ${err.message}`,
  //       message: { err: `HERE : Error in addUserPreferences` },
  //     });
  //   }
  //   res.locals.userpreferences = req.body.userpreferences;
  //   next();
  // });
};

preferenceController.updateUserPreferences = async (req, res, next) => {
  let user_id = await handlers.userId(res.locals.username); // should be res.locals.username
  if (!user_id.status) {
    return next({
      log: 'updateUserPreferences',
      message: { err: user_id.value },
    });
  }
  const clearPreviousPreferences = await handlers.clearUserPreferences(user_id.value);
  if (clearPreviousPreferences.status) {
    const insertRsp = await handlers.insertUserPreferences(req.body.preference, user_id);
    if (!insertRsp.status) {
      return next({
        log: `updateUserPreferences error: ${insertRsp.value}`,
        message: { err: `HERE : Error in updateUserPreferences` },
      });
    }

    res.locals.userpreferences = req.body.userpreferences;
    return next();
  } else {
    return next({
      log: `updateUserPreferences error: ${clearPreviousPreferences.value}`,
      message: { err: `HERE : Error in updateUserPreferences` },
    });
  }
};

module.exports = preferenceController;
