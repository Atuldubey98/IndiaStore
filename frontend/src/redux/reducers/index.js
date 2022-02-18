import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  userAccess: userReducer,
});
export default reducers;
