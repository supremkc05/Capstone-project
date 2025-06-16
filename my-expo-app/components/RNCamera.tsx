import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import { StatusBar } from 'expo-status-bar';
import { PermissionsPage } from './PermissionsPage';
import axios from 'axios';
import { BASE_URL } from 'config';



export default function RNCamera() {
  const objectDetection = useTensorflowModel(require('../assets/model/teachable.tflite'));
  const model = objectDetection.state === 'loaded' ? objectDetection.model : undefined;

  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();
  const { resize } = useResizePlugin();

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    if (!model) return;

    const resized = resize(frame, {
      scale: { width: 224, height: 224},
      pixelFormat: 'rgb',
      dataType: 'uint8',
    });

    if (!resized) {
      console.log('Resize failed');
      return;
    }

    try {
      const outputs = model.runSync([resized]);
      if(outputs[0]["0"] > 150){
        console.log('Pothole');
      }

    } catch (error) {
      console.log(error);
    }
  }, [model]);

  const reportPothole = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/pothole-detection`, {
        detected: true,
        timestamp: new Date().toISOString()
      });
      console.log('Detection reported:', response.data);
    } catch (error) {
      console.error('Error reporting detection:', error);
    }
  };

  if (!hasPermission) return <PermissionsPage />;
  if (!device) return <View><StatusBar style="light" /><View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>No camera device found.</Text></View></View>;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
