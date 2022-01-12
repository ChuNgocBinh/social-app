import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    posts: [],
  },
  reducers: {
    deletePost: (state, action) => {
      const newPost = state.posts.filter((item) => item._id !== action.payload);
      console.log(newPost);
      state.posts = newPost;
    },
  },
});

const { actions, reducer } = postSlice;
export const { deletePost } = actions;
export default reducer;
