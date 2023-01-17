export const GET_PRODUCT_PROCESS = "GET_PRODUCT_PROCESS";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR";
export const GET_PRODUCT_RESET = "GET_PRODUCT_RESET";

export const GET_PRODUCT = "GET_PRODUCT";

export function getProduct(data) {
  let TYPE = data.reset ? GET_PRODUCT_RESET : GET_PRODUCT;
  return {
    type: TYPE,
    data: data,
  };
}
