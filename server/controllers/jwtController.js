// Blog: https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#persistance

const jwt = require('jsonwebtoken');
const pool = require('../models/usersModel');

const jwtController = {};

// @desc    create JWT
jwtController.createJWT = async (req, res, next) => {
  const privateKey = process.env.JWT_KEY;
  const refreshPrivateKey = process.env.REFRESH_JWT_KEY;

  //
  // JWT Token Creation
  //
  // Expries in 2 mins
  const expireTime = Math.floor(Date.now() / 1000) + 60 * 10;
  // const expireTime = Math.floor(Date.now() / 1000) + 15;

  // create the token
  const token = jwt.sign(
    // the claim
    {
      exp: expireTime,
      data: req.body.username,
    },
    // the secert key
    privateKey
  );

  // Save token and expireTime to be sent as JSON back to client
  res.locals.token = token;
  res.locals.token_expiry = expireTime;

  //
  // Refresh JWT Token Creation
  //
  const refreshToken = jwt.sign(
    // the claim
    {
      data: req.body.username,
    },
    // the secert key
    refreshPrivateKey,
    // options
    {
      expiresIn: '1h',
    }
  );

  // Save refresh token to the database
  const refreshValues = [req.body.username, refreshToken];
  const text = `INSERT INTO refresh (username, refresh_token) VALUES($1, $2);`;

  try {
    // Insert refreshToken record in DB
    const temp = await pool.query(text, refreshValues);

    // Save new resfresh Token to cookie
    res.cookie('refresh', refreshToken, { httpOnly: true });
    next();

    // Error in inserting refreshToken to DB
  } catch (err) {
    return next({ log: 'Save Refresh Token', message: err });
  }
};

jwtController.verifyJWT = (req, res, next) => {
  console.log('in jWT verify');
  if (req.url === '/api/login' || req.url === '/api/signup' || req.url === '/api/logout') {
    return next();
  }

  if ((req.url === '/api/favorite' || req.url === '/api/refresh_token') && req.method === 'POST') {
    // Get token from the header
    let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase

    // if Auth header starts with Bearer extract token
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    // if token extracted from header then verify it
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          console.log(`Token is not valid`.brightRed);
          return res.json({
            success: false,
            message: 'Token is not valid',
          });
        }
        console.log(`JsonWebToken Verifed!`.brightGreen);

        return next();
      });
    } else {
      console.log(`Auth token is not supplied`.brightRed);
      return res.json({
        success: false,
        message: 'Auth token is not supplied',
      });
    }
  } else {
    // Need this for all other requests to work until Auth headers are added to all request.
    // Otherwise the request from the browser stays pending
    next();
  }
};

jwtController.refreshToken = async (req, res, next) => {
  // Grab HTTPS cookie from req
  const cookieToken = req.cookies.refresh;
  const { username } = req.body;

  // Compare with the refresh token in the DB
  const text = `SELECT refresh_token FROM refresh WHERE username = '${username}'`;
  await pool.query(text, (err, response) => {
    // If error from Postgres query -> global error handler
    if (err) {
      return next(err);
    }

    // If no response, it means user doesn't have refresh token
    if (response.rows.length === 0) {
      return next({ log: 'RefreshToken', message: { err: 'No Refresh Token Found for user' } });
    }

    // verify refresh_token against DB refresh Token
    if (cookieToken === response.rows[response.rows.length - 1].refresh_token) {
      console.log(`Refresh Token Verified`.brightGreen);

      // Delete refresh token to make room for the new refreshToken which will be created in createJWT
      const text = `DELETE FROM refresh WHERE refresh_token = '${cookieToken}'`;
      pool.query(text, (err, response) => {
        if (err) {
          return next(err);
        }
        return next();
      });
    }
  });
};

module.exports = jwtController;
