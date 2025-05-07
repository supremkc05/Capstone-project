import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';



type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;


export default function Profile() {

      const navigation = useNavigation<NavigationProp>();
      const [userName, setUserName] = useState<string>("User Name")
      const [email, setEmail] = useState<string>("user@gmail.com")

  return (
<>
<View className='mt-[50px] flex-1 items-center'>
<TouchableOpacity 
    onPress={() => navigation.goBack()} 
    className='absolute left-5 top-0 mt-3 p-2'
  >
    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#000" />
  </TouchableOpacity>
    <Text className='text-[2.5rem] m-2'>Profile</Text>
    <View className='w-[150px] h-[150px] rounded-full bg-red-400'></View>
    <Text className='text-[2.5rem]'>{userName}</Text>
    <Text className=''>{email}</Text>
    <View className='mx-5 my-2 p-5 flex-row justify-between items-center shadow-lg shadow-gray-400/50 rounded-2xl bg-white w-[90%]'>
          <Text className='text-[1.5rem]'>Change Password</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <FontAwesomeIcon icon={faAngleRight} />
          </TouchableOpacity>
        </View>
</View>
</>
  )
}
