const express = require('express');

const router = express.Router();
const usersController = require('../controllers/usersController');
const jwtController = require('../controllers/jwtController');

router.post(
  '/',
  usersController.checkLogin,
  usersController.createSession,
  jwtController.createJWT,
  (req, res) => {
    res.status(200).json({
      success: true,
      username: res.locals.username,
      vegan: res.locals.vegan,
      vegetarian: res.locals.vegetarian,
      glutenFree: res.locals.glutenFree,
      token: res.locals.token,
      token_expiry: res.locals.token_expiry,
    });
  }
);

module.exports = router;
