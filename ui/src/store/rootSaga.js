import { all, fork } from "redux-saga/effects";
import tourSaga from "./tourStore/tourSaga";
import singleTourSaga from "./tourStore/singleTourSaga";
import loginSaga from "./loginStore/loginSaga";
import currentUserSaga from "./currentUserStore/currentUserSaga";
import userSettingSaga from "./userSettingStore/userSettingSaga";
import updatePasswordSaga from "./updatePasswordStore/updatePasswordSaga";
import bookedTourSaga from "./bookingStore/bookingTourSaga";

export default function* rootSaga() {
  yield all([
    fork(tourSaga),
    fork(singleTourSaga),
    fork(loginSaga),
    fork(currentUserSaga),
    fork(userSettingSaga),
    fork(updatePasswordSaga),
    fork(bookedTourSaga),
  ]);
}
