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

    let brand = [];
    let category = [];
    let price = [];

    const productData = result.products;
    for (let i = 0; i < productData.length; i++) {
      brand.push({
        key: i,
        value: productData[i].brand,
        label: productData[i].brand,
      });

      category.push({
        key: i,
        value: productData[i].category,
        label: productData[i].category,
      });
      price.push(productData[i].price);
    }

    const uniqueBrand = [...new Map(brand.map((m) => [m.value, m])).values()];
    const uniqueCategory = [
      ...new Map(category.map((m) => [m.value, m])).values(),
    ];
    const maxValue = Math.max(...price);

    yield put({
      type: GET_PRODUCT_SUCCESS,
      result: {
        data: result,
        filter: {
          brand: uniqueBrand,
          category: uniqueCategory,
          priceMax: maxValue,
        },
      },
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCT_ERROR,
      error: error,
    });
  }
}

export function* watchGetProduct() {
  yield takeLatest(GET_PRODUCT, getProduct);
}
