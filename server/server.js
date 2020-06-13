/* eslint-disable no-console */
const path = require('path');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const express = require('express');
const pg = require('pg');
const bcrypt = require('bcryptjs');

const app = express();

const connectionUrl = 'postgres://rdaasabl:U4aOtl4SwgJbehXGxGdM-5XLYvR9EU4r@ruby.db.elephantsql.com:5432/rdaasabl';

// Connect to our database
const pool = new pg.Pool({
  connectionString: connectionUrl,
});

// Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware to check validity of username
const checkUsername = (req, res, next) => {
  const user = req.body.username.toLowerCase();
  const text = `SELECT * FROM ubiquitous_spoon.users WHERE username = '${user}'`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    if (response.rows.length === 0) {
      res.locals.username = user;
    } else {
      return next({ log: 'checkUsername', message: { err: 'Username already exists' } });
    }
    next();
  });
};

const checkPassword = (req, res, next) => {
  const password1 = req.body.password1;
  const password2 = req.body.password2;

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

const addUser = (req, res, next) => {
  const text = `INSERT INTO ubiquitous_spoon.users (username, password, name, email, vegan, vegetarian, gluten_free)
  VALUES('${req.body.username}', '${res.locals.password}', '${req.body.name}', '${req.body.email}', '${req.body.vegan}', '${req.body.vegetarian}', '${req.body.glutenFree}');`;
  pool.query(text, (err, response) => {
    if (err) {
      return next({ log: 'addUser', message: { err: 'Error in addUser' } });
    }
    next();
  });
};

// Check whether username already exists
app.post('/api/signup', checkUsername, checkPassword, addUser, (req, res) => {
  res.status(200).json({ username: res.locals.username });
});

// Error handler
const errorHandler = (err, req, res, next) => {
  // defaultErr object
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).send(JSON.stringify(errorObj.message));
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
