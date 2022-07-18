import { all, fork } from "redux-saga/effects";
import userSaga from "./user";

import goalSaga from "./goal";

import conditionSaga from "./condition";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(goalSaga), fork(conditionSaga)]);
}
