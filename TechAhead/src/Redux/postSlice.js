import {createSlice} from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    data: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.data.push(action.payload);
    },
    removePost: (state, action) => {
      state.data = state.data.filter(item => item != action.payload);
    },
    emptyPost: state => {
      state.data = [];
    },
  },
});

export const {addPost, removePost, emptyPost} = postSlice.actions;

export default postSlice.reducer;
