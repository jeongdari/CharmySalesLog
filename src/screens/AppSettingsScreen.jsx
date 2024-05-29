import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SettingsContext } from '../components/SettingsContext';

export default function AppSettingsScreen() {
  const { isDarkMode, toggleDarkMode, fontSize, increaseFontSize, decreaseFontSize } = useContext(SettingsContext);
  const [localDarkMode, setLocalDarkMode] = useState(isDarkMode);
  const [localFontSize, setLocalFontSize] = useState(fontSize);

  useEffect(() => {
    setLocalDarkMode(isDarkMode);
    setLocalFontSize(fontSize);
  }, [isDarkMode, fontSize]);

  const handleToggleDarkMode = () => {
    setLocalDarkMode(!localDarkMode);
    toggleDarkMode();
  };

  const handleIncreaseFontSize = () => {
    setLocalFontSize(localFontSize + 1);
    increaseFontSize();
  };

  const handleDecreaseFontSize = () => {
    if (localFontSize > 10) {
      setLocalFontSize(localFontSize - 1);
      decreaseFontSize();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: localDarkMode ? '#333' : '#fff' }]}>
      <Text style={[styles.header, { fontSize: localFontSize, color: localDarkMode ? '#fff' : '#000' }]}>App Settings</Text>

      <View style={styles.setting}>
        <Text style={{ fontSize: localFontSize, color: localDarkMode ? '#fff' : '#000' }}>Dark Mode</Text>
        <Switch value={localDarkMode} onValueChange={handleToggleDarkMode} />
      </View>

      <View style={styles.setting}>
        <Text style={{ fontSize: localFontSize, color: localDarkMode ? '#fff' : '#000' }}>Font Size</Text>
        <View style={styles.fontSizeControls}>
          <TouchableOpacity onPress={handleDecreaseFontSize} style={styles.fontSizeButton}>
            <Text style={{ fontSize: localFontSize, color: localDarkMode ? '#fff' : '#000' }}>-</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: localFontSize, color: localDarkMode ? '#fff' : '#000' }}>{localFontSize}</Text>
          <TouchableOpacity onPress={handleIncreaseFontSize} style={styles.fontSizeButton}>
            <Text style={{ fontSize: localFontSize, color: localDarkMode ? '#fff' : '#000' }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSizeButton: {
    padding: 10,
  },
});
