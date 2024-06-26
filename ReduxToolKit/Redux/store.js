import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import cart from './cartSlice';
import theme from './themeSlice';
import products from './productSlice';
import apiProducts from './apiCall';

// Middleware function to log actions
const loggerMiddleware = store => next => action => {
  console.log('Dispatching action:', action.type);
  return next(action);
};

// Customize the default middleware stack
// const customizedMiddleware = getDefaultMiddleware().concat(loggerMiddleware);

// Configure the Redux store with customized middleware
const store = configureStore({
  reducer: {
    cart,
    theme,
    products,
    apiProducts,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
