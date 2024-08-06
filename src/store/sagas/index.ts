import { all, fork } from "redux-saga/effects";

import * as userSagas from "./user";
import * as authSagas from "./auth";

export default function* rootSaga() {
  yield all([...Object.values(userSagas), ...Object.values(authSagas)].map(fork));
}
