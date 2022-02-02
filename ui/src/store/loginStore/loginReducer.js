import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "./loginTypes";

const initialState = {
  loginLoading: false,
  user: {},
  error: {},
};
export const loginReducer = (state = initialState, action) => {
  if (action.type === LOGIN) {
    return { ...state, loginLoading: true };
  } else if (action.type === LOGIN_SUCCESS) {
    return { ...state, loginLoading: false, user: action.payload };
  } else if (action.type === LOGIN_FAIL) {
    return {
      ...state,
      loginLoading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};
