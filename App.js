import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from "./src/screens/HomeScreen";
import RecordSalesScreen from "./src/screens/RecordSalesScreen";
import ReportsNavigator from "./src/components/ReportsNavigator";
import SettingsNavigator from "./src/components/SettingsNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { LogBox } from 'react-native';
import { SettingsProvider, SettingsContext } from './src/components/SettingsContext';
import config from './src/components/config'; 

LogBox.ignoreLogs([
  'Warning: Grid: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.'
]);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { isDarkMode } = useContext(SettingsContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Record Sales") {
            iconName = focused ? "create" : "create-outline";
          } else if (route.name === "Reports") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#333" : "#fff",
        },
        tabBarLabelStyle: {
          fontSize: 12, // Fixed font size for tab bar labels
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Record Sales" component={RecordSalesScreen} />
      <Tab.Screen name="Reports" component={ReportsNavigator} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    const validateToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await fetch(`${config.API_BASE_URL}/auth/validate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Token is valid
          console.log('Token is valid');
          setIsAuthenticated(true);
        } else {
          // Token is invalid, redirect to Auth screen
          await AsyncStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        await AsyncStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    const checkAuth = async () => {
      await validateToken();
    };

    checkAuth();
  }, []);

  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isAuthenticated ? 'Main' : 'Auth'}>
          <Stack.Screen name="Main" options={{ headerShown: false }}>
            {(props) => <MainTabNavigator {...props} extraData={isAuthenticated} />}
          </Stack.Screen>
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Registration" component={AuthScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </SettingsProvider>
  );
}
