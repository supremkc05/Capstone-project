import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function NoCameraDeviceError() {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>No camera device found.</Text>
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
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
});
