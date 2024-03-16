import React from 'react';
import {Provider} from 'react-redux';
import store from './Redux/store';
import {RootStack} from './Navigation/Naviagtor';

const App = () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};

export default App;
