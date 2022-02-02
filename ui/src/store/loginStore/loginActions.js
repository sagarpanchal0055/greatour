import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "./loginTypes";

export const login = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const loginSuccess = (tours) => {
  return {
    type: LOGIN_SUCCESS,
    payload: tours,
  };
};

export const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};
