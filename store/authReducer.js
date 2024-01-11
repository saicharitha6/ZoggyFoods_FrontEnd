// authReducer.js

const initialState = {
  isLoggedIn: false,
  mobileNumber: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        mobileNumber: action.payload.mobileNumber,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
