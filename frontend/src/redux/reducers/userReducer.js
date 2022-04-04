import { usersActionsTypes } from "../constants/usersActionsTypes";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case usersActionsTypes.LOADING_USER:
      return {
        ...state,
        loading: payload,
      };
    case usersActionsTypes.SET_USER:
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
      };
    case usersActionsTypes.SET_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        error: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
