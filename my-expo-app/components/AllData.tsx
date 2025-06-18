import axios from 'axios';
import { BASE_URL } from 'config';
import React from 'react'
import {Text, View} from 'react-native'


export default function AllData() {

  const reportPothole = async () => {
  console.log("📤 Trying to send pothole detection...");

  try {
    const dataToSend = {
      detected: true,
      timestamp: new Date().toISOString()
    };

    console.log("Sending data:", dataToSend);  // Check what's being sent
    const response = await axios.post(`${BASE_URL}/pothole-detection`, dataToSend);
    console.log('✅ Detection reported:', response.data);
  } catch (e) {
    if (e instanceof Error) {
      console.error('❌ Error reporting detection:', e.message);
    } else {
      console.error('❌ Error reporting detection:', e);
    }
  }
};
  return (
<>
<View className='flex-1 justify-center items-center'>
    <Text>All Data</Text>
</View>
</>
  )
}
