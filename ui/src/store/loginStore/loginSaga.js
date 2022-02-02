import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { loginHandler } from "../../APIs/authenticationApi";
import { loginSuccess, loginFail } from "./loginActions";
import { LOGIN } from "./loginTypes";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loginUser(action) {
  try {
    const user = yield call(loginHandler, action.payload);
    if (user.status === "fail" || user.status === "error") {
      toast.error(<p>{user.message}</p>);
      yield put(loginFail(user));
    } else {
      toast.success(<p>Logged In Successfully!</p>);
      window.localStorage.setItem("isLoggedIn", user.token);
      yield put(loginSuccess(user));
    }
  } catch (e) {
    yield put(loginFail(e));
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN, loginUser);
}

export default loginSaga;

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
