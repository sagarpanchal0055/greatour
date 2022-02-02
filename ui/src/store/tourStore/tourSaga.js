import { call, put, takeLatest } from "redux-saga/effects";
import { getTours } from "../../APIs/tourApi";
import { getToursFail, getToursSuccess } from "./tourActions";
import { GET_TOURS } from "./tourTypes";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchTours(action) {
  try {
    const tours = yield call(getTours);
    yield put(getToursSuccess(tours));
  } catch (e) {
    yield put(getToursFail(e));
  }
}

function* tourSaga() {
  yield takeLatest(GET_TOURS, fetchTours);
}

export default tourSaga;

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
