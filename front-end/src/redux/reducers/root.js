import { combineReducers } from "redux";
import {
  cartReducer,
  productsReducer,
  cartProductReducer,
  orderReducer,
  userReducer,
} from "./index";

export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  cartProducts: cartProductReducer,
  users: userReducer,
  order: orderReducer,
});
