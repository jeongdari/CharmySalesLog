import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import config from '../components/config';
import { styles } from '../styles/AuthStyles';

export default function AuthScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  const handlePhoneNumberChange = (text) => {
    // Allow only numeric input
    setPhoneNumber(text.replace(/[^0-9]/g, ''));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAuth = async () => {
    if (!isLogin && !validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }

    try {
      const endpoint = isLogin ? 'login' : 'signup';
      const body = isLogin
        ? { username, password }
        : { username, password, email, phone_number: phoneNumber };

      const response = await fetch(`${config.API_BASE_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.token) {
          await AsyncStorage.setItem('token', result.token);
          Alert.alert('Success', isLogin ? 'Login successful' : 'Sign-up successful');
          navigation.navigate('Main');
        } else {
          Alert.alert('Error', 'No token received from server');
        }
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during authentication');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('/Users/danny/Desktop/CharmySalesLog/assets/images/Charmyicon.png')}
        style={styles.icon}
      />
      <Text style={styles.header}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="numeric"
          />
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handleAuth} />
      </View>
      <Text
        style={styles.toggleButton}
        onPress={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
      </Text>
    </View>
  );
}