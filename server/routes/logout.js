const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/', usersController.logout, (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = router;
