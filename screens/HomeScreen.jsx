import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Sales Logging App!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Record Sales"
          onPress={() => navigation.navigate('Record Sales')}
        />
        <Button
          title="View Reports"
          onPress={() => navigation.navigate('Reports')}
        />
      </View>
      <View style={styles.salesSummary}>
        <Text>Today's Total Sales:</Text>
        <Text>Card: $500</Text>
        <Text>Cash: $300</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  salesSummary: {
    marginTop: 20,
    alignItems: 'center',
  },
});
