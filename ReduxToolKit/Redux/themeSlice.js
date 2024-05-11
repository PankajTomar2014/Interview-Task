import {createSlice} from '@reduxjs/toolkit';

const theme = createSlice({
  name: 'darkMode',
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    toggleDarkMode: (state, actions) => {
      state.isDarkMode = !actions.payload;
    },
  },
});

export const {toggleDarkMode} = theme.actions;

export default theme.reducer;
