import { put, takeLatest } from "redux-saga/effects";
import { filterFetch } from "../../../utils/apiFetch";
import { API_TIMEOUT, API_URL } from "../../../utils/constant";
import {
  GET_PRODUCT,
  GET_PRODUCT_PROCESS,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
} from "../../actions/product";

function* getProduct(action) {
  try {
    yield put({
      type: GET_PRODUCT_PROCESS,
    });
    const result = yield filterFetch(
      API_URL + `products/search?q=${action.data.search}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        timeout: API_TIMEOUT,
      }
    );
    yield put({
      type: GET_PRODUCT_SUCCESS,
      result: result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: GET_PRODUCT_ERROR,
      error: error,
    });
  }
}

export function* watchGetProduct() {
  yield takeLatest(GET_PRODUCT, getProduct);
}
