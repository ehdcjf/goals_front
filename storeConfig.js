import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import createSaga from "redux-saga";
import rootSaga from "./saga/index";

const configureStore = () => {
  const isServer = typeof window == "undefined";
  const sagaMiddlewares = createSaga(); // 사가 선언
  const Middlewares = [sagaMiddlewares]; // 사가 쓴다
  const enhencer =
    process.env.NODE_ENV === "production" // 개발 모드일때는 데브툴도 쓴다.
      ? compose(applyMiddleware(...Middlewares))
      : composeWithDevTools(applyMiddleware(...Middlewares));

  if (isServer) {
    const Store = createStore(rootReducer, enhencer); //
    Store.sagaTask = sagaMiddlewares.run(rootSaga);
    return Store;
  } else {
    const { persistStore, persistReducer } = require("redux-persist"); // 퍼시스트 쓴다
    const storage = require("redux-persist/lib/storage").default; // 로컬스트로지로 쓴다.

    const persistConfig = {
      // 로컬스토리지 설정 // 개발자 도구- 애플리케이션- 로컬스토리지 확인.
      key: "root",
      storage,
      whitelist: ["user"],
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const Store = createStore(persistedReducer, enhencer);
    Store.__persistor = persistStore(Store);
    Store.sagaTask = sagaMiddlewares.run(rootSaga);

    return Store;
  }
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development", //개발모드일 떄는 디버그한다.
});
export default wrapper;
