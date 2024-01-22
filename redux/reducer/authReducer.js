// authReducer.js

import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_INITIATED,
  LOGOUT_INITIATED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../actions/action_types";
const initialState = {
  loading: false,
  isLoggedIn: false,
  credentials: null,
  access_token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INITIATED:
      return {
        loading: true,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        isLoggedIn: true,
        credentials: action.payload.credentials,
        access_token: action.payload.access_token,
      };
    case LOGIN_FAILED:
      return {
        loading: false,
        isLoggedIn: false,
        error: action.payload.err,
      };
    case LOGOUT_INITIATED:
      return {
        loading: true,
        isLoggedIn: true,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isLoggedIn: false,
        access_token: null,
        credentials: null,
      };
    case LOGOUT_FAILED:
      return {
        loading: false,
        isLoggedIn: true,
        error: action.payload.err,
      };
    default:
      return state;
  }
};

export default authReducer;
