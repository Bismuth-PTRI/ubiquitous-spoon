const express = require('express');

const router = express.Router();
const usersController = require('../controllers/usersController');
const jwtController = require('../controllers/jwtController');

router.post(
  '/',
  usersController.checkUsername,
  usersController.checkPassword,
  usersController.addUser,
  usersController.createSession,
  jwtController.createJWT,
  (req, res) => {
    res.status(200).json({ success: true, username: res.locals.username, token: res.locals.token });
  }
);

module.exports = router;
