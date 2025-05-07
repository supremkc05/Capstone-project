import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar'; // Expo status bar import
import Login from './components/Login';
import Signup from './components/Signup';
import AfterLogin from './components/AfterLogin';
import Profile from './components/Profile';
import { RootStackParamList } from './types'; 
import './global.css'

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#021F61" style="light" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ gestureEnabled: false, headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="AfterLogin" component={AfterLogin} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
