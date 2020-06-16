/* eslint-disable consistent-return */
/* eslint-disable no-console */
const path = require('path');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();

// Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Check whether username already exists
app.use('/api/signup', usersRouter);

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
