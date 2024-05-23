import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

// Sample data for open-source licenses
const licensesData = [
  { name: 'Library A', license: 'MIT License' },
  { name: 'Library B', license: 'Apache License 2.0' },
  // Add more license data as needed
];

const AboutView = ({ onClose }) => {
  return (
    <Modal animationType="slide" visible={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Charmy Sales Log Application</Text>
        <Text style={styles.description}>
          This application is a simple accounting application to log daily sales amount of Charmy Bottle Shop.
        </Text>
        <Text style={styles.subtitle}>Open-Source Licenses:</Text>
        {licensesData.map((item, index) => (
          <Text key={index} style={styles.license}>
            {item.name}: {item.license}
          </Text>
        ))}
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  license: {
    marginBottom: 5,
  },
});

export default AboutView;
