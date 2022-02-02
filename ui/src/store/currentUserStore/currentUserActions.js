import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_SUCCESS,
  LOGOUT,
} from "./currentUserTypes";

export const getCurrentUser = () => {
  return {
    type: GET_CURRENT_USER,
  };
};

export const getCurrentUserSuccess = (user) => {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    payload: user,
  };
};

export const getCurrentUserFail = (error) => {
  return {
    type: GET_CURRENT_USER_FAIL,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
