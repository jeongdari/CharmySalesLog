import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MonthlyReportScreen() {
  // Replace with actual data fetching logic
  const data = {
    totalCard: 30000,
    totalCash: 15000,
  };

  return (
    <View style={styles.container}>
      <Text>Monthly Report</Text>
      <Text>Total Card Payments: ${data.totalCard}</Text>
      <Text>Total Cash Payments: ${data.totalCash}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
