import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import blogReducer from "./blog-slice";
import commentReducer from "./comment-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    comment: commentReducer,
  },
});
