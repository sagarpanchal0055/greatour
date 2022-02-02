import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_SUCCESS,
  LOGOUT,
} from "./currentUserTypes";

const initialState = {
  userLoading: false,
  user: {},
  error: {},
};
export const getCurrentUserReducer = (state = initialState, action) => {
  if (action.type === GET_CURRENT_USER) {
    return { ...state, userLoading: true };
  } else if (action.type === GET_CURRENT_USER_SUCCESS) {
    return { ...state, userLoading: false, user: action.payload };
  } else if (action.type === GET_CURRENT_USER_FAIL) {
    return {
      ...state,
      userLoading: false,
      error: action.payload,
    };
  } else if (action.type === LOGOUT) {
    window.localStorage.removeItem("isLoggedIn");
    return {
      ...state,
      user: {},
    };
  } else {
    return state;
  }
};
