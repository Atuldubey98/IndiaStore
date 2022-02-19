import { productActionsTypes } from "../constants/productActionsTypes";

export const setProduct = (product) => {
  return {
    type: productActionsTypes.SET_PRODUCT,
    payload: product,
  };
};

export const setProductLoading = (loading) => {
  return {
    type: productActionsTypes.LOADING_PRODUCT,
    payload: loading,
  };
};
export const setProductError = () => {
  return {
    type: productActionsTypes.SET_PRODUCT_ERROR,
  };
};
