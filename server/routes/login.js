const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/', usersController.checkLogin, usersController.createSession, (req, res) => {
  res.status(200).json({ success: true, username: res.locals.username });
});

module.exports = router;
