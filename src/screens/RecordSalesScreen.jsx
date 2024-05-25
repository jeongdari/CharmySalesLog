import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RecordSalesScreen() {
  const [date, setDate] = useState(new Date());
  const [cardPayment, setCardPayment] = useState('');
  const [cashPayment, setCashPayment] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://10.88.15.151:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // Replace with actual user ID
          date: date.toISOString().split('T')[0],
          card_payment_amt: parseFloat(cardPayment),
          cash_payment_amt: parseFloat(cashPayment),
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Sales record submitted successfully');
      } else {
        Alert.alert('Error', 'Failed to submit sales record');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while submitting sales record');
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
});
