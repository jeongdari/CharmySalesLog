import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import config from '../components/config';

export default function AboutView({ onClose }) {
  const [licensesData, setLicensesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/crawler/licenses`);
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const result = await response.json();
        setLicensesData(Object.entries(result).map(([name, licenseData]) => ({
          name,
          license: licenseData.licenses,
        })));
      } catch (error) {
        setError('Failed to fetch license data');
        console.error('Error fetching license data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLicenses();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Charmy Bottle Shop</Text>
        <Text>This app is a simple accounting application to log daily sales amount of Charmy Bottle Shop.</Text>
        <Text style={styles.subtitle}>Open-Source Licenses:</Text>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.error}>{error}</Text>}
        <ScrollView style={styles.licenseList}>
          {licensesData.map((license, index) => (
            <View key={index} style={styles.licenseItem}>
              <Text style={styles.licenseName}>{license.name}</Text>
              <Text>{license.license}</Text>
            </View>
          ))}
        </ScrollView>
        <Button title="Close" onPress={onClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  licenseList: {
    marginTop: 10,
  },
  licenseItem: {
    marginBottom: 10,
  },
  licenseName: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
  },
});
