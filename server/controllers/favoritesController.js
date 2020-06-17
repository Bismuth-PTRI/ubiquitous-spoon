const pool = require('../models/usersModel');

const favoritesController = {};

favoritesController.getFavorites = (req, res, next) => {
  next();
};

favoritesController.addFavorite = async (req, res, next) => {
  const { username, recipeId } = req.body;
  const userIdQuery = `SELECT id FROM ubiquitous_spoon.users WHERE username='${username}'`;
  try {
    const { rows } = await pool.query(userIdQuery);
    const userId = rows[0].id;

    const addFavoriteQuery = `INSERT INTO ubiquitous_spoon.favorites (user_id, recipe_id)
    VALUES ($1, $2)`;
    const addFavoriteValues = [userId, recipeId];
    await pool.query(addFavoriteQuery, addFavoriteValues);
    next();
  } catch (err) {
    next({ log: `addFavorite controller error: ${err.message}`, message: { err: 'An error with adding favorite occurered' } });
  }
};

favoritesController.deleteFavorite = (req, res, next) => {
  next();
};

module.exports = favoritesController;
