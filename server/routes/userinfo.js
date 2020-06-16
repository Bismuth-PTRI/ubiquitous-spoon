const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getUserInfo, (req, res) => {
  res.status(200).json({ success: true });
});

router.put('/', usersController.updateUserInfo, (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = router;
