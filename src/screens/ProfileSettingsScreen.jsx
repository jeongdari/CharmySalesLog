import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableWithoutFeedback, ScrollView, Platform, Keyboard } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { getStyles } from '../styles/SettingStyles';
import { handleLogout } from '../components/handleLogout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../components/config';
import { SettingsContext } from '../components/SettingsContext';

const decodeToken = (token) => {
  try {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Add padding
    while (base64.length % 4) {
      base64 += '=';
    }

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};

export default function ProfileSettingsScreen() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(""); // Username cannot be changed
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(true);
  const { fontSize, isDarkMode } = useContext(SettingsContext);

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.log("No token found, redirecting to Auth screen");
          navigation.navigate("Auth"); // Redirect to login if no token
          return;
        }

        const decoded = decodeToken(token);
        if (!decoded) {
          console.log("Token is invalid, redirecting to Auth screen");
          navigation.navigate("Auth"); // Redirect to login if token is invalid
          return;
        }

        const userId = decoded.user_id;
        setUserId(userId);

        const response = await fetch(
          `${config.API_BASE_URL}/profile/${userId}`
        );
        const result = await response.json();

        if (response.status === 200) {
          setUsername(result.username);
          setEmail(result.email);
          setContact(result.phone_number);
        } else {
          console.error("Error fetching profile:", result.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID not found");
      return;
    }

    try {
      const response = await fetch(`${config.API_BASE_URL}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, email, phone_number: contact }),
      });

      const result = await response.json();

      if (response.status === 200) {
        Alert.alert(
          "Profile Updated",
          "Your profile information has been updated."
        );
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID not found");
      return;
    }

    try {
      const response = await fetch(`${config.API_BASE_URL}/profile/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const result = await response.json();

      if (response.status === 200) {
        Alert.alert("Account Deleted", "Your account has been deleted successfully.");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          })
        ); 
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Error", "Failed to delete account");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.header, { fontSize }]}>Profile Settings</Text>

        <Text style={[styles.label, { fontSize }]}>Username:</Text>
        <Text style={[styles.username, { fontSize }]}>{username}</Text>

        <View style={styles.separator} />

        <TextInput
          style={[styles.input, { fontSize }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
        />
        <TextInput
          style={[styles.input, { fontSize }]}
          placeholder="Contact"
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
          placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
        />
        <Button title="Update Profile" onPress={handleProfileUpdate} />

        <View style={styles.separator} />

        <Button
          title="Logout"
          onPress={() => handleLogout(navigation)}
          color="red"
        />

        <View style={styles.separator} />

        <Button
          title="Delete Account"
          onPress={() => {
            handleDeleteAccount();
          }}
          color="black"
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
