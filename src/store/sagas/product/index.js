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
    let product = [];
    let category = [];
    let price = [];

    const productData = result.products;
    for (let i = 0; i < productData.length; i++) {
      brand.push(productData[i].brand);
      product.push(productData[i].title);
      category.push(productData[i].category);
      price.push(productData[i].price);
    }

    let uniqueBrand = [...new Set(brand)];
    let uniqueProduct = [...new Set(product)];
    let uniqueCategory = [...new Set(category)];
    const maxValue = Math.max(...price);
    const minValue = Math.min(...price);
    yield put({
      type: GET_PRODUCT_SUCCESS,
      result: {
        data: result,
        filter: {
          brand: uniqueBrand,
          product: uniqueProduct,
          category: uniqueCategory,
          priceMax: maxValue,
          priceMin: minValue,
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
