import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import RecordSalesScreen from './screens/RecordSalesScreen';
import ReportsNavigator from './screens/ReportsNavigator';
import SettingsNavigator from './screens/SettingsNavigator';
import * as SplashScreen from 'expo-splash-screen';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    // Prevent the splash screen from automatically hiding
    SplashScreen.preventAutoHideAsync();

    // Simulate an asynchronous task (e.g., loading resources, initializing data)
    // Replace this with your actual asynchronous tasks
    setTimeout(() => {
      // After the tasks are completed, manually hide the splash screen
      SplashScreen.hideAsync();
    }, 2000); // Adjust the duration (in milliseconds) as needed
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Record Sales') {
              iconName = focused ? 'create' : 'create-outline';
            } else if (route.name === 'Reports') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Record Sales" component={RecordSalesScreen} />
        <Tab.Screen name="Reports" component={ReportsNavigator} />
        <Tab.Screen name="Settings" component={SettingsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
