import {View, Text} from 'react-native';
import React from 'react';

import {RootStack} from './Navigation/Naviagtor';
import {Provider} from 'react-redux';
import store from './Redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}
