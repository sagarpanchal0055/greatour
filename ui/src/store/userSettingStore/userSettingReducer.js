import {
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "./userSettingTypes";

const initialState = {
  updateUserLoading: false,
  updatedUser: {},
  error: {},
};
export const userSettingReducer = (state = initialState, action) => {
  if (action.type === UPDATE_USER) {
    return { ...state, updateUserLoading: true };
  } else if (action.type === UPDATE_USER_SUCCESS) {
    return { ...state, updateUserLoading: false, updatedUser: action.payload };
  } else if (action.type === UPDATE_USER_FAIL) {
    return {
      ...state,
      updateUserLoading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};
