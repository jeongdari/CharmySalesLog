import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getStyles } from '../styles/RecordSalesStyles';
import { fetchLatestSales, updateSalesRecord, deleteSalesRecord, fetchSalesRecord, editSalesRecord } from '../components/RecordSalesUtils';
import { SettingsContext } from '../components/SettingsContext';
import { showToast } from '../components/Toast';

export default function RecordSalesScreen() {
  const [date, setDate] = useState(new Date());
  const [cardPayment, setCardPayment] = useState("");
  const [cashPayment, setCashPayment] = useState("");
  const [show, setShow] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { fontSize, isDarkMode } = useContext(SettingsContext);

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    fetchLatestSales(setSubmittedData);
  }, []);

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    try {
      console.log("Fetching sales record for date:", currentDate);
      const record = await fetchSalesRecord(currentDate, setCardPayment, setCashPayment);
      console.log("Fetched sales record:", record);
      if (record) {
        setIsEditing(true);
      } else {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error fetching sales record:", error);
      setIsEditing(false);
      setCardPayment("");
      setCashPayment("");
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting sales record:", { date, cardPayment, cashPayment });
      const success = await updateSalesRecord(date, cardPayment, cashPayment, setSubmittedData, setCardPayment, setCashPayment);
      if (success) {
        setCardPayment("");
        setCashPayment("");
        showToast("success", "Success", "Sales record submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting sales record:", error);
      showToast("error", "Error", "Failed to submit sales record");
    }
  };

  const handleEdit = async () => {
    try {
      console.log("Editing sales record:", { date, cardPayment, cashPayment });
      const success = await editSalesRecord(date, cardPayment, cashPayment, setSubmittedData, setCardPayment, setCashPayment);
      if (success) {
        setIsEditing(false);
        showToast("success", "Success", "Sales record updated successfully");
      }
    } catch (error) {
      console.error("Error updating sales record:", error);
      showToast("error", "Error", "Failed to update sales record");
    }
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting sales record for date:", date);
      await deleteSalesRecord(date, setSubmittedData);
      setCardPayment("");
      setCashPayment("");
      setIsEditing(false);
      setSubmittedData({ date: "N/A", card_payment_amt: "N/A", cash_payment_amt: "N/A" });
      showToast("success", "Success", "Sales record deleted successfully");
    } catch (error) {
      console.error("Error deleting sales record:", error);
      showToast("error", "Error", "Failed to delete sales record");
    }
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
      <Button title="Submit" onPress={handleSubmit} disabled={isEditing} />
      {submittedData && (
        <View style={styles.submittedData}>
          <Text style={[styles.text, { fontSize }]}>Updated Sales Record:</Text>
          <Text style={[styles.text, { fontSize }]}>Date: {submittedData.date || "N/A"}</Text>
          <Text style={[styles.text, { fontSize }]}>Card Payment: ${submittedData.card_payment_amt}</Text>
          <Text style={[styles.text, { fontSize }]}>Cash Payment: ${submittedData.cash_payment_amt}</Text>
          <TouchableOpacity style={styles.editButtonWrapper} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButtonWrapper} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
