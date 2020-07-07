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

export const setUserInfo = (loginInfo) => ({
  type: types.SET_USERINFO,
  payload: loginInfo,
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

export const loadIntolerances = (prf) => ({
  type: types.LOAD_INTOLERANCES,
  payload: prf,
});

export const loadDietpreference = (prf) => ({
  type: types.LOAD_DIETPREFERENCE,
  payload: prf,
});
