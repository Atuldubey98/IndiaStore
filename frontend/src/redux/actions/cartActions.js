import { cartActionsTypes } from "../constants/cartActionsTypes";

export const addProduct = (productId) => {
  return {
    type: cartActionsTypes.ADD_PRODUCT,
    payload: productId,
  };
};

export const removeProduct = (productId) => {
  return {
    type: cartActionsTypes.REMOVE_PRODUCT,
    payload: productId,
  };
};
