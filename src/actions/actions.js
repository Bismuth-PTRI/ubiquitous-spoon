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
import * as api from '../api/common';

export const setUsername = (username) => ({
  type: types.SET_USERNAME,
  payload: username,
});

export const clearUser = () => ({
  type: types.CLEAR_USER,
});

export const setUserInfo = (userInfo) => ({
  type: types.SET_USERINFO,
  payload: userInfo,
});

export const setUserPrefs = (prefs) => ({
  type: types.SET_USERPREFS,
  payload: prefs,
});

export const signUpUser = (rsp) => ({
  type: types.SIGNUP_USER,
  payload: rsp,
});

export const setUserPreference = (foodPrefs) => ({
  type: types.SET_USERPREFERENCE,
  payload: foodPrefs,
});

export const loadIntolerances = (preftype) => ({
  type: types.LOAD_INTOLERANCES,
  payload: preftype,
});

export const loadDietpreference = (preftype) => ({
  type: types.LOAD_DIETPREFERENCE,
  payload: preftype,
});
