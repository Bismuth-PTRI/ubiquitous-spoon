/* eslint-disable no-console */
const path = require('path');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const express = require('express');

const app = express();

// Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
