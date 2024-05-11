import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import CreatePost from '../Screens/CreatePost';
import HomeScreen from '../Screens/HomeScreen';
import PostList from '../Screens/PostList';

const Stack = createStackNavigator();

export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}
        initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="PostList" component={PostList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
