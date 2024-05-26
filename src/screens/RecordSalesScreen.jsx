import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../components/config';
import { showToast } from '../components/Toast';

export default function RecordSalesScreen() {
  const [date, setDate] = useState(new Date());
  const [cardPayment, setCardPayment] = useState('');
  const [cashPayment, setCashPayment] = useState('');
  const [show, setShow] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`${config.API_BASE_URL}/sales/latest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          if (data.date) {
            // Convert date from UTC to local timezone
            let utcDate = new Date(data.date);
            let localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));
            data.date = localDate.toISOString().split('T')[0];
          }
          setSubmittedData(data);
        } else {
          console.error('Failed to fetch sales record', data);
        }
      } catch (error) {
        console.error('Error fetching sales record', error);
      }
    };

    fetchData();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Check if cardPayment and cashPayment are valid numbers
      const cardPaymentNumber = parseFloat(cardPayment);
      const cashPaymentNumber = parseFloat(cashPayment);
      if (isNaN(cardPaymentNumber) || isNaN(cashPaymentNumber)) {
        throw new Error('Card payment and cash payment must be valid numbers');
      }

      // Convert date to UTC before storing in the database
      const utcDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));

      const response = await fetch(`${config.API_BASE_URL}/sales/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: utcDate.toISOString().split('T')[0], // Use UTC date
          card_payment_amt: parseFloat(cardPayment),
          cash_payment_amt: parseFloat(cashPayment),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        showToast('success', 'Success', 'Sales record submitted successfully');
        if (data.date) {
          // Convert date from UTC to local timezone
          let utcDate = new Date(data.date);
          let localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));
          data.date = localDate.toISOString().split('T')[0];
        }
        setSubmittedData(data);
      } else {
        console.error('Failed to submit sales record', data);
        showToast('error', 'Error', data.message || 'Failed to submit sales record');
      }
    } catch (error) {
      if (error.message === 'No token found' || error.message === 'Network request failed') {
        showToast('error', 'Error', 'An error occurred while submitting sales record');
      } else {
        showToast('error', 'Error', error.message || 'An error occurred while submitting sales record');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select Date:</Text>
      <View>
        <Button onPress={() => setShow(true)} title="Show date picker!" />
      </View>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()} // Prevent future dates
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Card Payment"
        keyboardType="numeric"
        value={cardPayment}
        onChangeText={setCardPayment}
      />
      <TextInput
        style={styles.input}
        placeholder="Cash Payment"
        keyboardType="numeric"
        value={cashPayment}
        onChangeText={setCashPayment}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {submittedData && (
        <View style={styles.submittedData}>
          <Text>Updated Sales Record:</Text>
          <Text>Date: {submittedData.date || 'N/A'}</Text>
          <Text>Card Payment: ${submittedData.card_payment_amt}</Text>
          <Text>Cash Payment: ${submittedData.cash_payment_amt}</Text>
          <Button title="Edit" onPress={() => console.log('Edit pressed')} />
          <Button title="Delete" onPress={() => console.log('Delete pressed')} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 8,
  },
  submittedData: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});
