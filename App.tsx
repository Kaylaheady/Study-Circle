import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";

// Screens
import OpeningScreen from "./screens/OpeningScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignupScreen";
import SignUpaddClasses from "./screens/SignUpaddClasses";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileDrawerNavigator from "./screens/ProfileDrawerNavigator";
import ContactMatchScreen from "./screens/ContactMatchScreen";

// Stack and Tab types
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Opening: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SignUpaddClasses: undefined;
  MainTabs: undefined;
};

// Bottom tab navigator that shows after login
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          let IconComponent: any = Ionicons;

          if (route.name === "Home") {
            iconName = "home";
            IconComponent = Ionicons;
          } else if (route.name === "Matches") {
            iconName = "slideshare";
            IconComponent = Entypo;
          } else if (route.name === "Profile") {
            iconName = "person";
            IconComponent = Ionicons;
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#014AAD",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Matches" component={ContactMatchScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileDrawerNavigator} />
    </Tab.Navigator>
  );
}

// Main app navigation flow
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Opening" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Opening" component={OpeningScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignUpaddClasses" component={SignUpaddClasses} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


