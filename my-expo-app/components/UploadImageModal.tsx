import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type UploadImageModalProps = {
  visible: boolean;
  onClose: () => void;
};

const UploadImageModal: React.FC<UploadImageModalProps> = ({ visible, onClose }) => {

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Selected image:', result.assets[0].uri);
      // handle the selected image URI
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
