import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';

export function PermissionsPage() {
  const { requestPermission } = useCameraPermission();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera access is required to continue.</Text>
      <Button title="Grant Permission" onPress={requestPermission} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
