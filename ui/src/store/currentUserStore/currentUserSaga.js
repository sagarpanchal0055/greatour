import { call, put, takeLatest } from "redux-saga/effects";
import { fetchCurrentUser } from "../../APIs/authenticationApi";
import {
  getCurrentUserFail,
  getCurrentUserSuccess,
} from "./currentUserActions";
import { GET_CURRENT_USER } from "./currentUserTypes";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getCurrentUser(action) {
  try {
    const user = yield call(fetchCurrentUser);
    if (user.status === "fail" || user.status === "error") {
      yield put(getCurrentUserFail(user));
    } else {
      yield put(getCurrentUserSuccess(user.data.data));
    }
  } catch (e) {
    yield put(getCurrentUserFail(e));
  }
}

function* currentUserSaga() {
  yield takeLatest(GET_CURRENT_USER, getCurrentUser);
}

export default currentUserSaga;

// /*
//   Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
//   Allows concurrent fetches of user.
// */
// function* mySaga() {
//   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
