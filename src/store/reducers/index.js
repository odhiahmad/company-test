import { combineReducers } from "redux";
import { getCart } from "../reducers/cart";
import { getProduct } from "../reducers/product";

const rootReducer = combineReducers({
  getCart,
  getProduct,
});

export default rootReducer;
