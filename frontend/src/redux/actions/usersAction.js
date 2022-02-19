import { usersActionsTypes } from "../constants/usersActionsTypes";

export const setUser = (user) => {
  return {
    type: usersActionsTypes.SET_USER,
    payload: user,
  };
};

export const setUserLoading = (loading) => {
  return {
    type: usersActionsTypes.LOADING_USER,
    payload: loading,
  };
};
export const setUserError = () => {
  return {
    type: usersActionsTypes.SET_USER_ERROR,
  };
};
