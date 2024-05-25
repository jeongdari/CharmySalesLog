import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Button, TextInput, Linking } from 'react-native';
import DarkMode from '../components/DarkMode';

export default function AppSettingsScreen() {
  const { isDarkMode, toggleDarkMode } = DarkMode();
  const [dailySummary, setDailySummary] = useState(false);
  const [currency, setCurrency] = useState('USD');

  const handleExportData = () => {
    // Logic to export data as CSV/Excel files
    // Dummy implementation: Opens email client with CSV file attached
    const csvData = generateCSVData(); // Function to generate CSV data
    const subject = 'Sales Data Backup';
    const email = 'user@example.com';
    const url = `mailto:${email}?subject=${subject}&body=${csvData}`;
    Linking.openURL(url);
  };

  const generateCSVData = () => {
    // Dummy function to generate CSV data
    return 'Date,Total Sales\n2022-01-01,500\n2022-01-02,700\n2022-01-03,600';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>App Settings</Text>

      <View style={styles.setting}>
        <Text>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      <View style={styles.setting}>
        <Text>Daily Sales Summary</Text>
        <Switch value={dailySummary} onValueChange={setDailySummary} />
      </View>

      <View style={styles.setting}>
        <Text>Currency</Text>
        <TextInput
          style={styles.input}
          value={currency}
          onChangeText={setCurrency}
        />
      </View>

      <Button title="Export Data as CSV" onPress={handleExportData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
    marginLeft: 10,
  },
});
