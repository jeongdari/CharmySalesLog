import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AboutView from './AboutView';

export default function HomeScreen({ navigation }) {
  const [showAbout, setShowAbout] = useState(false);

  const handleAboutPress = () => {
    setShowAbout(true);
  };

  const handleCloseAbout = () => {
    setShowAbout(false);
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Sales Logging App!</Text>
      <Button
        title="Record Sales"
        onPress={() => navigation.navigate('Record Sales')}
      />
      <Button
        title="View Reports"
        onPress={() => navigation.navigate('Reports')}
      />
      <View style={styles.salesSummary}>
        <Text>Today's Total Sales:</Text>
        <Text>Card: $500</Text>
        <Text>Cash: $300</Text>
      </View>

      {/* Add a button to open the AboutView */}
      <Button title="About" onPress={handleAboutPress} />

      {/* Render the AboutView as a modal */}
      {showAbout && <AboutView onClose={handleCloseAbout} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  salesSummary: {
    marginTop: 20,
  },
});
