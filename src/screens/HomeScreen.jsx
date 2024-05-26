import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../components/config';

export default function HomeScreen({ navigation }) {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.API_BASE_URL}/sales/latest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await response.json();
        if (response.ok) {
          // Format the date to YYYY-MM-DD
          const formattedDate = new Date(result.date).toISOString().split('T')[0];
          setSalesData({
            ...result,
            date: formattedDate,
          });
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Sales Logging App</Text>
      <View style={styles.salesSummary}>
        {salesData ? (
          <>
            <Text style={styles.salesText}>Last Updated Sales:</Text>
            <Text style={styles.salesDetail}>Date: {salesData.date}</Text>
            <Text style={styles.salesDetail}>Card: ${salesData.card_payment_amt}</Text>
            <Text style={styles.salesDetail}>Cash: ${salesData.cash_payment_amt}</Text>
          </>
        ) : (
          <Text style={styles.salesText}>No sales data available.</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Record Sales')}
        >
          <Text style={styles.buttonText}>Record Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Reports')}
        >
          <Text style={styles.buttonText}>View Reports</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 80,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  salesSummary: {
    marginTop: 10,
    marginBottom: 50,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '70%',
  },
  salesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  salesDetail: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    marginBottom: 5,
    textAlign: 'left',
  },
});
