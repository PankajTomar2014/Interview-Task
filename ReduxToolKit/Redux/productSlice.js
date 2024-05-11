import {createSlice} from '@reduxjs/toolkit';

const products = createSlice({
  name: 'products',
  initialState: {
    data: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.data.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.data = state.data.filter(item => item != action.payload);
    },
    emptyProduct: state => {
      state.data = [];
    },
  },
});

export const {addProduct, removeProduct, emptyProduct} = products.actions;

export default products.reducer;
