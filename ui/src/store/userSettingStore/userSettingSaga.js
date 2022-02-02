import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { updateCurrentUser } from "../../APIs/userSettingsApi";
import {
  updateUserSettingSuccess,
  updateUserSettingFail,
} from "./userSettingActions";
import { UPDATE_USER } from "./userSettingTypes";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* userSettings(action) {
  try {
    const updatedUser = yield call(updateCurrentUser, action.payload);
    if (updatedUser.status === "fail" || updatedUser.status === "error") {
      toast.error(<p>{updatedUser.message}</p>);
      yield put(updateUserSettingFail(updatedUser));
    } else {
      toast.success(<p>Successfully Updated!</p>);
      yield put(updateUserSettingSuccess(updatedUser));
    }
  } catch (e) {
    yield put(updateUserSettingFail(e));
  }
}

function* userSettingSaga() {
  yield takeLatest(UPDATE_USER, userSettings);
}

export default userSettingSaga;
