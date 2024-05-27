import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from "../styles/SettingStyles";
import { handleLogout } from '../components/handleLogout';

export default function ProfileSettingsScreen() {
  const navigation = useNavigation();
  const [username] = useState('exampleUser'); // Username cannot be changed
  const [email, setEmail] = useState('example@example.com');
  const [contact, setContact] = useState('1234567890');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleProfileUpdate = () => {
    // Logic to update profile
    Alert.alert("Profile Updated", "Your profile information has been updated.");
  };

  const handleChangePassword = () => {
    // Logic to change password
    Alert.alert("Password Changed", "Your password has been changed successfully.");
  };

  const handleLogoutPress = () => {
    handleLogout(navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Settings</Text>
      
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.username}>{username}</Text>

      <View style={styles.separator} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />
      <Button title="Update Profile" onPress={handleProfileUpdate} />

      <View style={styles.separator} />

      <TextInput
        style={styles.input}
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Change Password" onPress={handleChangePassword} />

      <View style={styles.separator} />

      <Button title="Logout" onPress={handleLogoutPress} color="red" />
    </View>
  );
}