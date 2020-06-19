/* eslint-disable consistent-return */
/* eslint-disable no-console */
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const cookieParser = require('cookie-parser');

// Importing routes
const signup = require('./routes/signup');
const login = require('./routes/login');
const favorites = require('./routes/favorites');
const logout = require('./routes/logout');
const userInfo = require('./routes/userinfo');

const app = express();

app.use(cookieParser());

// Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/signup', signup);
app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/user/info', userInfo);
app.use('/api/favorites', favorites);

// Error handler
const errorHandler = (err, req, res, next) => {
  // defaultErr object
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(`${errorObj.log}`.brightRed);
  res.status(errorObj.status).send(JSON.stringify(errorObj.message));
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
