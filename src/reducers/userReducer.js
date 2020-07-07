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
  signUpState: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERNAME:
      // take preferences
      const foodPrf = {};
      foodPrf.diet = action.payload.preferences.reduce((usrPrfs, curPref) => {
        if (curPref.preferencetype === 'Diet') {
          usrPrfs.push(curPref.preferencename);
        }
        return usrPrfs;
      }, []);
      foodPrf.intolerance = action.payload.preferences.reduce((usrPrfs, curPref) => {
        if (curPref.preferencetype === 'Intolerance') {
          usrPrfs.push(curPref.preferencename);
        }
        return usrPrfs;
      }, []);
      const username = action.payload.username;
      return { ...state, username, foodPrefrence: foodPrf };

    case types.SET_USERPREFS:
      const email = action.payload.email;
      const fullName = action.payload.name;
      // const glutenFree = action.payload.foodPrefs.glutenFree;
      // const vegan = action.payload.foodPrefs.vegan;
      // const vegetarian = action.payload.foodPrefs.vegetarian;

      return {
        ...state,
        email,
        fullName,
        // glutenFree,
        // vegan,
        // vegetarian,
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
          )[0],
        },
      };
    case types.SET_USERINFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case types.SIGNUP_USER:
      return {
        ...state,
        username: state.userInfo.username,
        fullName: state.userInfo.name,
        email: state.userInfo.email,
        signUpState:
          action.payload.status === 'success'
            ? 'success'
            : `${action.payload.status}: ${action.payload.message}`,
      };
    default:
      return state;
  }
};

export default userReducer;
