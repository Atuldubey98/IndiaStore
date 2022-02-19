import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  userAccess: userReducer,
  productsAccess: productReducer,
});
export default reducers;
