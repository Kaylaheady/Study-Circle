import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OpeningScreen from "./screens/OpeningScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
<<<<<<< HEAD
import SignUpaddClasses from "./screens/SIgnUpaddClasses";
=======
import SignUpaddClasses from "./screens/SignUpaddClasses";
>>>>>>> ecf6ee13c76396f4ca2ab516a4e1c7b0d252f06c
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();
type RootStackParamList = {
  Opening: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SignUpaddClasses: undefined;
<<<<<<< HEAD
=======
  Home: undefined;
>>>>>>> ecf6ee13c76396f4ca2ab516a4e1c7b0d252f06c
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Opening">
        <Stack.Screen
          name="Opening"
          component={OpeningScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpaddClasses"
          component={SignUpaddClasses}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
