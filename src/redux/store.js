import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";

const store = configureStore({
  reducer: {
    posts: postReducer, // postSlice 연결
  },
});

export default store;
