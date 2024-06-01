import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { SettingsContext } from '../components/SettingsContext';
import { getStyles } from '../styles/ReportScreen';
import config from '../components/config';

const screenWidth = Dimensions.get('window').width;

export default function WeeklyReportScreen() {
  const { fontSize, isDarkMode } = useContext(SettingsContext);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = getStyles(isDarkMode);

  const fetchWeeklySalesData = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/reports/weekly-sales`);
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const result = await response.json();
      setWeeklyData(result);
    } catch (error) {
      console.error('Error fetching weekly sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchWeeklySalesData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const salesData = {
    labels: weeklyData.map(item => ""),
    datasets: [
      {
        data: weeklyData.map(item => item.total_sales),
      },
    ],
  };

  const avgDailySalesData = {
    labels: weeklyData.map(item => ""),
    datasets: [
      {
        data: weeklyData.map(item => item.average_daily_sales),
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.header, { fontSize, marginBottom: 0 }]}>Recent 52 Weeks Sales Trend</Text>
      <LineChart
        data={salesData}
        width={screenWidth - 20} // Use full screen width
        height={260}
        yAxisLabel="$"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: isDarkMode ? '#000' : '#fff',
          backgroundGradientFrom: isDarkMode ? '#333' : '#fff',
          backgroundGradientTo: isDarkMode ? '#666' : '#fff',
          decimalPlaces: 0, // Remove decimal places
          color: (opacity = 1) => isDarkMode ? `rgba(26, 255, 146, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => isDarkMode ? `rgba(26, 255, 146, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '0', // Remove dots by setting radius to 0
          },
          propsForBackgroundLines: {
            strokeDasharray: "", // Hide background lines
          },
          propsForHorizontalLabels: {
            fontSize: 12,
          },
          propsForVerticalLabels: {
            translateX: -10, // Move vertical labels closer to the chart
          },
        }}
        withHorizontalLines={true}
        withVerticalLines={false}
        withVerticalLabels={true}
        bezier // Add smooth curve to the line
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Text style={[styles.header, { fontSize, marginTop: 10, marginBottom: 0 }]}>Average Daily Sales Trend</Text>
      <LineChart
        data={avgDailySalesData}
        width={screenWidth - 20} // Use full screen width
        height={260}
        yAxisLabel="$"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: isDarkMode ? '#000' : '#fff',
          backgroundGradientFrom: isDarkMode ? '#333' : '#fff',
          backgroundGradientTo: isDarkMode ? '#666' : '#fff',
          decimalPlaces: 0, // Remove decimal places
          color: (opacity = 1) => isDarkMode ? `rgba(26, 255, 146, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => isDarkMode ? `rgba(26, 255, 146, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '0', // Remove dots by setting radius to 0
          },
          propsForBackgroundLines: {
            strokeDasharray: "", // Hide background lines
          },
          propsForHorizontalLabels: {
            fontSize: 12,
          },
          propsForVerticalLabels: {
            translateX: -10, // Move vertical labels closer to the chart
          },
        }}
        withHorizontalLines={true}
        withVerticalLines={false}
        withVerticalLabels={true}
        bezier // Add smooth curve to the line
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
}

