import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ssolcjnuddlznarnojud.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzb2xjam51ZGRsem5hcm5vanVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNTk1MjcsImV4cCI6MjA1NjYzNTUyN30.kz2vUx7DAvbEzzOvff48o51z-wp4i23Sb9Jypt9Lnro"; // Replace with your actual key (keep it secret)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type RootStackParamList = {
  Opening: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SignUpaddClasses: undefined;
  Home: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, "SignIn">;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) {
      Alert.alert("Sign In Failed", error.message);
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-forward" size={30} color="#014AAD" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Sign In</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#014AAD",
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#89c7d6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    width: "100%",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 16,
  },
});

export default SignInScreen;
