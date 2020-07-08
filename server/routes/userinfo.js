const express = require('express');

const router = express.Router();
const usersController = require('../controllers/usersController');
const preferenceController = require('../controllers/preferenceController');

router.post('/', usersController.getUserInfo, (req, res) => {
  res.status(200).json({ success: true, userInfo: res.locals.userInfo });
});

router.put(
  '/',
  usersController.updateUserInfo,
  preferenceController.updateUserPreferences,
  (req, res) => {
    res.status(200).json({ success: true });
  }
);

router.get('/usernames', usersController.findFriends, (req, res) => {
  res.status(200).json({ users: res.locals.users });
});

module.exports = router;
