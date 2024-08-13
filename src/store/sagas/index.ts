import { all, fork } from "redux-saga/effects";

import * as userSagas from "./user";
import * as authSagas from "./auth";
import * as casesSagas from "./cases";

export default function* rootSaga() {
  yield all([...Object.values(userSagas), ...Object.values(authSagas), ...Object.values(casesSagas)].map(fork));
}
