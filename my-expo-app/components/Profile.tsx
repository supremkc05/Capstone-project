import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'config';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faAngleRight, faPen } from '@fortawesome/free-solid-svg-icons';
import UploadImageModal from '../components/UploadImageModal';
import { useSelector } from 'react-redux';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export default function Profile() {
  const navigation = useNavigation<NavigationProp>();
  const [userName, setUserName] = useState("User Name");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const email = useSelector((state: any) => state.email.value);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/Profile`, {
          params: { email }
        });

        setUserName(response.data.username);
        if (response.data.profilepic) {
          setProfilePic(`data:image/jpeg;base64,${response.data.profilepic}`);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [modalVisible]); // refetch after modal closes in case image was updated

  return (
    <>
      <View className="mt-[50px] flex-1 items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-5 top-0 mt-3 p-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="#000" />
        </TouchableOpacity>

        <Text className="text-[2.5rem] m-2">Profile</Text>

        <View className="relative mb-4">
          <View className="w-[150px] h-[150px] rounded-full overflow-hidden bg-gray-300">
            {profilePic ? (
              <Image
                source={{ uri: profilePic }}
                style={{ width: 150, height: 150 }}
              />
            ) : (
              <Text className="text-center mt-[60px] text-gray-500">No Image</Text>
            )}
          </View>
          <TouchableOpacity
            className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow"
            onPress={() => setModalVisible(true)}
          >
            <FontAwesomeIcon icon={faPen} size={16} color="#000" />
          </TouchableOpacity>
        </View>

        <Text className="text-[2.5rem]">{userName}</Text>
        <Text className="">{email}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View className="mx-5 my-2 p-5 flex-row justify-between items-center shadow-lg shadow-gray-400/50 rounded-2xl bg-white w-[90%]">
            <Text className="text-[1.5rem]">Change Password</Text>
            <FontAwesomeIcon icon={faAngleRight} />
          </View>
        </TouchableOpacity>
      </View>

      <UploadImageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
