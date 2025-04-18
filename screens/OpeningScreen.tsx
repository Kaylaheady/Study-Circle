import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import { NavigationProp } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<any>;
}

const OpeningScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 400,
    height: 500,
    marginBottom: 70,
  },
  signInButton: {
    marginTop: 50,
    width: "80%",
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#89c7d6",
    alignItems: "center",
    marginBottom: 15,
  },
  signInText: {
    color: "#004aad",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpButton: {
    width: "80%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#89c7d6",
    alignItems: "center",
  },
  signUpText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OpeningScreen;
