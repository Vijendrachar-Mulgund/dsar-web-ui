import { all, fork } from "redux-saga/effects";

import * as userSagas from "./user";
import * as authSagas from "./auth";
import * as casesSagas from "./cases";
import * as artificialIntelligenceSagas from "./artificialIntelligence";
import * as drones from "./drones";

export default function* rootSaga() {
  yield all(
    [
      ...Object.values(userSagas),
      ...Object.values(authSagas),
      ...Object.values(casesSagas),
      ...Object.values(artificialIntelligenceSagas),
      ...Object.values(drones),
    ].map(fork),
  );
}
