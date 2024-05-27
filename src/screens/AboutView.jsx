import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const licensesData = [
  { name: 'React', license: 'MIT License' },
  { name: 'React Native', license: 'MIT License' },
  { name: 'Redux', license: 'MIT License' },
  // Add more license data as needed
];

export default function AboutView({ onClose }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Charmy Bottle Shop</Text>
        <Text>This app is a simple accounting application to log daily sales amount of Charmy Bottle Shop.</Text>
        <Text style={styles.subtitle}>Open-Source Licenses:</Text>
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
});
