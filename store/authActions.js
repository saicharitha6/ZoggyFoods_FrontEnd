// authActions.js

export const loginSuccess = (mobileNumber) => ({
  type: "LOGIN",
  payload: { mobileNumber },
});

export const logout = () => ({
  type: "LOGOUT",
});
