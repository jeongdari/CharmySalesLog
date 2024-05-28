import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Platform, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import config from '../components/config';

export default function DailyReportScreen() {
  const initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 7);

  const [startDate, setStartDate] = useState(initialStartDate);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          totalSales: parseFloat(item.total_card_payment) + parseFloat(item.total_cash_payment),
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

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(Platform.OS === 'ios');
    setStartDate(currentDate);
    fetchData(currentDate);  // Fetch data for the new start date
  };

  useEffect(() => {
    fetchData(startDate);  // Fetch initial data for the last 7 days
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.sales}>Total Sales: ${item.totalSales.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Report</Text>
      
      <View style={styles.datePickerContainer}>
        <View>
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
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.date}
        />
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
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  date: {
    fontSize: 16
  },
  sales: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
