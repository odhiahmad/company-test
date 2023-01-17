export const GET_CART_PROCESS = "GET_CART_PROCESS";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_ERROR = "GET_CART_ERROR";
export const GET_CART_RESET = "GET_CART_RESET";

export const GET_CART = "GET_CART";

export function getCart(data) {
  let TYPE = data.reset ? GET_CART_RESET : GET_CART;
  return {
    type: TYPE,
    data: data,
  };
}
