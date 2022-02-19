import { productActionsTypes } from "../constants/productActionsTypes";

const initialState = {
  loading: false,
  error: null,
  products: [],
};

export const productReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case productActionsTypes.LOADING_PRODUCT:
      return {
        ...state,
        loading: payload,
      };
    case productActionsTypes.SET_PRODUCT:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case productActionsTypes.SET_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
