import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./src/screens/HomeStack";
import RecordSalesScreen from "./src/screens/RecordSalesScreen";
import ReportsNavigator from "./src/screens/ReportsNavigator";
import SettingsNavigator from "./src/screens/SettingsNavigator";
import * as SplashScreen from "expo-splash-screen";

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
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
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Record Sales" component={RecordSalesScreen} />
        <Tab.Screen name="Reports" component={ReportsNavigator} />
        <Tab.Screen name="Settings" component={SettingsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
