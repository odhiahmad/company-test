import { put, takeLatest } from "redux-saga/effects";
import { filterFetch } from "../../../utils/apiFetch";
import { API_TIMEOUT, API_URL } from "../../../utils/constant";
import {
  GET_CART,
  GET_CART_PROCESS,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
} from "../../actions/cart";

function* getCart() {
  try {
    yield put({
      type: GET_CART_PROCESS,
    });
    const result = yield filterFetch(API_URL + `carts`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      timeout: API_TIMEOUT,
    });
    yield put({
      type: GET_CART_SUCCESS,
      result: result,
    });
  } catch (error) {
    yield put({
      type: GET_CART_ERROR,
      error: error,
    });
  }
}

export function* watchGetCart() {
  yield takeLatest(GET_CART, getCart);
}
