import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import paymentReducer from "./paymentSlice";
import adminReducer from "./adminSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    payment: paymentReducer,
    posts: postReducer, // 이커머스, 직거래 책 가져오기
    auth: authReducer, // Header 사용자 정보 가져오기
    admin: adminReducer,
  },
});

export default store;
