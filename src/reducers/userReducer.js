/**
 * ************************************
 *
 * @module  userReducer
 * @author
 * @date
 * @description reducer for user data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

const initialState = {
  username: null,
  fullName: null,
  email: null,
  glutenFree: null,
  vegan: null,
  vegetarian: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERNAME:
      const username = action.payload;
      return { ...state, username };

    case types.SET_USERPREFS:
      const email = action.payload.email;
      const fullName = action.payload.name;
      const glutenFree = action.payload.foodPrefs.glutenFree;
      const vegan = action.payload.foodPrefs.vegan;
      const vegetarian = action.payload.foodPrefs.vegetarian;

      return {
        ...state,
        email,
        fullName,
        glutenFree,
        vegan,
        vegetarian,
      };

    case types.CLEAR_USER:
      return {
        ...state,
        username: null,
        fullName: null,
        email: null,
        glutenFree: null,
        vegan: null,
        vegetarian: null,
      };

    default:
      return state;
  }
};

export default userReducer;
