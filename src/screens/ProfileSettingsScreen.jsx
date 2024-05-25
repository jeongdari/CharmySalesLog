import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function ProfileSettingsScreen() {
  const [username] = useState('exampleUser'); // Username cannot be changed
  const [email, setEmail] = useState('example@example.com');
  const [contact, setContact] = useState('1234567890');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogout = () => {
    // Logic to log out
    Alert.alert("Logged Out", "You have been logged out successfully.");
  };

  const handleProfileUpdate = () => {
    // Logic to update profile
    Alert.alert("Profile Updated", "Your profile information has been updated.");
  };

  const handleChangePassword = () => {
    // Logic to change password
    Alert.alert("Password Changed", "Your password has been changed successfully.");
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

      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  separator: {
    height: 20,
  },
});
