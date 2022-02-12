import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { signupHandler } from "../../APIs/authenticationApi";
import { singupSuccess, singupFail } from "./singupActions";
import { SIGNUP } from "./singupTypes";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signupUser(action) {
  try {
    const user = yield call(signupHandler, action.payload);
    if (user.status === "fail" || user.status === "error") {
      toast.error(<p>{user.message}</p>);
      yield put(singupFail(user));
    } else {
      toast.success(<p>Logged In Successfully!</p>);
      window.localStorage.setItem("isLoggedIn", user.token);
      yield put(singupSuccess(user));
    }
  } catch (e) {
    yield put(singupFail(e));
  }
}

function* signupSaga() {
  yield takeLatest(SIGNUP, signupUser);
}

export default signupSaga;

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
