import { usersActionsTypes } from "../constants/usersActionsTypes";

export default setUser = (user) => {
  return {
    type: usersActionsTypes.SET_USER,
    payload: user
  };
};

export default setUserLoading = () =>{
    return {
        type : usersActionsTypes.LOADING_USER
    }
}
export default setUserError = () =>{
    return {
        type : usersActionsTypes.SET_USER_ERROR
    }
}
