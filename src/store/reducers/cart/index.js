import {
  GET_CART_PROCESS,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  GET_CART_RESET,
} from "../../actions/cart";

const initState = {
  result: null,
  loading: false,
  error: null,
};

export function getCart(state = initState, action) {
  switch (action.type) {
    case GET_CART_PROCESS:
      return {
        ...initState,
        loading: true,
        result: null,
        error: null,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        result: action.result,
        loading: false,
        error: null,
      };
    case GET_CART_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        result: null,
      };
    case GET_CART_RESET:
      return initState;
    default:
      return state;
  }
}
