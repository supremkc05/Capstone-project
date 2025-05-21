import React from 'react';
import { Modal, View, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useSelector } from 'react-redux';
import { BASE_URL } from 'config';

type UploadImageModalProps = {
  visible: boolean;
  onClose: () => void;
};

const UploadImageModal: React.FC<UploadImageModalProps> = ({ visible, onClose}) => {
    const email = useSelector((state: any) => state.email.value);


  const uploadImageToServer = async (uri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const fileName = uri.split('/').pop() || 'profile.jpg';
      const fileType = fileName.split('.').pop();

      const formData = new FormData();
      formData.append('email', email);
      formData.append('profilepic', {
        uri,
        name: fileName,
        type: `image/${fileType}`,
      } as any); // `as any` needed for React Native FormData types

      const response = await fetch(`${BASE_URL}/profilePic`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      console.log(result);
      Alert.alert('Upload Success', result.message);
      onClose();

    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Upload Failed', 'Something went wrong!');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      console.log('Selected image:', imageUri);
      await uploadImageToServer(imageUri);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-2xl w-[80%] items-center">
          <Text className="text-xl font-bold mb-4">Upload Profile Picture</Text>

          <TouchableOpacity onPress={pickImage} className="bg-green-500 px-4 py-2 rounded-xl mb-4">
            <Text className="text-white">Pick Image</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} className="bg-blue-500 px-4 py-2 rounded-xl">
            <Text className="text-white">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UploadImageModal;
