import {
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
} from "./updatePasswordTypes";

const initialState = {
  updatePasswordLoading: false,
  error: {},
};
export const updatedPasswordReducer = (state = initialState, action) => {
  if (action.type === UPDATE_PASSWORD) {
    return { ...state, updateUserLoading: true };
  } else if (action.type === UPDATE_PASSWORD_SUCCESS) {
    return { ...state, updateUserLoading: false };
  } else if (action.type === UPDATE_PASSWORD_FAIL) {
    return {
      ...state,
      updateUserLoading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};
