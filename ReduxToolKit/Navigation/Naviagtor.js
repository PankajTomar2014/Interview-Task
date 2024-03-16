import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import ProductList from '../Screens/ProductList';
import ProductDetails from '../Screens/ProductDetails';
import Cart from '../Screens/Cart';

const Stack = createStackNavigator();

export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}
        initialRouteName="HomeScreen">
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{header: false}}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
