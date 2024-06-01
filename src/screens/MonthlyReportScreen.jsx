import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { SettingsContext } from '../components/SettingsContext';
import { getStyles } from '../styles/ReportScreen';
import config from '../components/config';

const screenWidth = Dimensions.get('window').width;

export default function MonthlyReportScreen() {
  const { fontSize, isDarkMode } = useContext(SettingsContext);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = getStyles(isDarkMode);

  const fetchMonthlySalesData = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/reports/monthly-sales`);
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const result = await response.json();
      setMonthlyData(result);
    } catch (error) {
      console.error('Error fetching monthly sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchMonthlySalesData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const data = {
    labels: monthlyData.map(item => ""),
    datasets: [
      {
        data: monthlyData.map(item => item.total_sales),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontSize }]}>Recent 12 Months Sales Trend</Text>
      <LineChart
        data={data}
        width={screenWidth - 16} // Use full screen width
        height={500}
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
            r: '3', // Remove dots by setting radius to 0
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
        bezier 
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
