import {
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from "./updatePasswordTypes";

export const updatePassword = (payload) => {
  return {
    type: UPDATE_PASSWORD,
    payload,
  };
};

export const updatePasswordSuccess = () => {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
  };
};

export const updatePasswordFail = (error) => {
  return {
    type: UPDATE_PASSWORD_FAIL,
    payload: error,
  };
};
