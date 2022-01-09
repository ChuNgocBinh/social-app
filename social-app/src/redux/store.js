import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import socketRuducer from "./socketSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // socket: socketRuducer,
  },
});
