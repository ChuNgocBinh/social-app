import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: [],
  reducers: {
    activeSokcet: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { actions, reducer } = socketSlice;
export const { activeSokcet } = actions;
export default reducer;
