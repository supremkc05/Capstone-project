import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const insets = useSafeAreaInsets();
  const [isScanning, setIsScanning] = useState(false);

  const toggleScanner = () => {
    setIsScanning((prev) => !prev);
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-white">
      <View className="bg-main h-[60px] justify-center items-center">
        <Text className="text-white text-center text-2xl">Pothole Marking</Text>
      </View>
      <View className="flex-1">
        <View className="border-2 border-main m-9 flex-1 justify-center items-center">
          {/* camera */}
        </View>
        <View className="mx-9 justify-center items-center mb-5">
          <TouchableOpacity
            className="bg-buttons p-3 w-full items-center rounded-md"
            onPress={toggleScanner}
          >
            <Text className="text-white text-2xl">
              {isScanning ? 'Pause' : 'Start'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
