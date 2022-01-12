import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "../socket/socketSlice";
import userReducer from "./userSlice";
import postReducer from "../Components/ListPosts/postSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
