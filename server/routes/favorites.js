const express = require('express');

const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

// Look at favorites
router.get('/', favoritesController.getFavorites, (req, res) => {
  res.status(200).json({ success: true });
});

// Add to favorites
router.post('/', favoritesController.addFavorite, (req, res) => {
  res.status(200).json({ success: true });
});

// Delete from favorites
router.delete('/', favoritesController.deleteFavorite, (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = router;
