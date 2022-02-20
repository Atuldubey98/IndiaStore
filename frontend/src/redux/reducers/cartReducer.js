import { cartActionsTypes } from "../constants/cartActionsTypes";

const { ADD_PRODUCT, REMOVE_PRODUCT } = cartActionsTypes;
const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT:
      if (state.cart.length === 0) {
        return {
          ...state,
          cart: [...state.cart, payload],
        };
      }
      const index = state.cart.findIndex(
        (product) => product.productId === payload.productId
      );
      if (index === -1) {
        return {
          ...state,
          cart: [...state.cart, payload],
        };
      }
      state.cart[index].quantity++;
      return {
        ...state,
      };
    case REMOVE_PRODUCT:
      if (state.cart.length === 0) {
        return {
          ...state,
        };
      }
      const removeindex = state.cart.findIndex(
        (product) => product.productId === payload.productId
      );
      if (removeindex === -1) {
        return {
          ...state,
        };
      }
      if (state.cart[removeindex].quantity === 1) {
        return {
          ...state,
          cart: state.cart.filter(
            (product) => product.productId !== payload.productId
          ),
        };
      }
      state.cart[removeindex].quantity--;
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
