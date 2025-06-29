import React, { useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import { StatusBar } from 'expo-status-bar';
import { PermissionsPage } from './PermissionsPage';
import axios from 'axios';
import { BASE_URL } from 'config';
import { Worklets } from 'react-native-worklets-core';
import * as Location from 'expo-location';

export default function RNCamera() {
  const objectDetection = useTensorflowModel(require('../assets/model/teachable.tflite'));
  const model = objectDetection.state === 'loaded' ? objectDetection.model : undefined;
  const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
  const [coordinates, setCoordinates] = React.useState<{latitude: number, longitude: number} | null>(null);
  const [locationPermission, setLocationPermission] = React.useState(false);

  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();
  const { resize } = useResizePlugin();

  const lastReportTime = useRef(0);
  const REPORT_INTERVAL = 1000;


  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
    })();
  }, []);

  const onPotholeDetected = Worklets.createRunOnJS(async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      const dataToSend = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date().toISOString(),
      };
      const response = await axios.post(`${BASE_URL}/pothole-detection`, dataToSend);
      console.log('✅ Detection sent:', response.data);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Failed to send detection:', err.message);
      } else {
        console.error('Failed to send detection:', err);
      }
    }
  });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    if (!model) return;

    const resized = resize(frame, {
      scale: { width: 224, height: 224 },
      pixelFormat: 'rgb',
      dataType: 'uint8',
    });

    if (!resized) {
      console.log('❌ Resize failed');
      return;
    }

    try {
      const outputs = model.runSync([resized]);
      const confidence = outputs[0]['0'];
      const now = Date.now();

      if (confidence > 200 && now - lastReportTime.current > REPORT_INTERVAL) {
        console.log(`🔥 Pothole detected with confidence: ${confidence}`);
        lastReportTime.current = now;
        onPotholeDetected();
      }
    } catch (error) {
      console.error('❌ Model run error:', error);
    }
  }, [model]);

  const getCurrentLocation = async () => {
    try {
      // Request permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  // Use coordinates in your reportPothole function
  const reportPothole = async () => {
    if (!coordinates) {
      // Handle no location case
      return;
    }

    const data = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      // ... other data
    };
    
    // Make your API call here
  };

  if (!hasPermission) return <PermissionsPage />;
  if (!device) {
    return (
      <View>
        <StatusBar style="light" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No camera device found.</Text>
        </View>
      </View>
    );
  }

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
