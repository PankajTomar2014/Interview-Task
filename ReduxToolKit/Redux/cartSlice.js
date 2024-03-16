import {combineReducers, createSlice} from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    addCart: (state, action) => {
      console.log('state---', action);
      state.data.push(action.payload);
    },
    removeCart: (state, action) => {
      state.data = state.data.filter(item => item.id != action.payload);
    },
    emptyCart: state => {
      state.data = [];
    },
  },
});

export const {addCart, removeCart, emptyCart} = cart.actions;

const rootReducer = combineReducers({
  cart: cart.reducer,
});

export default rootReducer;
