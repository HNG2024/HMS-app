// storageUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUid = async () => {
  try {
    const uId = await AsyncStorage.getItem('uId'); // Ensure the key is 'userId'
    if (uId) {
      return uId;
    } else {
      throw new Error('U-ID not found');
    }
  } catch (error) {
    console.error('Error retrieving uId:', error);
    // Handle the error appropriately
  }
};
