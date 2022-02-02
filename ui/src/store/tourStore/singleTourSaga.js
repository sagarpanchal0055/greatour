import { call, put, takeLatest } from "redux-saga/effects";
import { getTour } from "../../APIs/tourApi";
import { getTourFail, getTourSuccess } from "./singleTourActions";
import { GET_TOUR_DETAILS } from "./tourTypes";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchTour(action) {
  try {
    const tour = yield call(getTour, action.payload);
    yield put(getTourSuccess(tour));
  } catch (e) {
    yield put(getTourFail(e));
  }
}

function* singleTourSaga() {
  yield takeLatest(GET_TOUR_DETAILS, fetchTour);
}

export default singleTourSaga;
