import React, { useState, useEffect } from 'react';
import { Appearance, StyleSheet, Text, View } from 'react-native';

export default function DarkMode() {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'black' : 'white',
    },
    text: {
      color: isDarkMode ? 'white' : 'black',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a {isDarkMode ? 'dark' : 'light'} theme.</Text>
    </View>
  );
}
