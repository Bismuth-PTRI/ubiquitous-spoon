const express = require('express');
const jwtController = require('../controllers/jwtController');

const router = express.Router();

router.post('/', jwtController.refreshToken, jwtController.createJWT, (req, res) => {
  console.log('sending back to user');
  res.status(200).json();
});

module.exports = router;
