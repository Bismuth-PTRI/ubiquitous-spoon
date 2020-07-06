const express = require('express');

const router = express.Router();

const preferenceController = require('../controllers/preferenceController');

// Get all diets in database
router.get('/', preferenceController.getDietOrIntolerances, (req, res) => {
  res.status(200).json({
    success: true,
    [req.query.type.toLowerCase()]: res.locals.preference[req.query.type.toLowerCase()],
  });
});

// Get all diets and intolerances in database
router.get('/all', preferenceController.getDietAndIntolerances, (req, res) => {
  res.status(200).json({ success: true, types: res.locals.preferences });
});

// Get all diets and intolerances for user
router.get('/user/:user_id', preferenceController.getUserPreferences, (req, res) => {
  res.status(200).json({ success: true, userpreferences: res.locals.userpreferences });
});

// Post diets and intolerances for new user
router.post('/userpreferences', preferenceController.addUserPreferences, (req, res) => {
  //   res.status(200).json({ success: true, userpreferences: res.locals.userpreferences });
});

module.exports = router;
