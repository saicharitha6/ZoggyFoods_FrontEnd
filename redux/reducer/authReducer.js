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
  mobileNumber: null,
  currentUser: null,
  access_token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INITIATED:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        // currentUser: action.payload?.customer,
        mobileNumber: action.payload.mobileNumber,
        access_token: action.payload.access_token,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload.err,
      };
    case LOGOUT_INITIATED:
      return {
        ...state,
        loading: true,
        isLoggedIn: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        ...state,
        loading: false,
        isLoggedIn: false,
        access_token: null,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        error: action.payload.err,
      };
    default:
      return state;
  }
};

export default authReducer;
