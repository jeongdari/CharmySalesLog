import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import AboutView from "./AboutView";
import { TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainHome"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("About")}>
              <Ionicons
                name="information-circle"
                size={25}
                color="tomato"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="About"
        component={AboutView}
        options={{
          presentation: "modal",
          title: "About",
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
