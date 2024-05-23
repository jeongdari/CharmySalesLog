import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DailyReportScreen from './DailyReportScreen';
import WeeklyReportScreen from './WeeklyReportScreen';
import MonthlyReportScreen from './MonthlyReportScreen';

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
