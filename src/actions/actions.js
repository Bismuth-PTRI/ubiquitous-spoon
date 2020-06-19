/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes';

export const setUsername = (username) => ({
  type: types.SET_USERNAME,
  payload: username,
});

export const clearUser = () => ({
  type: types.CLEAR_USER,
});

export const setUserPrefs = (userPrefs) => ({
  type: types.SET_USERPREFS,
  payload: userPrefs,
});
