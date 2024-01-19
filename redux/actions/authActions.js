// authActions.js
import axios from "axios";
import baseURL from "../../constants/url";
import CryptoService from "../../utils/crypto";
import {
  LOGIN_INITIATED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_FAILED,
  LOGOUT_INITIATED,
  LOGOUT_SUCCESS,
} from "./action_types";
export const login = (mobileNumber, email, password) => {
  return async (dispatch) => {
    dispatch(loginInitiated());
    // create jwt token
    await axios
      .post(`${baseURL}/store/auth/token`, { email, password })
      .then((res) => {
        dispatch(loginSuccess(res.data, mobileNumber));
      })
      .catch((err) => {
        dispatch(loginFailed(err));
      });
  };
};

export const logout = (access_token) => {
  // Remove current session
  return async (dispatch) => {
    dispatch(logoutInitiated());
    await axios
      .delete(`${baseURL}/store/auth`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        dispatch(logoutSuccess());
      })
      .catch((err) => dispatch(logoutFailed(err)));
  };
};

const loginInitiated = () => ({
  type: LOGIN_INITIATED,
});
const loginSuccess = (data, phone) => ({
  type: LOGIN_SUCCESS,
  payload: {
    mobileNumber: phone,
    access_token: data.access_token,
  },
});
const loginFailed = (err) => ({
  type: LOGIN_FAILED,
  payload: { err },
});
const logoutInitiated = () => ({
  type: LOGOUT_INITIATED,
});
const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  payload: {},
});
const logoutFailed = (err) => ({
  type: LOGOUT_FAILED,
  payload: { err },
});
