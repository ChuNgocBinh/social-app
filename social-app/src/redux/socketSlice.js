import { createSlice } from "@reduxjs/toolkit";
import socketClient from "../socket";

const initialState = {
  socket: socketClient,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {},
});

export const { logout } = socketSlice.actions;

export default socketSlice.reducer;
