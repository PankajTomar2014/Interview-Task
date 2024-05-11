import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductApi = createAsyncThunk(
  'fetchProductApi',
  async payload => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  },
);

const apiProducts = createSlice({
  name: 'apiProducts',
  initialState: {
    products: [],
    status: 'idle', // 'loading', 'succeeded', 'failed'
    error: null,
  },
  extraReducers: builder => {
    builder
      // When the fetchProductApi thunk is pending
      .addCase(fetchProductApi.pending, state => {
        state.status = 'loading';
      })
      // When the fetchProductApi thunk is fulfilled
      .addCase(fetchProductApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      // When the fetchProductApi thunk is rejected
      .addCase(fetchProductApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
  // reducers: {
  //   saveProduct: (state, action) => {
  //     console.log(state, action);
  //     state.data = action.payload;
  //   },
  //   removeProduct: (state, action) => {
  //     state.data = state.data.filter(item => item != action.payload);
  //   },
  //   emptyProduct: state => {
  //     state.data = [];
  //   },
  // },
});

export const {saveProduct, removeProduct, emptyProduct} = apiProducts.actions;

export default apiProducts.reducer;
