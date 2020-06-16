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
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      const username = action.payload;
      return { ...state, username };

    case types.CLEAR_USER:
      return { ...state };

    default:
      return state;
  }
};

export default userReducer;
