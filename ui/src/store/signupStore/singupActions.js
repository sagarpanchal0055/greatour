import { SIGNUP, SIGNUP_FAIL, SIGNUP_SUCCESS } from "./singupTypes";

export const singup = (payload) => {
  return {
    type: SIGNUP,
    payload,
  };
};

export const singupSuccess = (user) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: user,
  };
};

export const singupFail = (error) => {
  return {
    type: SIGNUP_FAIL,
    payload: error,
  };
};
