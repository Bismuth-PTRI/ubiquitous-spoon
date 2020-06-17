const pool = require('../models/usersModel');

const favoritesController = {};

favoritesController.getUserId = async (req, res, next) => {
  const { username } = req.body;
  try {
    const userIdQuery = `SELECT id FROM ubiquitous_spoon.users WHERE username='${username}'`;
    const { rows } = await pool.query(userIdQuery);
    const userId = rows[0].id;
    res.locals.userId = userId;
    next();
  } catch (err) {
    next({ log: `getUserId controller error: ${err.message}`, message: { err: 'This user does not exist' } });
  }
};

favoritesController.getFavorites = (req, res, next) => {
  next();
};

favoritesController.addFavorite = async (req, res, next) => {
  const { recipeId } = req.body;
  try {
    const { userId } = res.locals;
    const addFavoriteQuery = `INSERT INTO ubiquitous_spoon.favorites (user_id, recipe_id)
    VALUES ($1, $2)`;
    const addFavoriteValues = [userId, recipeId];
    await pool.query(addFavoriteQuery, addFavoriteValues);
    next();
  } catch (err) {
    next({ log: `addFavorite controller error: ${err.message}`, message: { err: 'An error with adding this recipe to favorites occurred' } });
  }
};

favoritesController.deleteFavorite = (req, res, next) => {
  next();
};

module.exports = favoritesController;
