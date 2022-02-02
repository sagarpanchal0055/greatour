import {
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "./userSettingTypes";

export const updateUserSetting = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const updateUserSettingSuccess = (updatedUser) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: updatedUser,
  };
};

export const updateUserSettingFail = (error) => {
  return {
    type: UPDATE_USER_FAIL,
    payload: error,
  };
};
