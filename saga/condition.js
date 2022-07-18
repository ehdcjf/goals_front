import axios from "axios";
import { all, call, takeLatest, fork, put } from "redux-saga/effects";
import { url } from "./url";
import qs from "qs";
axios.default.paramsSerializer = (params) => {
  return qs.stringify(params);
};

import * as reducer from "../reducers/condition";
async function createAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  };
  const condition = data.condition;

  const result = await axios.post(`${url}/condition/new`, condition, config);
  return result;
}

function* createCondition(action) {
  try {
    const response = yield call(createAPI, action.data);
    if (response && response.data.type == "success") {
      yield put({
        type: reducer.CONDITION_ADD_SUCCESS,
        data: response.data.data,
      });
    } else {
      yield put({
        type: reducer.CONDITION_ADD_ERROR,
        data: response.data.data,
      });
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: reducer.CONDITION_ADD_ERROR,
    });
  }
}

async function fetchAPI(data) {
  const userId = data.userId;
  const params = data;
  delete params.userId;
  const result = await axios.get(`${url}/condition/${userId}`, { params });
  return result;
}

function* fetchConditions(action) {
  try {
    const response = yield call(fetchAPI, action.data);
    if (response && response.data.type == "success") {
      yield put({
        type: reducer.CONDITION_FETCH_SUCCESS,
        data: response.data.data,
      });
    } else {
      yield put({
        type: reducer.CONDITION_FETCH_ERROR,
      });
    }
  } catch (err) {
    yield put({
      type: reducer.CONDITION_FETCH_ERROR,
    });
  }
}

async function initAPI(data) {
  const userId = data.userId;
  const params = data;
  delete params.userId;
  const result = await axios.get(`${url}/condition/${userId}/init`, { params });
  return result;
}

function* initConditions(action) {
  try {
    const response = yield call(initAPI, action.data);
    if (response && response.data.type == "success") {
      if (response.data.data.tag == undefined) {
        response.data.data.tag = { owner: action.data.userId, tag: [] };
      }
      yield put({
        type: reducer.CONDITION_INIT_SUCCESS,
        data: response.data.data,
      });
    } else {
      yield put({
        type: reducer.CONDITION_INIT_ERROR,
      });
    }
  } catch (err) {
    yield put({
      type: reducer.CONDITION_INIT_ERROR,
    });
  }
}

async function updateAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  };
  const conditionId = data.condition.conditionId;
  const condition = { ...data.condition };
  delete condition.conditionId;

  const result = await axios.patch(
    `${url}/condition/${conditionId}`,
    condition,
    config
  );
  return result;
}

function* updateCondition(action) {
  try {
    const response = yield call(updateAPI, action.data);
    if (response && response.data.type == "success") {
      yield put({
        type: reducer.CONDITION_UPDATE_SUCCESS,
        data: action.data,
      });
    } else {
      yield put({
        type: reducer.CONDITION_UPDATE_ERROR,
        data: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: reducer.CONDITION_UPDATE_ERROR,
    });
  }
}

async function deleteAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  };
  const conditionId = data.conditionId;

  const result = await axios.delete(`${url}/condition/${conditionId}`, config);
  return result;
}

function* deleteCondition(action) {
  try {
    const response = yield call(deleteAPI, action.data);
    if (response && response.data.type == "success") {
      yield put({
        type: reducer.CONDITION_DELETE_SUCCESS,
        data: action.data,
      });
    } else {
      yield put({
        type: reducer.CONDITION_DELETE_ERROR,
        data: response.data.data,
      });
    }
  } catch (err) {
    yield put({
      type: reducer.CONDITION_DELETE_ERROR,
    });
  }
}

function* watchUser() {
  yield takeLatest(reducer.CONDITION_INIT_REQUEST, initConditions);
  yield takeLatest(reducer.CONDITION_FETCH_REQUEST, fetchConditions);
  yield takeLatest(reducer.CONDITION_ADD_REQUEST, createCondition);
  yield takeLatest(reducer.CONDITION_UPDATE_REQUEST, updateCondition);
  yield takeLatest(reducer.CONDITION_DELETE_REQUEST, deleteCondition);
}

export default function* userSaga() {
  yield all([fork(watchUser)]);
}
