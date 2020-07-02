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
  userInfo: {},
  foodPrefrence: {},
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

    case types.SET_USERPREFERENCE:
      const { foodPrefrence } = state;
      return {
        ...state,
        foodPrefrence: {
          ...foodPrefrence,
          [Object.keys(action.payload || { diet: [] })[0]]: Object.values(
            action.payload || { diet: [] }
          ),
        },
      };
    case types.SET_USERINFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case types.SIGNUP_USER:
      console.log('Go SignUp User ');
      console.log('User Info Details :: ', state.userInfo);
      console.log('User Preference Details :: ', state.foodPrefrence);
      return state;
    default:
      return state;
  }
};

export default userReducer;
