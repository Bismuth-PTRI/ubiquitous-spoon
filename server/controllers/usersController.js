const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const pool = require('../models/usersModel');

const usersController = {};

// Middleware to check validity of username
usersController.checkUsername = (req, res, next) => {
  const user = req.body.username.toLowerCase();

  const text = `SELECT * FROM users WHERE username = '${user}'`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    if (response.rows.length === 0) {
    } else {
      return next({ log: 'checkUsername', message: { err: 'Username already exists' } });
    }
    next();
  });
};

usersController.checkLogin = (req, res, next) => {
  const user = req.body.username.toLowerCase();
  const { password } = req.body;
  let bcryptPassword;

  // Query database using user input (username & password)
  const text = `SELECT * FROM users WHERE username = '${user}'`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    // If no response, it means user doesn't have acct yet
    if (response.rows.length === 0) {
      return next({ log: 'checkLogin', message: { err: 'Username not found' } });
    }
    // If user exists, set res.locals for food preferences so they can be used in searches
    res.locals.vegan = response.rows[0].vegan;
    res.locals.vegetarian = response.rows[0].vegetarian;
    res.locals.glutenFree = response.rows[0].gluten_free;
    // If user does exist, grab bcrypted password from DB
    bcryptPassword = response.rows[0].password;

    // Compare bcrypted password to password user entered
    bcrypt.compare(password, bcryptPassword, function (err, isMatch) {
      console.log('password matched ->', isMatch);
      if (!isMatch) {
        // If they don't match, return error "Wrong Password"
        return next({ log: 'checkLogin', message: { err: 'Wrong password' } });
      }
      if (err) {
        return next(err);
      }
      res.locals.username = req.body.username;
      console.log('gluten free? ', res.locals.glutenFree);
      next();
    });
  });
};

usersController.logout = (req, res, next) => {
  // Get the session ID cookie from the browser
  const refreshToken = req.cookies.refresh;
  // Clear session cookie from browser
  res.clearCookie('refresh');
  // Delete refreshToken from refresh table in DB
  const text = `DELETE FROM refresh WHERE refresh_token = '${refreshToken}'`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

// Check to make sure passwords match, then encrypt
usersController.checkPassword = (req, res, next) => {
  const { password1, password2 } = req.body;

  if (password1 !== password2) {
    return next({ log: 'checkPassword', message: { err: 'Passwords must match ' } });
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password1, salt, function (err, hash) {
      res.locals.password = hash;
      next();
    });
  });
};

// If username and password look good, add new user to database
usersController.addUser = (req, res, next) => {
  const text = `INSERT INTO users (username, password, name, email, vegan, vegetarian, gluten_free)
  VALUES('${req.body.username}', '${res.locals.password}', '${req.body.name}', '${req.body.email}', '${req.body.vegan}', '${req.body.vegetarian}', '${req.body.glutenFree}');`;
  pool.query(text, (err, response) => {
    if (err) {
      return next({ log: 'addUser', message: { err: 'HERE: Error in addUser' } });
    }
    res.locals.username = req.body.username;
    next();
  });
};

// Insert new session into session table in db and set cookie
usersController.createSession = (req, res, next) => {
  const ssid = uuidv4();
  const text = `INSERT INTO sessions (id, created_at) VALUES('${ssid}', current_timestamp);`;
  pool.query(text, (err, response) => {
    if (err) {
      return next({ log: 'createSession', message: { err: 'Error in createSession' } });
    }
    res.cookie('ssid', ssid, { httpOnly: true });
    next();
  });
};

usersController.getUserInfo = (req, res, next) => {
  // get username from request body
  const { username } = req.body;

  // get fields (except password) from database for that user
  const text = `SELECT username, name, email, vegan, vegetarian, gluten_free FROM users WHERE username = '${username}'`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    res.locals.userInfo = response.rows[0];
    next();
  });
};

usersController.updateUserInfo = (req, res, next) => {
  // Get info from request
  const { username } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  const { glutenFree } = req.body;
  const { vegan } = req.body;
  const { vegetarian } = req.body;

  // Update info in database
  const text = `UPDATE users SET name = '${name}', email = '${email}', gluten_free = '${glutenFree}', vegan = '${vegan}', vegetarian = '${vegetarian}' WHERE username = '${username}'`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

module.exports = usersController;
