import { all, fork } from "redux-saga/effects";
import { watchGetCart } from "./cart";
import { watchGetProduct } from "./product";

export default function* sagas() {
  yield all([fork(watchGetCart), fork(watchGetProduct)]);
}
