import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from '../screens/AuthScreen';
import HomeStack from "../screens/HomeStack";
import RecordSalesScreen from "../screens/RecordSalesScreen";
import ReportsNavigator from "../screens/ReportsNavigator";
import SettingsNavigator from "../screens/SettingsNavigator";
import * as SplashScreen from "expo-splash-screen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
      SplashScreen.hideAsync();
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Main" options={{ headerShown: false }}>
            {() => (
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
                    display: "flex",
                  },
                })}
              >
                <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
                <Tab.Screen name="Record Sales" component={RecordSalesScreen} />
                <Tab.Screen name="Reports" component={ReportsNavigator} />
                <Tab.Screen name="Settings" component={SettingsNavigator} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
