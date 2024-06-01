import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import config from '../components/config';
import { SettingsContext } from '../components/SettingsContext';
import { getStyles } from '../styles/ReportScreen';
import DatePickerComponent from '../components/DatePickerComponent';
import BarChartComponent from '../components/BarChartComponent';
import SalesTable from '../components/SalesTable';

export default function DailyReportScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { fontSize, isDarkMode } = useContext(SettingsContext);

  const styles = getStyles(isDarkMode);

  const fetchRecentData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${config.API_BASE_URL}/reports/recent`);
      const results = await response.json();

      if (Array.isArray(results)) {
        const formattedData = results.map(item => ({
          date: item.report_date,
          cardPayment: parseFloat(item.total_card_payment),
          cashPayment: parseFloat(item.total_cash_payment),
        }));
        setData(formattedData);
      } else {
        setError('Invalid response format');
      }
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (startDate) => {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${config.API_BASE_URL}/reports/generate?start_date=${formattedStartDate}&range=daily`);
      const results = await response.json();

      if (Array.isArray(results)) {
        const formattedData = results.map(item => ({
          date: item.report_date,
          cardPayment: parseFloat(item.total_card_payment),
          cashPayment: parseFloat(item.total_cash_payment),
        }));
        setData(formattedData);
      } else {
        setError('Invalid response format');
      }
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRecentData(); // Fetch the most recent 7 days data on screen focus
    }, [])
  );

  const onStartDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate || startDate;
      setShowStartPicker(false);
      setStartDate(currentDate);
      fetchData(currentDate);  // Fetch data for the selected start date
    } else {
      setShowStartPicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <DatePickerComponent
        startDate={startDate}
        showStartPicker={showStartPicker}
        setShowStartPicker={setShowStartPicker}
        onStartDateChange={onStartDateChange}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "#000"} />
          <Text style={[styles.text, { fontSize }]}>Loading...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={[styles.text, { fontSize }]}>{error}</Text>
        </View>
      )}

      {data.length > 0 && !loading && !error && (
        <>
        <BarChartComponent data={data} isDarkMode={isDarkMode} fontSize={fontSize} navigation={navigation} />
        <SalesTable data={data} fontSize={fontSize} isDarkMode={isDarkMode} /> 
        </>
      )}
    </View>
  );
}
