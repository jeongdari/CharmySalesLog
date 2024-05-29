import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SettingsContext } from '../components/SettingsContext';
import { getStyles } from '../styles/ReportScreen';

export default function MonthlyReportScreen() {
  const { fontSize, isDarkMode } = useContext(SettingsContext);

  const styles = getStyles(isDarkMode);

  const data = {
    totalCard: 30000,
    totalCash: 15000,
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontSize }]}>Monthly Report</Text>
      <Text style={[styles.text, { fontSize }]}>Total Card Payments: ${data.totalCard}</Text>
      <Text style={[styles.text, { fontSize }]}>Total Cash Payments: ${data.totalCash}</Text>
    </View>
  );
}
