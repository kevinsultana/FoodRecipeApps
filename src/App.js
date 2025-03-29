import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './routes/route';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
      <Toast />
    </NavigationContainer>
  );
}
