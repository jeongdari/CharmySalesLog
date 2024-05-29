import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    isDarkMode: false,
    fontSize: 14,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const storedDarkMode = await AsyncStorage.getItem('darkMode');
      const storedFontSize = await AsyncStorage.getItem('fontSize');

      setSettings({
        isDarkMode: storedDarkMode !== null ? JSON.parse(storedDarkMode) : false,
        fontSize: storedFontSize !== null ? JSON.parse(storedFontSize) : 14,
      });
      setIsLoaded(true);
    };

    loadSettings();
  }, []);

  const toggleDarkMode = () => {
    setSettings((prevSettings) => {
      const newDarkMode = !prevSettings.isDarkMode;
      AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      return { ...prevSettings, isDarkMode: newDarkMode };
    });
  };

  const increaseFontSize = () => {
    setSettings((prevSettings) => {
      const newFontSize = prevSettings.fontSize + 1;
      AsyncStorage.setItem('fontSize', JSON.stringify(newFontSize));
      return { ...prevSettings, fontSize: newFontSize };
    });
  };

  const decreaseFontSize = () => {
    setSettings((prevSettings) => {
      const newFontSize = prevSettings.fontSize > 10 ? prevSettings.fontSize - 1 : 10;
      AsyncStorage.setItem('fontSize', JSON.stringify(newFontSize));
      return { ...prevSettings, fontSize: newFontSize };
    });
  };

  if (!isLoaded) {
    return null; // or a loading spinner if you prefer
  }

  return (
    <SettingsContext.Provider value={{ ...settings, toggleDarkMode, increaseFontSize, decreaseFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
