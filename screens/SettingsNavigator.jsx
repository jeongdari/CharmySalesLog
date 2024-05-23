import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileSettingsScreen from './ProfileSettingsScreen';
import AppSettingsScreen from './AppSettingsScreen';

const Tab = createMaterialTopTabNavigator();

export default function SettingsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileSettingsScreen} />
      <Tab.Screen name="App" component={AppSettingsScreen} />
    </Tab.Navigator>
  );
}
