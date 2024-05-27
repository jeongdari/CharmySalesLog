import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { showToast } from "../components/Toast";
import { styles } from "../styles/RecordSalesStyles";
import { fetchLatestSales, updateSalesRecord, deleteSalesRecord } from "../components/RecordSalesUtils";

export default function RecordSalesScreen() {
  const [date, setDate] = useState(new Date());
  const [cardPayment, setCardPayment] = useState("");
  const [cashPayment, setCashPayment] = useState("");
  const [show, setShow] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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
          <Text>Date: {submittedData.date || "N/A"}</Text>
          <Text>Card Payment: ${submittedData.card_payment_amt}</Text>
          <Text>Cash Payment: ${submittedData.cash_payment_amt}</Text>
          <View style={styles.deleteButtonWrapper}>
            <Button
              title="Delete"
              onPress={handleDelete}
              color="#ff0000"
            />
          </View>
        </View>
      )}
    </View>
  );
}

