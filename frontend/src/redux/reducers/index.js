import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  userAccess: userReducer,
  productsAccess: productReducer,
  cartAccess: cartReducer,
});
export default reducers;
