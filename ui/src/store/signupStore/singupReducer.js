import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL } from "./singupTypes";

const initialState = {
  signupLoading: false,
  user: {},
  error: {},
};
export const signupReducer = (state = initialState, action) => {
  if (action.type === SIGNUP) {
    return { ...state, signupLoading: true };
  } else if (action.type === SIGNUP_SUCCESS) {
    return { ...state, signupLoading: false, user: action.payload };
  } else if (action.type === SIGNUP_FAIL) {
    return {
      ...state,
      signupLoading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};
