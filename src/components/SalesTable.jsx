import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SalesTable = ({ data, fontSize, isDarkMode }) => {
  const styles = getStyles(isDarkMode);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { fontSize }]}>Date</Text>
        <Text style={[styles.tableHeaderText, { fontSize }]}>Card</Text>
        <Text style={[styles.tableHeaderText, { fontSize }]}>Cash</Text>
        <Text style={[styles.tableHeaderText, { fontSize }]}>Total</Text>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.tableRowText, { fontSize }]}>{formatDate(item.date)}</Text>
          <Text style={[styles.tableRowText, { fontSize }]}>{item.cardPayment.toFixed(2)}</Text>
          <Text style={[styles.tableRowText, { fontSize }]}>{item.cashPayment.toFixed(2)}</Text>
          <Text style={[styles.tableRowText, { fontSize }]}>{(item.cardPayment + item.cashPayment).toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  tableContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: isDarkMode ? '#fff' : '#000',
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: isDarkMode ? '#444' : '#ddd',
    padding: 5,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: isDarkMode ? '#fff' : '#000',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#444' : '#ddd',
  },
  tableRowText: {
    flex: 1,
    textAlign: 'center',
    color: isDarkMode ? '#fff' : '#000',
  },
});

export default SalesTable;
