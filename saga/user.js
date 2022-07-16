import axios from "axios";
import { all, call, takeLatest, fork, put } from "redux-saga/effects";
import { url } from "./url";

import * as reducer from "../reducers/user";
async function joinAPI(data) {
  const result = await axios.post(`${url}/join`, data);
  return result;
}

function* join(action) {
  try {
    const response = yield call(joinAPI, action.data);
    if (response && response.data.type == "success") {
      yield put({
        type: reducer.USER_JOIN_SUCCESS,
        data: response.data.data,
      });
    } else {
      yield put({
        type: reducer.USER_JOIN_ERROR,
      });
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: reducer.USER_JOIN_ERROR,
    });
  }
}

async function loginAPI(data) {
  const result = await axios.post(`${url}/login`, data);
  return result;
}

function* login(action) {
  try {
    const response = yield call(loginAPI, action.data);
    if (response && response.data.type == "success") {
      yield put({
        type: "USER_LOGIN_SUCCESS",
        data: response.data.data,
      });
    } else {
      yield put({
        type: "USER_LOGIN_ERROR",
      });
    }
  } catch (err) {
    yield put({
      type: "USER_LOGIN_ERROR",
    });
  }
}

function* watchUser() {
  yield takeLatest("USER_LOGIN_REQUEST", login);
  yield takeLatest("USER_JOIN_REQUEST", join);
}

export default function* userSaga() {
  yield all([fork(watchUser)]);
}
