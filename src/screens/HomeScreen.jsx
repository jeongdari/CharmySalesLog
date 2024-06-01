import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../components/config';
import AboutView from './AboutView';
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from '../components/SettingsContext';
import { getStyles } from '../styles/HomeStyles';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const { fontSize, isDarkMode } = useContext(SettingsContext);

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setShowAbout(true)}>
          <Ionicons name="information-circle" size={25} color="tomato" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchSalesData = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${config.API_BASE_URL}/sales/latest`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const result = await response.json();
      if (result.data !== null) {
        // Convert date from UTC to local timezone
        let utcDate = new Date(result.data.date);
        let localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));
        result.data.date = localDate.toISOString().split('T')[0];
        setSalesData(result.data);
      } else {
        setError(result.message || 'No sales data available.');
        setSalesData(null);
      }
    } catch (error) {
      setError('Error fetching sales data');
      console.error('Error fetching sales data:', error);
      setSalesData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSalesData();
    }, [fetchSalesData])
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  if (showAbout) {
    return <AboutView onClose={() => setShowAbout(false)} />; // Show AboutView if showAbout is true
  }
  const formattedDate = salesData && salesData.date ? salesData.date : '';

  return (
    <View style={[styles.container]}>
      <Text style={[styles.welcomeText, { fontSize: 24, color: isDarkMode ? '#fff' : '#000' }]}>
        CHARMY BOTTLE SHOP{'\n'}SALES LOGGING APP
      </Text>
      <View style={styles.salesSummary}>
        {salesData ? (
          <>
            <Text style={[styles.salesText, { fontSize, color: isDarkMode ? '#fff' : '#000' }]}>Last Updated Sales:</Text>
            <Text style={[styles.salesDetail, { fontSize, color: isDarkMode ? '#CCC' : '#333' }]}>Date: {formattedDate}</Text>
            <Text style={[styles.salesDetail, { fontSize, color: isDarkMode ? '#CCC' : '#333' }]}>Card: ${salesData.card_payment_amt}</Text>
            <Text style={[styles.salesDetail, { fontSize, color: isDarkMode ? '#CCC' : '#333' }]}>Cash: ${salesData.cash_payment_amt}</Text>
            <Text style={[styles.salesDetail, { fontSize: fontSize + 3, color: isDarkMode ? '#CCC' : '#333' , fontWeight: 'bold', marginTop: 10 }]}>Total: ${salesData.total_sales}</Text>
          </>
        ) : (
          <Text style={[styles.salesText, { fontSize, color: isDarkMode ? '#fff' : '#000' }]}>No sales data available.</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Record Sales')}
        >
          <Text style={[styles.buttonText, { fontSize }]}>Record Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Reports')}
        >
          <Text style={[styles.buttonText, { fontSize }]}>View Reports</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
