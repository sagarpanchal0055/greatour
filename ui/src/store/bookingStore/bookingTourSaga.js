import { call, put, takeLatest } from "redux-saga/effects";
import { getBookedTours } from "../../APIs/bookingTourApi";
import {
  getBookingToursFail,
  getBookingToursSuccess,
} from "./bookingTourActions";
import { GET_BOOKING_TOURS } from "./bookingTourTypes";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchBookedTours(action) {
  try {
    const tours = yield call(getBookedTours);
    yield put(getBookingToursSuccess(tours));
  } catch (e) {
    yield put(getBookingToursFail(e));
  }
}

function* bookedTourSaga() {
  yield takeLatest(GET_BOOKING_TOURS, fetchBookedTours);
}

export default bookedTourSaga;

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
