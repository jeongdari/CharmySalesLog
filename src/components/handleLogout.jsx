import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
    Alert.alert("Logged Out", "You have been logged out successfully.");
  } catch (error) {
    console.error('Error logging out:', error);
    Alert.alert("Logout Error", "An error occurred while logging out.");
  }
};
