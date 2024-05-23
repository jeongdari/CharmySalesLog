import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeeklyReportScreen() {
  // Replace with actual data fetching logic
  const data = {
    totalCard: 7000,
    totalCash: 3500,
  };

  return (
    <View style={styles.container}>
      <Text>Weekly Report</Text>
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
