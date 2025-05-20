import React from 'react';
import { Platform, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Signup from './components/Signup';
import AfterLogin from './components/AfterLogin';
import Profile from './components/Profile';
import { RootStackParamList } from './types'; 
import './global.css'

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <>
    {Platform.OS === 'android' && (
      <StatusBar backgroundColor="#021F61" barStyle="light-content" />
    )}      <NavigationContainer>
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
