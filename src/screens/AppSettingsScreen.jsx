import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { SettingsContext } from '../components/SettingsContext';
import { getStyles } from '../styles/SettingStyles';

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

  const styles = getStyles(localDarkMode);

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontSize: localFontSize }]}>App Settings</Text>

      <View style={styles.setting}>
        <Text style={[styles.label, { fontSize: localFontSize }]}>Dark Mode</Text>
        <Switch value={localDarkMode} onValueChange={handleToggleDarkMode} />
      </View>

      <View style={styles.setting}>
        <Text style={[styles.label, { fontSize: localFontSize }]}>Font Size</Text>
        <View style={styles.fontSizeControls}>
          <TouchableOpacity onPress={handleDecreaseFontSize} style={styles.fontSizeButton}>
            <Text style={[styles.label, { fontSize: localFontSize }]}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.label, { fontSize: localFontSize }]}>{localFontSize}</Text>
          <TouchableOpacity onPress={handleIncreaseFontSize} style={styles.fontSizeButton}>
            <Text style={[styles.label, { fontSize: localFontSize }]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
