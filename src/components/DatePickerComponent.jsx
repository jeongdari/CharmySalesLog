import React from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePickerComponent({ startDate, showStartPicker, setShowStartPicker, onStartDateChange }) {
  return (
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
  );
}
