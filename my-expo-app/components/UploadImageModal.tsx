import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

type UploadImageModalProps = {
  visible: boolean;
  onClose: () => void;
};

const UploadImageModal: React.FC<UploadImageModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-2xl w-[80%] items-center">
          <Text className="text-xl font-bold mb-4">Upload Profile Picture</Text>
          {/* Add image upload logic here */}
          <TouchableOpacity onPress={onClose} className="mt-4 bg-blue-500 px-4 py-2 rounded-xl">
            <Text className="text-white">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UploadImageModal;
