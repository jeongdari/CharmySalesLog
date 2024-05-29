import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DailyReportScreen from '../screens/DailyReportScreen';
import WeeklyReportScreen from '../screens/WeeklyReportScreen';
import MonthlyReportScreen from '../screens/MonthlyReportScreen';

const Tab = createMaterialTopTabNavigator();

export default function ReportsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Daily" component={DailyReportScreen} />
      <Tab.Screen name="Weekly" component={WeeklyReportScreen} />
      <Tab.Screen name="Monthly" component={MonthlyReportScreen} />
    </Tab.Navigator>
  );
}
