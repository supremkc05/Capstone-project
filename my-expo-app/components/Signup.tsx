import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BASE_URL } from '../config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const topSub = require('../assets/background/topSub.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function Signup({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/Signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data === 'exist') {
        Alert.alert('Error', 'User already exists with this email');
      } else if (data.user) {
        Alert.alert('Success', 'Account created successfully');
        navigation.replace('AfterLogin');
      } else {
        Alert.alert('Error', 'Something went wrong');
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
        <Text className="text-3xl font-bold text-center text-primary">Create Account</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          className="border border-gray-300 rounded-md p-3 text-base"
        />

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

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="border border-gray-300 rounded-md p-3 text-base"
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-buttons p-3 rounded-md"
          onPress={handleSignup}
        >
          <Text className="text-center text-white text-lg font-medium">Signup</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-blue-600 font-semibold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
