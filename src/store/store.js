import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { composeWithDevTools } from "redux-devtools-extension";

let store;
const sagaMiddleware = createSagaMiddleware();
store = createStore(
  rootReducer,
  // applyMiddleware(sagaMiddleware),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
