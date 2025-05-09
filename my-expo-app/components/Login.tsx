import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const topSub = require('../assets/background/topSub.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      const response = await fetch('http://192.168.18.124:3000/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.message === 'Login successful') {
        Alert.alert('Success', 'Logged in successfully');
        navigation.replace('AfterLogin');
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to connect to server');
    }
  };

  return (
    <View className="relative flex-1 items-center justify-center px-6 bg-white">
      <Image source={topSub} className="absolute w-[120%] top-0 left-0" />

      <View className="w-full gap-3">
        <Text className="text-3xl font-bold text-center text-primary">Welcome!</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          className="border border-gray-300 rounded-md p-3 text-base"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          className="border border-gray-300 rounded-md p-3 text-base"
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-buttons p-3 rounded-md"
          onPress={handleLogin}
        >
          <Text className="text-center text-white text-lg font-medium">Login</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-blue-600 font-semibold">Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
