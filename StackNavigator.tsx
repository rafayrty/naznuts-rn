import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Tabs from './src/pages/Tabs';
const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Tabs} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
