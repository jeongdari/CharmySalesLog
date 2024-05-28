import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackedBarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { G, Line } from 'react-native-svg';
import config from '../components/config';

export default function DailyReportScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecentData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${config.API_BASE_URL}/reports/recent`);
      const results = await response.json();

      console.log('API Response:', results);

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
      console.error(error);
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

      console.log('API Response:', results);

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
      console.error(error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentData(); // Fetch the most recent 7 days data on initial load
  }, []);

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

  const CustomGrid = ({ x, y, ticks }) => (
    <G>
      {ticks.map(tick => (
        <Line
          key={tick}
          x1="0%"
          x2="100%"
          y1={y(tick)}
          y2={y(tick)}
          stroke="rgba(0,0,0,0.2)"
        />
      ))}
      {data.map((_, index) => (
        <Line
          key={index}
          y1="0%"
          y2="100%"
          x1={x(index)}
          x2={x(index)}
          stroke="rgba(0,0,0,0.2)"
        />
      ))}
    </G>
  );

  const dates = data.map(item => new Date(item.date).getTime());
  const stackedData = data.map(item => ({
    card: item.cardPayment,
    cash: item.cashPayment
  }));

  const colors = ['#4CAF50', '#FFC107'];
  const keys = ['card', 'cash'];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Report</Text>

      <View style={styles.datePickerContainer}>
        <Button onPress={() => setShowStartPicker(true)} title="Select Start Date" />
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text>{error}</Text>
        </View>
      )}

      {data.length > 0 && !loading && !error && (
        <View style={{ height: 300, flexDirection: 'row' }}>
          <YAxis
            data={[...stackedData.map(d => d.card + d.cash)]}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fontSize: 10, fill: 'grey' }}
            formatLabel={(value) => `$${value}`}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <StackedBarChart
              style={{ flex: 1 }}
              data={stackedData}
              keys={keys}
              colors={colors}
              showGrid={true}
              contentInset={{ top: 20, bottom: 20 }}
            >
              <Grid />
              <CustomGrid belowChart={true} />
            </StackedBarChart>
            <XAxis
              style={{ marginTop: 10 }}
              data={dates}
              formatLabel={(index) => new Date(dates[index]).toLocaleDateString()}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: 'grey' }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
