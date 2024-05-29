import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SettingsContext } from '../components/SettingsContext';
import { getStyles } from '../styles/ReportScreen';

export default function WeeklyReportScreen() {
  const { fontSize, isDarkMode } = useContext(SettingsContext);

  const styles = getStyles(isDarkMode);

  const data = {
    totalCard: 7000,
    totalCash: 3500,
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontSize }]}>Weekly Report</Text>
      <Text style={[styles.text, { fontSize }]}>Total Card Payments: ${data.totalCard}</Text>
      <Text style={[styles.text, { fontSize }]}>Total Cash Payments: ${data.totalCash}</Text>
    </View>
  );
}
