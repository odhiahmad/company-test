import {
  GET_PRODUCT_PROCESS,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_RESET,
} from "../../actions/product";

const initState = {
  result: null,
  filter: [],
  loading: false,
  error: null,
};

export function getProduct(state = initState, action) {
  switch (action.type) {
    case GET_PRODUCT_PROCESS:
      return {
        ...initState,
        loading: true,
        result: null,
        error: null,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        result: action.result.data,
        filter: action.result.filter,
        loading: false,
        error: null,
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        result: null,
      };
    case GET_PRODUCT_RESET:
      return initState;
    default:
      return state;
  }
}
