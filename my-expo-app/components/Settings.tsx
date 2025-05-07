import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export default function Settings() {
  const navigation = useNavigation<NavigationProp>();

  const handleSignOut = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => navigation.navigate('Login'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className='flex-1 mt-[50px]'>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View className='mx-5 my-2 p-5 flex-row justify-between items-center shadow-lg shadow-gray-400/50 rounded-2xl bg-white'>
          <Text className='text-[1.5rem]'>Profile</Text>
          <FontAwesomeIcon icon={faAngleRight} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View className='mx-5 my-2 p-5 flex-row justify-between items-center shadow-lg shadow-gray-400/50 rounded-2xl bg-white'>
          <Text className='text-[1.5rem]'>Privacy Compliance</Text>
          <FontAwesomeIcon icon={faAngleRight} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignOut}>
        <View className='mx-5 my-2 p-5 flex-row justify-between items-center shadow-lg shadow-gray-400/50 rounded-2xl bg-white'>
          <Text className='text-[1.5rem]'>Sign out</Text>
          <FontAwesomeIcon icon={faAngleRight} />
        </View>
      </TouchableOpacity>

    </View>
  );
}
