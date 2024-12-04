import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    posts: postReducer, // postSlice 연결
    cart: cartReducer, 
  },
});

export default store;
