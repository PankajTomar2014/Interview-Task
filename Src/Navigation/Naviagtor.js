import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import ImageListScreen from '../Screens/ImageListScreen';
import DetailScreen from '../Screens/DetailScreen';

const Stack = createStackNavigator();

export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}
        initialRouteName="ImageListScreen">
        <Stack.Screen
          name="ImageListScreen"
          component={ImageListScreen}
          options={{header: false}}
        />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
