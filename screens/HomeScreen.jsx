import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
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
