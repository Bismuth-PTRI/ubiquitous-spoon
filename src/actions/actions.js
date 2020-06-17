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

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: types.SET_USER,
  payload: user,
});

export const setUserPrefs = (userPrefs) => ({
  type: types.SET_EMAIL,
  payload: email,
});
