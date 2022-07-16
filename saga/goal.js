import axios from "axios";
import { all, call, takeLatest, fork, put } from "redux-saga/effects";
import { url } from "./url";
import qs from "qs";
axios.default.paramsSerializer = (params) => {
  return qs.stringify(params);
};

import * as reducer from "../reducers/goal";
async function createAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  };
  const goal = data.goal;

  const result = await axios.post(`${url}/goal/new`, goal, config);
  return result;
}

function* createGoal(action) {
  try {
    const response = yield call(createAPI, action.data);
    if (response && response.data.type == "success") {
      yield put({
        type: reducer.GOAL_ADD_SUCCESS,
        data: response.data.data,
      });
    } else {
      yield put({
        type: reducer.GOAL_ADD_ERROR,
        data: response.data.data,
      });
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: reducer.GOAL_ADD_ERROR,
    });
  }
}

async function fetchAPI(data) {
  console.log(data);
  const userId = data.userId;
  const params = data;
  delete params.userId;
  const result = await axios.get(`${url}/goal/${userId}`, { params });
  return result;
}

function* fetchGoals(action) {
  try {
    const response = yield call(fetchAPI, action.data);
    if (response && response.data.type == "success") {
      yield put({
        type: reducer.GOAL_FETCH_SUCCESS,
        data: response.data.data,
      });
    } else {
      yield put({
        type: reducer.GOAL_FETCH_ERROR,
      });
    }
  } catch (err) {
    yield put({
      type: reducer.GOAL_FETCH_ERROR,
    });
  }
}

async function initAPI(data) {
  const userId = data.userId;
  const params = data;
  delete params.userId;
  const result = await axios.get(`${url}/goal/${userId}/init`, { params });
  return result;
}

function* initGoals(action) {
  try {
    const response = yield call(initAPI, action.data);
    if (response && response.data.type == "success" && response.data.data.tag) {
      yield put({
        type: reducer.GOAL_INIT_SUCCESS,
        data: response.data.data,
      });
    } else {
      yield put({
        type: reducer.GOAL_INIT_ERROR,
      });
    }
  } catch (err) {
    yield put({
      type: reducer.GOAL_INIT_ERROR,
    });
  }
}

async function updateAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  };
  const goalId = data.goal.goalId;
  const goal = { ...data.goal };
  delete goal.goalId;

  const result = await axios.patch(`${url}/goal/${goalId}`, goal, config);
  return result;
}

function* updateGoal(action) {
  try {
    const response = yield call(updateAPI, action.data);
    if (response && response.data.type == "success") {
      yield put({
        type: reducer.GOAL_UPDATE_SUCCESS,
        data: action.data,
      });
    } else {
      yield put({
        type: reducer.GOAL_UPDATE_ERROR,
        data: response.data.data,
      });
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: reducer.GOAL_UPDATE_ERROR,
    });
  }
}

async function deleteAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  };
  const goalId = data.goalId;

  const result = await axios.delete(`${url}/goal/${goalId}`, config);
  return result;
}

function* deleteGoal(action) {
  try {
    const response = yield call(deleteAPI, action.data);
    if (response && response.data.type == "success") {
      yield put({
        type: reducer.GOAL_DELETE_SUCCESS,
        data: action.data,
      });
    } else {
      yield put({
        type: reducer.GOAL_DELETE_ERROR,
        data: response.data.data,
      });
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: reducer.GOAL_DELETE_ERROR,
    });
  }
}

function* watchUser() {
  yield takeLatest(reducer.GOAL_INIT_REQUEST, initGoals);
  yield takeLatest(reducer.GOAL_FETCH_REQUEST, fetchGoals);
  yield takeLatest(reducer.GOAL_ADD_REQUEST, createGoal);
  yield takeLatest(reducer.GOAL_UPDATE_REQUEST, updateGoal);
  yield takeLatest(reducer.GOAL_DELETE_REQUEST, deleteGoal);
}

export default function* userSaga() {
  yield all([fork(watchUser)]);
}
