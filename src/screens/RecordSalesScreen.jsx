import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getStyles } from '../styles/RecordSalesStyles';
import { fetchLatestSales, updateSalesRecord, deleteSalesRecord } from '../components/RecordSalesUtils';
import { SettingsContext } from '../components/SettingsContext';

export default function RecordSalesScreen() {
  const [date, setDate] = useState(new Date());
  const [cardPayment, setCardPayment] = useState("");
  const [cashPayment, setCashPayment] = useState("");
  const [show, setShow] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const { fontSize, isDarkMode } = useContext(SettingsContext);

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    fetchLatestSales(setSubmittedData);
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleSubmit = () => {
    updateSalesRecord(date, cardPayment, cashPayment, setSubmittedData);
  };

  const handleDelete = () => {
    deleteSalesRecord(date, setSubmittedData);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize }]}>Select Date:</Text>
      <View>
        <Button onPress={() => setShow(true)} title="Show date picker!" />
      </View>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()} 
        />
      )}
      <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="Card Payment"
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
        keyboardType="numeric"
        value={cardPayment}
        onChangeText={setCardPayment}
      />
      <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="Cash Payment"
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
        keyboardType="numeric"
        value={cashPayment}
        onChangeText={setCashPayment}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {submittedData && (
        <View style={styles.submittedData}>
          <Text style={[styles.text, { fontSize }]}>Updated Sales Record:</Text>
          <Text style={[styles.text, { fontSize }]}>Date: {submittedData.date || "N/A"}</Text>
          <Text style={[styles.text, { fontSize }]}>Card Payment: ${submittedData.card_payment_amt}</Text>
          <Text style={[styles.text, { fontSize }]}>Cash Payment: ${submittedData.cash_payment_amt}</Text>
          <TouchableOpacity style={styles.deleteButtonWrapper} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
