const express = require('express');

const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

// Look at favorites
router.get('/:username', favoritesController.getUserId, favoritesController.getFavorites, (req, res) => {
  res.status(200).json({ success: true, favorites: res.locals.favorites });
});

// Add to favorites
router.post('/:username', favoritesController.getUserId, favoritesController.addRecipe, favoritesController.addFavorite, (req, res) => {
  res.status(200).json({ success: true });
});

// Delete from favorites
router.delete('/:username', favoritesController.getUserId, favoritesController.deleteFavorite, (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = router;
