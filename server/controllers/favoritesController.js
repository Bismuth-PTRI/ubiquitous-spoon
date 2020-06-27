const pool = require('../models/usersModel');

const favoritesController = {};

// @desc      Get the userId of usern
// @route     GET /api/favorites/:username
favoritesController.getUserId = async (req, res, next) => {
  const { username } = req.params;
  try {
    const userIdQuery = `SELECT id FROM users WHERE username='${username}'`;
    const { rows } = await pool.query(userIdQuery);
    const userId = rows[0].id;
    res.locals.userId = userId;
    next();
  } catch (err) {
    next({
      log: `getUserId controller error: ${err.message}`,
      message: { err: 'This user does not exist' },
    });
  }
};

// @desc      Get list of favorites of user
// @route     GET /api/favorites/:username
favoritesController.getFavorites = async (req, res, next) => {
  const { userId } = res.locals;
  try {
    const queryString = `SELECT r.id, title, summary, source_url, image FROM favorites f 
    JOIN recipes r ON f.recipe_id = r.id WHERE user_id='${userId}'`;
    const { rows } = await pool.query(queryString);
    res.locals.favorites = rows;
    next();
  } catch (err) {
    next({
      log: `getFavorites controller error: ${err.message}`,
      message: { err: 'An error with getting favorites has occurred' },
    });
  }
};

// Add recipe information to our database
favoritesController.addRecipe = async (req, res, next) => {
  const { recipeId, title, summary, source_url, image } = req.body;
  const insertValues = [recipeId, title, summary, source_url, image];

  try {
    // Check in DB in recipe already exists
    const { userId } = res.locals;
    const existsQuery = `SELECT id FROM recipes WHERE id=${recipeId}`;
    const { rows } = await pool.query(existsQuery);

    if (!rows.length) {
      // Only insert the recipe if it doesn't exist in DB
      const text = `INSERT INTO recipes (id, title, summary, source_url, image) VALUES ($1, $2, $3, $4, $5)`;
      await pool.query(text, insertValues);
    }
    next();
  } catch (err) {
    console.log('err in addRecipe', err);
    next();
  }
};

// @desc      Add a favorite to the favorites list of user
// @route     POST /api/favorites/:username
favoritesController.addFavorite = async (req, res, next) => {
  const { recipeId } = req.body;
  try {
    const { userId } = res.locals;
    const existsQuery = `SELECT recipe_id FROM favorites WHERE recipe_id=${recipeId} AND user_id='${userId}'`;
    const { rows } = await pool.query(existsQuery);
    if (rows.length) {
      next({
        log: `addFavorite controller error: DUPLICATE RECIPE`,
        message: { err: 'This recipe is already added in your favorites' },
      });
    } else {
      const addFavoriteQuery = `INSERT INTO favorites (user_id, recipe_id)
      VALUES ($1, $2) RETURNING *`;
      const addFavoriteValues = [userId, recipeId];
      await pool.query(addFavoriteQuery, addFavoriteValues);

      next();
    }
  } catch (err) {
    next({
      log: `addFavorite controller error: ${err.message}`,
      message: { err: 'An error with adding this recipe to favorites occurred' },
    });
  }
};

// @desc      Delete a favorite from the favorites list of user
// @route     DELETE /api/favorites/:username
favoritesController.deleteFavorite = async (req, res, next) => {
  const { recipeId } = req.body;
  try {
    const { userId } = res.locals;
    const deleteFavoriteQuery = `DELETE FROM favorites WHERE (recipe_id='${recipeId}' AND user_id='${userId}');`;
    await pool.query(deleteFavoriteQuery);
    next();
  } catch (err) {
    next({
      log: `deleteFavorite controller error: ${err.message}`,
      message: { err: 'An error with deleting this recipe from favorites list' },
    });
  }
};

module.exports = favoritesController;
