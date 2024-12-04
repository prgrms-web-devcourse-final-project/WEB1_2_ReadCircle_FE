import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer, 
    posts: postReducer, // 이커머스, 직거래 책 가져오기
    auth: authReducer, // Header 사용자 정보 가져오기
  },
});

export default store;
