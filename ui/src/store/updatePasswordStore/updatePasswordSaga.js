import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { updatePassword } from "../../APIs/userSettingsApi";
import {
  updatePasswordSuccess,
  updatePasswordFail,
} from "./updatePasswordActions";
import { UPDATE_PASSWORD } from "./updatePasswordTypes";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* updatePasswordGen(action) {
  try {
    const updatedUser = yield call(updatePassword, action.payload);
    if (updatedUser.status === "fail" || updatedUser.status === "error") {
      toast.error(<p>{updatedUser.message}</p>);
      yield put(updatePasswordFail(updatedUser));
    } else {
      toast.success(<p>Password Updated!</p>);
      window.localStorage.setItem("isLoggedIn", updatedUser.token);
      yield put(updatePasswordSuccess());
    }
  } catch (e) {
    yield put(updatePasswordFail(e));
  }
}

function* updatePasswordSaga() {
  yield takeLatest(UPDATE_PASSWORD, updatePasswordGen);
}

export default updatePasswordSaga;
